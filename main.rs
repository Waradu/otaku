// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use device_query::{DeviceEvents, DeviceQuery, DeviceState};
use std::thread;
use std::time::Duration;
use tauri::Manager;
use tauri::PhysicalPosition;
use tauri::SystemTray;

#[derive(Clone, serde::Serialize)]
struct Payload {
    button: String,
    mouse_position: (i32, i32),
    window_position: (i32, i32),
}

#[derive(serde::Deserialize, Debug)]
struct MoveEventPayload {
    x: i32,
    y: i32,
}

fn listen(app: tauri::AppHandle) {
    thread::spawn(move || loop {
        let app_handle = app.clone();
        let device_state = DeviceState::new();
        let window_position = app_handle
            .get_window("main")
            .unwrap()
            .outer_position()
            .unwrap();

        let _guard = device_state.on_mouse_down(move |button| {
            let device_state = DeviceState::new();
            let mouse = device_state.clone().get_mouse();
            app_handle
                .emit_all(
                    "down",
                    Payload {
                        button: format!("{:#?}", button),
                        mouse_position: (mouse.coords.0, mouse.coords.1),
                        window_position: (window_position.x, window_position.y),
                    },
                )
                .unwrap();
        });

        let app_handle = app.clone();
        let _guard = device_state.on_mouse_up(move |button| {
            let device_state = DeviceState::new();
            let mouse = device_state.clone().get_mouse();
            app_handle
                .emit_all(
                    "up",
                    Payload {
                        button: format!("{:#?}", button),
                        mouse_position: (mouse.coords.0, mouse.coords.1),
                        window_position: (window_position.x, window_position.y),
                    },
                )
                .unwrap();
        });

        thread::sleep(Duration::from_millis(1000));
    });
}

fn main() {
    let tray = SystemTray::new();

    tauri::Builder::default()
        .setup(|app| {
            let app_handle = app.app_handle().clone();
            listen(app_handle.clone());

            let window = app_handle.get_window("main").unwrap();

            window.listen("move", {
                let window_clone = window.clone();
                move |event| {
                    let payload: Option<&str> = event.payload();
                    if let Some(payload) = payload {
                        if let Ok(payload) = serde_json::from_str::<MoveEventPayload>(&payload) {
                            println!(
                                "got window event-name with payload x: {}, y: {}",
                                payload.x, payload.y
                            );
                            window_clone
                                .set_position(PhysicalPosition::new(
                                    payload.x,
                                    payload.y,
                                ))
                                .unwrap();
                        } else {
                            println!("Failed to parse payload");
                        }
                    } else {
                        println!("No payload received");
                    }
                }
            });

            Ok(())
        })
        .system_tray(tray)
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

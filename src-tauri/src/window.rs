use device_query::{DeviceQuery, DeviceState};
use std::thread;
use std::time::Duration;
use tauri::AppHandle;
use tauri::Manager;

pub fn handle(app: AppHandle) {
    let looptime = 10; // Reduced looptime for smoother movement

    thread::spawn(move || {
        let device_state = DeviceState::new();
        let mut mouse_pressed = false;

        loop {
            let mouse = device_state.get_mouse();
            let app_clone = app.clone();

            if mouse.button_pressed[1] {
                // Checking if the left mouse button is pressed
                if !mouse_pressed {
                    mouse_pressed = true;
                    println!("mouse down");

                    thread::spawn(move || {
                        let device_state = DeviceState::new();
                        let mut last_mouse = device_state.get_mouse();

                        loop {
                            let new_mouse = device_state.get_mouse();
                            let x_diff = new_mouse.coords.0 - last_mouse.coords.0;
                            let y_diff = new_mouse.coords.1 - last_mouse.coords.1;
                            last_mouse = new_mouse;

                            if x_diff != 0 || y_diff != 0 {
                                let window_position = app_clone
                                    .get_window("main")
                                    .unwrap()
                                    .outer_position()
                                    .unwrap();

                                app_clone
                                    .get_window("main")
                                    .unwrap()
                                    .set_position(tauri::PhysicalPosition::new(
                                        window_position.x + x_diff,
                                        window_position.y + y_diff,
                                    ))
                                    .unwrap();

                                let window = app_clone.get_window("main").unwrap();
                                let current_size = window.outer_size().unwrap();
                                println!(
                                    "Current window size: {}x{}",
                                    current_size.width, current_size.height
                                );

                                window
                                    .set_size(tauri::Size::Physical(tauri::PhysicalSize::new(
                                        331, 360,
                                    )))
                                    .unwrap();
                            }

                            if !device_state.get_mouse().button_pressed[1] {
                                break;
                            }

                            thread::sleep(Duration::from_millis(looptime));
                        }
                    });
                }
            } else {
                mouse_pressed = false;
            }

            thread::sleep(Duration::from_millis(looptime));
        }
    });
}

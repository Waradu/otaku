use device_query::{DeviceQuery, DeviceState};
use std::thread;
use std::time::Duration;
use tauri::AppHandle;
use tauri::Manager;

pub fn handle(app: AppHandle) {
    let looptime = 10;

    thread::spawn(move || {
        let device_state = DeviceState::new();
        let mut mouse_pressed = false;
        let mut mouse_moving = false;

        loop {
            let mouse = device_state.get_mouse();
            let app_clone = app.clone();

            let window = app_clone.get_window("main").unwrap();

            let window_position = window.outer_position().unwrap();

            let mouse_x_diff = mouse.coords.0 - window_position.x;
            let mouse_y_diff = mouse.coords.1 - window_position.y;

            let focused = window.is_focused().unwrap();

            if mouse.button_pressed[1]
                && mouse_x_diff >= 110
                && mouse_x_diff <= 190
                && mouse_y_diff >= 30
                && mouse_y_diff <= 180
                && focused
            {
                if !mouse_pressed {
                    mouse_pressed = true;

                    thread::spawn(move || {
                        let device_state = DeviceState::new();
                        let mut mouse = device_state.get_mouse();

                        loop {
                            let new_mouse = device_state.get_mouse();
                            let x_diff = new_mouse.coords.0 - mouse.coords.0;
                            let y_diff = new_mouse.coords.1 - mouse.coords.1;
                            mouse = new_mouse;

                            if x_diff != 0 || y_diff != 0 {
                                if !mouse_moving {
                                    app_clone.emit_all("down", {}).unwrap();
                                }

                                mouse_moving = true;

                                let window = app_clone.get_window("main").unwrap();

                                let window_position = window.outer_position().unwrap();

                                let mouse_x_diff = mouse.coords.0 - window_position.x;
                                let mouse_y_diff = mouse.coords.1 - window_position.y;

                                let pos_x = window_position.x - 175 + mouse_x_diff;
                                let pos_y = window_position.y - 80 + mouse_y_diff;

                                window
                                    .set_position(tauri::PhysicalPosition::new(pos_x, pos_y))
                                    .unwrap();

                                window
                                    .set_size(tauri::Size::Physical(tauri::PhysicalSize::new(
                                        300, 300,
                                    )))
                                    .unwrap();
                            }

                            if !device_state.get_mouse().button_pressed[1] {
                                if mouse_moving {
                                    app_clone.emit_all("up", {}).unwrap();
                                }
                                break;
                            }

                            thread::sleep(Duration::from_millis(looptime));
                        }
                    });
                }
            } else {
                mouse_pressed = false;
                mouse_moving = false;
            }

            thread::sleep(Duration::from_millis(looptime));
        }
    });
}

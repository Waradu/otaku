// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::Manager;
use tauri::SystemTray;

mod window;

fn main() {
    let tray = SystemTray::new();

    tauri::Builder::default()
        .setup(|app| {
            let app_handle = app.app_handle().clone();

            window::handle(app_handle);

            Ok(())
        })
        .system_tray(tray)
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

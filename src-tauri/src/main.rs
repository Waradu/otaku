// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use tauri::SystemTray;

fn main() {
  let tray = SystemTray::new();
  
  tauri::Builder::default()
    .system_tray(tray)
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// docs:
// https://github.com/tauri-apps/tao/blob/dev/examples/fullscreen.rs
// https://tauri.app/v1/guides/features/command/#accessing-the-window-in-commands

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![fullscreen, minimize])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn fullscreen(window: tauri::Window) {
    let _ = window.set_fullscreen(true);
}

#[tauri::command]
fn minimize(window: tauri::Window) {
    let _ = window.set_fullscreen(false);
}

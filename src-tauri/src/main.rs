// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// TODO: use tao instead winit + winit_fullscreen
// https://github.com/tauri-apps/tao/blob/dev/examples/fullscreen.rs
use winit::{
    event_loop::EventLoop,
    window::WindowBuilder,
};

use winit_fullscreen::*;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![fullscreen])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn fullscreen() {
    // TODO: Implement fullscreen
    println!("fullscreen");
    let event_loop = EventLoop::new().unwrap();
    let window = WindowBuilder::new()
        .build(&event_loop)
        .unwrap();
    window.toggle_fullscreen();
}

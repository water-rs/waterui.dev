use waterui::app::App;
use waterui::prelude::*;
use waterui::preview;

#[preview]
fn main() -> impl View {
    let count = Binding::i32(0);

    vstack((
        text("Hello, WaterUI!").size(28),
        text!("Count: {count}"),
        stepper("Count", &count),
    ))
    .padding()
}

pub fn app(env: Environment) -> App {
    App::new(main, env)
}

use waterui::prelude::slider::slider;
use waterui::prelude::*;

fn progress_editor() -> impl View {
    let value = Binding::f64(0.25);
    let percent = value.map(|value| value * 100.0);

    vstack((
        slider("Progress", &value).range(0.0..=1.0),
        text!("Progress: {percent:.0}%"),
    ))
}

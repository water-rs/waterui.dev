use waterui_testing::UiBuilder;

#[waterui::test]
fn stepper_updates(ui: UiBuilder) {
    let value = Binding::i32(2);
    let for_view = value.clone();
    let mut app = ui.mount(move || stepper("Limited", &for_view));

    app.query().label("Limited").increment();
    assert_eq!(value.snapshot(), 3);
}

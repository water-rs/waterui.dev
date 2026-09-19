use waterui_testing::{Role, SemanticApp};

#[waterui::test(login_view, theme = hydrolysis_m3::install, viewport = (360, 320))]
fn login_flow(app: &mut SemanticApp) {
    app.query().role(Role::BUTTON).label("Login").tap();
    app.query().label("Welcome").assert_exists();
}

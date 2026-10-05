#[form]
struct RegistrationForm {
    /// Full name of the user
    full_name: String,
    /// Email address for account
    email: String,
    /// Age in years
    age: i32,
    /// Whether to receive marketing emails
    newsletter: bool,
    /// Preferred volume level (0.0 - 1.0)
    volume: f64,
}

let registration = RegistrationForm::binding();
form(&registration)

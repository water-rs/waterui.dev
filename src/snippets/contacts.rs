#[derive(Clone, Identifiable)]
struct Contact {
    #[id]
    id: u64,
    name: &'static str,
}

fn contacts() -> impl View {
    let contacts = [
        Contact { id: 1, name: "Alice Chen" },
        Contact { id: 2, name: "Bob Smith" },
    ];

    List::for_each(contacts, |contact| {
        ListItem::new(text(contact.name))
    })
}

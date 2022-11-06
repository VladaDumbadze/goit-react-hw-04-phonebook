import { useState } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import useLocalStorage from './UseLocalStorage/UseLocalStorage';

export default function App() {
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [filter, setFilter] = useState('');

  const contactsFiltered = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );
  const addContact = data => {
    const { name, number } = data;
    if (contacts.findIndex(contact => contact.name === name) !== -1) {
      alert(`${name} is already in contacts`);
      return;
    }
    setContacts(prevState => {
      return [
        ...prevState,
        {
          id: nanoid(),
          name,
          number,
        },
      ];
    });
  };

  const deleteContact = id => {
    setContacts(prevState => prevState.filter(contact => contact.id !== id));
  };

  const handleFilterChange = e => {
    const newFilter = e.currentTarget.value;
    setFilter(newFilter.toLowerCase());
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm addContact={addContact} contacts={contacts} />
      <h2>Contacts</h2>

      <Filter filter={filter} handleChange={handleFilterChange} />

      <ContactList
        contacts={contactsFiltered}
        onDeleteContact={deleteContact}
      />
    </div>
  );
}

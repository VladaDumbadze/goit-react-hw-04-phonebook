import { useState } from 'react';

import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import useLocalStorage from './UseLocalStorage/UseLocalStorage';

export default function App() {
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [filter, setFilter] = useState('');

  const addContact = data => {
    return contacts.map(contact => contact.name).includes(data.name)
      ? alert(`${data.name} is already in contacts`)
      : setContacts([...contacts, data]);
  };

  const handleFilterChange = e => {
    setFilter(e.currentTarget.value);
  };

  const deleteContact = id => {
    setContacts(prevState => prevState.filter(contact => contact.id !== id));
  };

  const contactsFiltered = () => {
    const contactsFiltered = [];
    contacts.forEach(contact => {
      contact.name.toLowerCase().includes(filter.toLowerCase()) &&
        contactsFiltered.push(contact);
    });
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm addContact={addContact} contacts={contacts} />
      <h2>Contacts</h2>

      <Filter filter={filter} handleChange={handleFilterChange} />

      <ContactList
        contacts={filter ? contactsFiltered() : contacts}
        onDeliteContact={deleteContact}
      />
    </div>
  );
}

import React, { Component } from "react";
import shortid from "shortid";

import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter'


export class App extends Component {
  
  state = {
   contacts: [
    {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
    {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
    {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
    {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
  ],
    filter: '',
  };
  
  formSubmitHandler = data => {
    const { name, number } = data;
    const { contacts } = this.state;
    contacts.some(contact => contact.name === name)
      ? alert(`${name} is already in contacts`)
      : contacts.push({ id: shortid(), name: name, number: number });
    this.setState({ contacts: contacts });
  }; 

  handleChange = e => {
    this.setState({ filter: e.target.value });
  };

  deleteContact = (contactId) => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }))
  }


  render() {
    const { contacts, filter } = this.state; 
     const contactsFiltered = [];
    contacts.forEach(contact => {
      contact.name.toLowerCase().includes(filter.toLowerCase()) &&
        contactsFiltered.push(contact);
    });

    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.formSubmitHandler} />
        <h2>Contacts</h2>
        
        
        <Filter filter={filter} handleChange={this.handleChange} />

        {contactsFiltered && (
          <ContactList
            contacts={contactsFiltered}
            onDeliteContact={this.deleteContact}
          />
        )}
      </div>
        
   
  );
}
};
  


export default App;
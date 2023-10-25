import React, { Component } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';

import css from './App.module.css';
import Filter from './Filter/Filter';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('[componentDidUpdate]');
    console.log('prevProps:', prevProps);
    console.log('prevState:', prevState);
    console.log('snapshot:', snapshot);
  }
  render() {
    // Логика добавления нового контакта:
    const addNewContact = newContact => {
      const { contacts } = this.state;

      if (contacts.find(contact => contact.name === newContact.name)) {
        alert(newContact.name + ' is already in contacts.');
        return;
      }
      this.setState({
        contacts: [...contacts, newContact],
      });
    };

    //
    // Фільтр пошуку по імені
    const handleFilterChange = e => {
      this.setState({
        filter: e.target.value.trim(),
      });
    };

    // Перевірка на збереження копій контактів
    const deleteContact = e => {
      let idToDelete = e.target.value;
      const updatedContacts = this.state.contacts.filter(
        contact => contact.id !== idToDelete
      );
      this.setState({ contacts: updatedContacts });
    };

    return (
      <div className={css.mainBox}>
        <h1>Phonebook</h1>
        <ContactForm addNewContact={addNewContact} props={this.state} />
        <h2>Contacts</h2>
        <Filter onFilterChange={handleFilterChange} />
        <ContactList
          contactsState={this.state.contacts}
          filter={this.state.filter}
          deleteContact={deleteContact}
        />
      </div>
    );
  }
}

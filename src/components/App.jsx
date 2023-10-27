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

  //
  // записываем данные из localStorage в state при загрузке страницы
  componentDidMount = (prevProps, prevState) => {
    const datafromLS = localStorage.getItem('contacts');

    if (!datafromLS) {
      return;
    } else {
      const lStorage = localStorage.getItem('contacts');
      this.setState({ contacts: JSON.parse(lStorage) });
    }
  };

  //
  // записываем данные в localStorage из state при обновлении state
  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  //
  // Логіка додавання нового контакту:
  addNewContact = newContact => {
    const { contacts } = this.state;
    if (
      contacts.find(
        contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
      )
    ) {
      alert(newContact.name + ' is already in contacts.');
      return;
    }
    this.setState(prevState => {
      return { contacts: [newContact, ...prevState.contacts] };
    });
  };

  //
  // Зміна значення state.filter в інпуті фільтра
  handleFilterChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  //
  // Фільтр пошуку по імені і номеру для передачі відфільтрованого масиву в ContactList
  // contactsFilter = () => {
  //   return this.state.contacts.filter(contact => {
  //     return `${contact.name}${contact.number}`
  //       .toLowerCase()
  //       .includes(this.state.filter.toLowerCase().trim());
  //   });
  // };
  contactsFilter = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(({ name, number }) => {
      if (filter) {
        return (
          name.trim().toLowerCase().includes(filter.toLowerCase()) ||
          number.trim().toLowerCase().includes(filter.toLowerCase())
        );
      } else {
        return true;
      }
    });
  };

  //
  // Перевірка на збереження копій контактів
  deleteContact = id => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(contact => contact.id !== id),
      };
    });
  };

  render() {
    return (
      <div className={css.mainBox}>
        <h1>Phonebook-HW3</h1>
        <ContactForm addNewContact={this.addNewContact} props={this.state} />
        <h2>Contacts</h2>
        <Filter
          onFilterChange={this.handleFilterChange}
          value={this.state.filter}
        />
        <ContactList
          contacts={this.contactsFilter()}
          deleteContact={this.deleteContact}
        />
      </div>
    );
  }
}

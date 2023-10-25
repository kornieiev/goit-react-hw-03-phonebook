import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';

import css from './ContactForm.module.css';

export class Phonebook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      number: '',
    };
  }

  render() {
    // Логика нажатия кнопки Add contact:
    const handleBtnClick = e => {
      e.preventDefault();
      const id = nanoid();
      if (this.state.name && this.state.number) {
        let newContact = {
          id: id,
          name: this.state.name,
          number: this.state.number,
        };
        this.props.addNewContact(newContact);
        this.setState({ name: '', number: '' });
      }
    };

    // Логика ввода текста в инпуты для Add contact
    const handleInputChange = e => {
      this.setState({ [e.target.name]: e.target.value });
    };
    return (
      <div>
        <form className={css.phonebookWrap} onSubmit={handleBtnClick}>
          <label htmlFor="name">Name</label>
          <input
            className={css.input}
            id="name"
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={this.state.name}
            onChange={handleInputChange}
          />
          <label className={css.block} htmlFor="number">
            Number
          </label>
          <input
            className={css.input}
            id="number"
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={this.state.number}
            onChange={handleInputChange}
          />
          <br />
          <button className={css.btn} type="submit">
            Add contact
          </button>
        </form>
      </div>
    );
  }
}

export default Phonebook;

Phonebook.propTypes = {
  props: PropTypes.object.isRequired,
};

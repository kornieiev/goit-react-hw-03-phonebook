import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';

import css from './ContactForm.module.css';

export class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  //
  // Логіка кнопки Add contact:
  handleBtnClick = e => {
    e.preventDefault();
    const id = nanoid();
    if (!this.state.name && !this.state.number) {
      return;
    } else {
      let newContact = {
        id: id,
        name: this.state.name,
        number: this.state.number,
      };
      this.props.addNewContact(newContact);
      console.log(this.props);
      this.setState({ name: '', number: '' });
    }
  };

  //
  // Логіка вводення тексту в інпути для Add contact
  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div>
        <form className={css.phonebookWrap} onSubmit={this.handleBtnClick}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            className={css.input}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={this.state.name}
            onChange={this.handleInputChange}
          />
          <label className={css.block} htmlFor="number">
            Number
          </label>
          <input
            id="number"
            className={css.input}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={this.state.number}
            onChange={this.handleInputChange}
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

export default ContactForm;

ContactForm.propTypes = {
  props: PropTypes.object.isRequired,
};

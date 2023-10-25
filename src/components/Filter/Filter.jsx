import React from 'react';
import css from './Filter.module.css';

export default function Filter({ onFilterChange }) {
  return (
    <div>
      <p className={css.filterTitle}>Find contacts by name</p>
      <input
        onChange={onFilterChange}
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+((['-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />
    </div>
  );
}

import React from 'react';
import PropTypes from 'prop-types';

import css from './ContactList.module.css';

export default function Contacts({ contactsState, filter, deleteContact }) {
  let arr = Object.values(contactsState);
  let result = [];

  if (filter) {
    result = arr.filter(a =>
      a.name.toLowerCase().includes(filter.toLowerCase())
    );
  } else {
    result = arr;
  }

  return (
    <div>
      {result.map(item => (
        <li className={css.item} key={item.id}>
          {item.name}: {item.number}
          <button className={css.btn} value={item.id} onClick={deleteContact}>
            Delete
          </button>
        </li>
      ))}
    </div>
  );
}

Contacts.propTypes = {
  contactsState: PropTypes.array.isRequired,
};

import React from 'react';
import PropTypes from 'prop-types';

import css from './ContactList.module.css';

export default function ContactList({ contacts, deleteContact }) {
  return (
    <div>
      {contacts.map(item => (
        <li className={css.item} key={item.id}>
          {item.name}: {item.number}
          <button
            className={css.btn}
            value={item.id}
            onClick={() => deleteContact(item.id)}
          >
            Delete
          </button>
        </li>
      ))}
    </div>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
};

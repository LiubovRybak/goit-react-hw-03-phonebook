import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { Form } from './Form/Form';
import { ContactList } from './ContactsList/ContactsList';
import { ContactFilter } from './ContactFilter/ContactFilter';
import css from './App.module.css';

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

  addContact = data => {
    const contactInList = this.state.contacts.some(
      contact => contact.name.toLowerCase() === data.name.toLowerCase()
    );

    if (contactInList) {
      alert(`Contact ${data.name} already in list!`);
      return;
    }

    const newContact = {
      ...data,
      id: nanoid(),
    };

    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  handleDelete = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(newContact => newContact.id !== id),
    }));
  };

  onInputFilter = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(newContact =>
      newContact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  handleChange = event => {
    const { value } = event.target;
    this.setState({ filter: value });
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contactList');
    const parseContacts = JSON.parse(contacts);
    if (parseContacts) {
      this.setState({ contacts: parseContacts });
    }
  }

  componentDidUpdate(_, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem(ContactList, JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const onInputFilter = this.onInputFilter();
    return (
      <div className={css.container}>
        <h1 className={css.title}>Phonebook</h1>
        <Form handleSubmit={this.addContact} />
        <h2 className={css.title}>Contacts</h2>
        <ContactFilter
          filter={this.state.filter}
          handleChange={this.handleChange}
        />
        <ContactList data={onInputFilter} handleDelete={this.handleDelete} />
      </div>
    );
  }
}

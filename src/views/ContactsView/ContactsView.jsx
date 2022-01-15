import ContactForm from 'components/ContactForm';
import ContactList from 'components/ContactList';
import Filter from 'components/Filter';
import s from './ContactsView.module.css';
import Modal from 'components/Modal';
import ModalForm from 'components/ModalForm';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getContacts } from 'redux/contacts/contacts-selectors';

const ContactsView = () => {
  const contacts = useSelector(getContacts);
  const [toggle, setToggle] = useState(false);
  const [contact, setContact] = useState(null);

  const toggleOnClick = () => setToggle(!toggle);
  const onUpdateContact = id => {
    const contact = contacts.find(contact => contact.id === id);
    setContact(contact);
    toggleOnClick();
  };

  return (
    <div>
      <h1 className={s.title}>Phonebook</h1>
      <ContactForm />
      <h2 className={s.title}>Contacts</h2>
      <Filter />
      <ContactList contact={contact} onUpdateBtnClick={onUpdateContact} />
      {toggle && (
        <Modal onCloseModal={toggleOnClick}>
          <ModalForm contact={contact} toggleOnClick={toggleOnClick} />
        </Modal>
      )}
    </div>
  );
};

export default ContactsView;

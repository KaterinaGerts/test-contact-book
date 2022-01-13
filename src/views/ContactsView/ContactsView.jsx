import ContactForm from 'components/ContactForm';
import ContactList from 'components/ContactList';
import Filter from 'components/Filter';
import s from './ContactsView.module.css';
import Modal from 'components/Modal';
import ModalForm from 'components/ModalForm';
import { useState } from 'react';

const ContactsView = () => {
  const [toggle, setToggle] = useState(false);
  const toggleOnClick = () => setToggle(!toggle);

  return (
    <div>
      <h1 className={s.title}>Phonebook</h1>
      <ContactForm />
      <h2 className={s.title}>Contacts</h2>
      <Filter />
      <ContactList />
      {toggle && (
        <Modal closeModal={toggleOnClick}>
          <ModalForm />
        </Modal>
      )}
    </div>
  );
};

export default ContactsView;

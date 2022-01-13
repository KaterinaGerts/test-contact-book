import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import 'yup-phone';
import s from './ModalForm.module.css';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { updateContact } from 'redux/contacts/contacts-operations';
import Button from 'components/Button';
import { getContacts } from 'redux/contacts/contacts-selectors';

const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Too short name!')
    .max(50, 'Too long name!')
    .required('required field'),
  number: Yup.string()
    .phone('Put the number, start +7**********')
    .required('Required'),
});

const ModalForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);

  return (
    <Formik
      initialValues={{ name: '', number: '' }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        resetForm();
        const { name, number } = values;
        const checkedName = contacts.find(
          contact => contact.name.toLowerCase() === name.toLowerCase(),
        );
        if (checkedName) {
          alert(`${name} is already in contacts!`);
          return contacts;
        }
        dispatch(updateContact({ name, number }));
      }}
    >
      <Form className={s.form}>
        <label htmlFor="name" className={s.label}>
          Name{' '}
        </label>
        <Field className={s.input} type="text" name="name" placeholder="Name" />
        <ErrorMessage name="name" />
        <label htmlFor="number" className={s.label}>
          Number{' '}
        </label>
        <Field
          className={s.input}
          type="tel"
          name="number"
          placeholder="+7********"
        />
        <ErrorMessage name="number" />
        <Button type="submit">Edit contact</Button>
      </Form>
    </Formik>
  );
};

ModalForm.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      number: PropTypes.number.isRequired,
    }),
  ),
};

export default ModalForm;

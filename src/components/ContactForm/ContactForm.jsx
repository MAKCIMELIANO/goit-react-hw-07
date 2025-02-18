import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import css from './ContactForm.module.css';
import { addContact } from '../../redux/contactsOps';
import { selectContacts } from '../../redux/contactsSlice';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Required field')
    .min(3, 'Minimum 3 characters')
    .max(50, 'Maximum 50 characters'),
  number: Yup.string()
    .required('Required field')
    .min(3, 'Minimum 3 characters')
    .max(50, 'Maximum 50 characters'),
});

export default function ContactForm() {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const handleSubmit = async (values, { resetForm }) => {
    const newContact = {
      name: values.name,
      number: values.number,
    };

    const duplicate = contacts.find(
      contact => contact.name === newContact.name,
    );

    if (duplicate) {
      alert(`${newContact.name} is already in contacts.`);
    } else {
      try {
        await dispatch(addContact(newContact)).unwrap();
        resetForm();
      } catch (error) {
        console.error('Failed to add contact: ', error);
      }
    }
  };

  return (
    <Formik
      initialValues={{ name: '', number: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className={css.contactForm}>
          <div className={css.fieldWrapper}>
            <Field type="text" name="name" placeholder="Name" />
            <ErrorMessage name="name" component="div" className={css.error} />
          </div>
          <div className={css.fieldWrapper}>
            <Field type="text" name="number" placeholder="Number" />
            <ErrorMessage name="number" component="div" className={css.error} />
          </div>
          <button type="submit" disabled={isSubmitting}>
            Add contact
          </button>
        </Form>
      )}
    </Formik>
  );
}

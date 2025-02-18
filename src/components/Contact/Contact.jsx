import { useDispatch } from 'react-redux';
import { FaUser, FaPhone } from 'react-icons/fa';
import css from './Contact.module.css';
import { deleteContact } from '../../redux/contactsOps'; // Импортируем из contactsOps

export default function Contact({ contact }) {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    try {
      await dispatch(deleteContact(contact.id)).unwrap();
    } catch (error) {
      console.error('Failed to delete contact: ', error);
    }
  };

  return (
    <div className={css.contact}>
      <div>
        <h2 className={css.title}>
          <FaUser />
          {contact.name}
        </h2>
        <p className={css.number}>
          <FaPhone /> {contact.number}
        </p>
      </div>

      <button className={css.button} type="button" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
}

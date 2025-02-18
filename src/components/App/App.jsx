import './App.css';
import ContactForm from '../../components/ContactForm/ContactForm';
import SearchBox from '../../components/SearchBox/SearchBox';
import ContactList from '../../components/ContactList/ContactList';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {
  fetchContacts,
  addContact,
  deleteContact,
} from '../../redux/contactsOps';
import { selectLoading, selectError } from '../../redux/contactsSlice';

export default function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleAddContact = newContact => {
    dispatch(addContact(newContact));
  };

  const handleDeleteContact = contactId => {
    dispatch(deleteContact(contactId));
  };

  return (
    <div>
      <h1>Phonebook</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ContactForm onAddContact={handleAddContact} />
      <SearchBox />
      <ContactList onDeleteContact={handleDeleteContact} />
    </div>
  );
}

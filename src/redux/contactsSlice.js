import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { fetchContacts, addContact, deleteContact } from './contactsOps';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(addContact.pending, state => {
        state.status = 'loading';
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items.push(action.payload);
      })
      .addCase(addContact.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(deleteContact.pending, state => {
        state.status = 'loading';
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = state.items.filter(
          contact => contact.id !== action.payload,
        );
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const selectContacts = state => state.contacts.items;
export const selectLoading = state => state.contacts.status === 'loading';
export const selectError = state => state.contacts.error;

export const selectFilteredContacts = createSelector(
  [selectContacts, state => state.filters.name],
  (contacts, filter) =>
    contacts.filter(
      contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase()) ||
        String(contact.number).includes(filter.toLowerCase()),
    ),
);

export default contactsSlice.reducer;

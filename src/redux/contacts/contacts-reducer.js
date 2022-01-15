import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import { changeFilter } from './contacts-actions';
import {
  fetchAllContacts,
  addContact,
  deleteContact,
  updateContact,
} from 'redux/contacts/contacts-operations';

const item = createReducer([], {
  [fetchAllContacts.fulfilled]: (_, { payload }) => payload,
  [addContact.fulfilled]: (state, { payload }) => [...state, payload],
  [deleteContact.fulfilled]: (state, { payload }) =>
    state.filter(({ id }) => id !== payload),
  [updateContact.fulfilled]: (state, { payload }) =>
    state.map(contact => (contact.id === payload.id ? payload : contact)),
});

const filter = createReducer('', {
  [changeFilter]: (_, { payload }) => payload,
});

const isLoading = createReducer(null, {
  [fetchAllContacts.pending]: () => true,
  [addContact.pending]: () => true,
  [deleteContact.pending]: () => true,
  [updateContact.pending]: () => true,

  [fetchAllContacts.fulfilled]: () => false,
  [addContact.fulfilled]: () => false,
  [deleteContact.fulfilled]: () => false,
  [updateContact.fulfilled]: () => false,

  [fetchAllContacts.rejected]: () => false,
  [addContact.rejected]: () => false,
  [deleteContact.rejected]: () => false,
  [updateContact.rejected]: () => false,
});

const error = createReducer(null, {
  [fetchAllContacts.rejected]: (_, { payload }) => payload.message,
  [addContact.rejected]: (_, { payload }) => payload.message,
  [deleteContact.rejected]: (_, { payload }) => payload.message,
  [updateContact.rejected]: (_, { payload }) => payload.message,

  [fetchAllContacts.pending]: () => null,
  [addContact.pending]: () => null,
  [deleteContact.pending]: () => null,
  [updateContact.pending]: () => null,
});

const contactsReducer = combineReducers({
  item,
  filter,
  isLoading,
  error,
});

export default contactsReducer;

'use strict';

import ext from 'jquery-extend';
import { actions } from '../../../constants';
import {
  completelyFilledOut, formValidator, isFormValid
} from './validations';

const {
  UPDATE_FORM,
  INLINE_VALIDATE_ALL_FIELDS,
  VALIDATE_FIELD,
  CREATING_URL,
  ERROR_CREATE_URL,
  SUCCESS_CREATE_URL,
  CLEAR_VALIDATIONS,
} = actions;

export function form_global_errors(state=[], action) {
  switch(action.type) {
    case CLEAR_VALIDATIONS:
      return [];
    case CREATING_URL:
      return [];
    case SUCCESS_CREATE_URL:
      return [];
    default:
      return state
  }
}

export function form_validations(state={}, action) {
  let validations;
  let key;
  switch(action.type) {
    // get current validated field and remove that from this state
    // this is done so inline validations aren't showing this
    // value in state;
    case UPDATE_FORM:
      key = Object.keys(action.data)[0];
      if (state[key]) delete state[key];
      return ext(true, {}, state);
    case INLINE_VALIDATE_ALL_FIELDS:
      validations = Object.keys(action.data).reduce((curr, key) => {
          const value = action.data[key];
          const validations = formValidator.validate({ [key]: value });
          if (validations.length > 0) curr[key] = validations;
          return curr;
        }, {});
      if (Object.keys(validations).length > 0) return ext(true, {}, state, validations);
      return ext(true, {}, state);
    case VALIDATE_FIELD:
      key = action.data.key;
      validations = formValidator.validate(action.data);
      if (validations.length > 0) return ext(true, {}, state, { [key]: validations });
      return ext(true, {}, state);
    default:
      return ext(true, {}, state);
  }
}

export const initialFormState = {

  url: null,

  creating_url: false,
  success_create_url: false,
  error_create_url: false,

  valid: false,
  filled_out: false,
  complete: false,

};

export function shortener_form(state=initialFormState, action) {
  switch(action.type) {
    case CREATING_URL:
      return ext({}, state, { creating_account: true, });
    case ERROR_CREATE_URL:
      return ext({}, state, action.data, {
        complete: true,
        filled_out: true,
        success_create_account: false,
        creating_account: false
      });
    case SUCCESS_CREATE_URL:
      return ext({}, state, action.data, {
        complete: true,
        filled_out: true,
        success_create_account: false,
        creating_account: false
      });
    case UPDATE_FORM:
      const newState = ext({}, state, action.data);
      newState.valid = isFormValid(newState);
      return newState;
    default:
      return state;
  }
};

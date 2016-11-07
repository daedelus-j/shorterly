import ext from 'jquery-extend';
import { devices, actions } from '../../constants';
import {
  completelyFilledOut, formValidator, isFormValid
} from './create/validations';

const {
  UPDATE_FORM,
  INLINE_VALIDATE_ALL_FIELDS,
  VALIDATE_FIELD,
  UPDATING_URL,
  ERROR_UPDATE_URL,
  SUCCESS_UPDATE_URL,
  CLEAR_VALIDATIONS,
  UPDATE_ACTIVE_DEVICE,
  SHOW_DETAILS_EDIT_FORM,
  CLOSE_DETAILS_EDIT_FORM,
  COPIED_URL,
  CLEAR_COPIED_URL,
} = actions;


export const initialFormState = {

  url: null,
  selected_device: devices.DESKTOP,

  creating_url: false,
  success_create_url: false,
  error_create_url: false,
  form_active: false,

  valid: false,
  filled_out: false,
  complete: false,

};


export function shortener_details_form(state=initialFormState, action) {

  if (action.type.match('SUCCESS_UPDATE_URL')) {
    return  ext({}, state, {
      form_active: false
    });
  }
  switch(action.type) {
    case SHOW_DETAILS_EDIT_FORM:
      return  ext({}, state, { url: action.data.url, form_active: true });
    case CLOSE_DETAILS_EDIT_FORM:
      return  ext({}, state, { url: null, form_active: false });
    case UPDATE_ACTIVE_DEVICE:
      return ext({}, state, action.data);
    case UPDATING_URL:
      return ext({}, state, { creating_account: true, });
    case SUCCESS_UPDATE_URL:
      state.url.devices
      return ext({}, state, action.data, {

      });
    case UPDATE_FORM:
      const newState = ext({}, state, action.data);
      newState.valid = isFormValid(newState);
      return newState;
    default:
      return state;
  }
}

export function copied_url(state={
  active: false,
}, action) {
  switch(action.type) {
    case COPIED_URL:
      return { active: true };
    case CLEAR_COPIED_URL:
      return { active: false };
    default:
      return state;
  }
}

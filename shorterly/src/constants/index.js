'use strict';
import mirror from 'keymirror';


function updateRequestCycle(name) {
  return mirror({
    [`CREATING_${name}`]: null,
    [`SUCCESS_CREATE_${name}`]: null,
    [`ERROR_CREATE_${name}`]: null,
  });
}

function createRequestCycle(name) {
  return mirror({
    [`UPDATING_${name}`]: null,
    [`SUCCESS_UPDATE_${name}`]: null,
    [`ERROR_UPDATE_${name}`]: null,
  });
}

export const actions = mirror({
  INLINE_VALIDATE_ALL_FIELDS: null,
  VALIDATE_FIELD: null,
  UPDATE_FORM: null,
  CLEAR_VALIDATIONS: null,
  UPDATE_ACTIVE_DEVICE: null,
  SHOW_DETAILS_EDIT_FORM: null,
  CLOSE_DETAILS_EDIT_FORM: null,
  COPIED_URL: null,
  CLEAR_COPIED_URL: null,

  ...createRequestCycle('URL'),
  ...updateRequestCycle('URL'),

});

export const devices = mirror({
  DESKTOP: null,
  MOBILE: null,
  TABLET: null,
});


export const url_types = [
  {
    type: devices.DESKTOP,
    icon_classname: 'laptop'
  },
  {
    type: devices.MOBILE,
    icon_classname: 'mobile'
  },
  {
    type: devices.TABLET,
    icon_classname: 'tablet'
  },
]

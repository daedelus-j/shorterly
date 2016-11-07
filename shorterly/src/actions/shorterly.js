'use strict'

import ext from 'jquery-extend';
import { actions } from '../constants';
import xhr from 'xhr';
import cookie from 'cookie';
import { routerActions } from 'react-router-redux';


const {
  UPDATE_FORM,
  INLINE_VALIDATE_ALL_FIELDS,
  VALIDATE_FIELD,

  CLEAR_VALIDATIONS,

  CREATING_URL,
  ERROR_CREATE_URL,
  SUCCESS_CREATE_URL,

  UPDATE_ACTIVE_DEVICE,

  UPDATING_URL,
  SUCCESS_UPDATE_URL,
  ERROR_UPDATE_URL,

  SHOW_DETAILS_EDIT_FORM,
  CLOSE_DETAILS_EDIT_FORM,

  COPIED_URL,
  CLEAR_COPIED_URL,

} = actions;


function headers() {
  let token = cookie
    .parse(document.cookie)
    .csrftoken;

  return {
    'X-CSRFToken': token,
    'Authorize': token,
    'Content-Type': 'application/json'
  };
}

function updateForm(props) {
  return dispatch => {
    dispatch({
      type: UPDATE_FORM,
      data: props,
    });
  };
}

function validateField({ field_key, field_value }) {
  return (dispatch, getState) => {
    dispatch({
      type: VALIDATE_FIELD,
      data: { key: field_key, value: field_value },
    });
  };
}

function clearValidations() {
  return dispatch => {
    dispatch({
      type: CLEAR_VALIDATIONS,
    });
  };
}

function inlineValidateAll(props) {
  return dispatch => {
    dispatch({
      type: INLINE_VALIDATE_ALL_FIELDS,
      data: props
    });
  }
}


function createUrl(props) {
  return dispatch => {
    let url = '/api/urls/';
    dispatch({ type: CREATING_URL })
    xhr({
      json: { url: props.url },
      method: 'POST',
      uri: url,
      headers: headers()
    }, function (err, resp, body) {
      dispatch({
        type: SUCCESS_CREATE_URL,
        data: body.url
      });
      dispatch(
        routerActions.push(`/urls/${body.url.id}/`)
      );
    })
  }
}

function updateDeviceUrl(device, new_url) {
  return (dispatch, getState) => {
    let url = `/api/device-urls/${device.id}/`;
    dispatch({ type: UPDATING_URL })
    xhr({
      json: { url: new_url },
      method: 'PUT',
      uri: url,
      headers: headers()
    }, function (err, resp, body) {
      dispatch({
        type: `SUCCESS_UPDATE_URL_${body.device_url.type}`,
        data: body.device_url
      });
    })
  }
}

function updateActiveDevice(type) {
  return dispatch => {
    dispatch({
      type: UPDATE_ACTIVE_DEVICE,
      data: {
        selected_device: type
      }
    })
  }
}

function showDetailsEditForm() {
  return (dispatch, getState) => {
    const { shortener_details_form } = getState();
    const { selected_device } = shortener_details_form;
    const active_device = getState()[
      `synced_url_${selected_device.toLowerCase()}`
    ];
    dispatch({
      type: SHOW_DETAILS_EDIT_FORM,
      data: { url: active_device.url }
    })
  }
}

function closeDetailsEditForm() {
  return dispatch => dispatch({ type: CLOSE_DETAILS_EDIT_FORM })
}

let timeout = null;
function copiedUrl() {
  return dispatch => {
    dispatch({ type: CLEAR_COPIED_URL })
    setTimeout(
      () => {
        if (timeout) clearTimeout(timeout);
        dispatch({ type: COPIED_URL });
        timeout = setTimeout(
          () => {
            timeout = null;
            dispatch({ type: CLEAR_COPIED_URL })
          },
          3000
        );
      },
      0
    )
  }
}

export {

  validateField,
  clearValidations,
  updateForm,
  inlineValidateAll,
  createUrl,
  updateDeviceUrl,
  copiedUrl,
  updateActiveDevice,
  showDetailsEditForm,
  closeDetailsEditForm,

};

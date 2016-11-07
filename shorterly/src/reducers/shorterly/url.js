'use strict';

import ext from 'jquery-extend';

import { actions } from '../../constants'

const {
  SUCCESS_CREATE_URL
} = actions;

export function synced_url_mobile(state={}, action) {
  switch(action.type) {
    case SUCCESS_CREATE_URL:
      return action.data.devices.MOBILE
    case 'SUCCESS_UPDATE_URL_MOBILE':
      return ext({}, state, action.data);
    default:
      return state
  }
}

export function synced_url_tablet(state={}, action) {
  switch(action.type) {
    case SUCCESS_CREATE_URL:
      return action.data.devices.TABLET
    case 'SUCCESS_UPDATE_URL_TABLET':
      return ext({}, state, action.data);
    default:
      return state
  }
}

export function synced_url_desktop(state={}, action) {
  switch(action.type) {
    case SUCCESS_CREATE_URL:
      return action.data.devices.DESKTOP
    case 'SUCCESS_UPDATE_URL_DESKTOP':
      return ext({}, state, action.data);
    default:
      return state
  }
}

export function urls(state=[], action) {
  switch(action.type) {
    default:
      return state
  }
}

export function synced_url(state={}, action) {
  switch(action.type) {
    case SUCCESS_CREATE_URL:
      return action.data
    default:
      return state
  }
}

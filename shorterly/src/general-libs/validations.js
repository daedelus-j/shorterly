'use strict';


import ext from 'jquery-extend';
import url from 'valid-url';

function notEmptyNullUndefined(val) {
  return val !== '' &&
    val !== null &&
      typeof val !== 'undefined';
}

const validUrl = (str) => typeof url.isUri(str) !== 'undefined'

const validateUrl = (str) => validUrl(str)
  ? ''
  : 'Must be a valid url ie. https://www.google.com';

export const validations = {
  url: validUrl,
};

export const validation_messages = {
  url: validateUrl,
};

function validateAll(vals) {
  return (val) => vals
    .map(f => f(val))
    .filter(notEmptyNullUndefined)
}

function singleRequired(key, value, required_fields) {
  return required_fields.filter(f => f === key)
    .map(() => notEmptyNullUndefined(value))
    .filter(f => !f)
    .map(f => 'Field required');
}

function validateField(
    { key, value },
    validations_list,
    required_fields
  ) {
  let additionalValidations = [];
  if (validations_list[key]) {
    additionalValidations = validateAll(
      validations_list[key]
    )(value);
  }

  if (required_fields.indexOf(key) === -1 &&
    (value === '' || value === null)) {
    return [];
  }
  return [
    ...singleRequired(key, value, required_fields),
    ...additionalValidations
  ];
}

function passesRequirements(props, required_fields) {
  return required_fields
    .map(f => props[f])
    .every(notEmptyNullUndefined);
}

export const formValidator = ({ validations, required_fields }) => {
  return {
    validate: (props) => validateField(
      props, validations, required_fields
    ),
    passesRequirements: (props) => passesRequirements(
      props, required_fields
    )
  }
};

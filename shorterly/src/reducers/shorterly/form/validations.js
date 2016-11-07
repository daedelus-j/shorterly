'use strict';

import ext from 'jquery-extend';
import {
  formValidator as validator,
  validations as validators,
  validation_messages as messages
} from '../../../general-libs/validations';

const required_fields = [
  'url',
];

const fieldValidations = {
  first_name: [messages.url],
}

export const formValidator = validator({
  validations: fieldValidations,
  required_fields
});

export function completelyFilledOut(props) {
  return formValidator.passesRequirements(props);
}

export function isFormValid(props) {
  const { url } = props;
  const hasRequiredFields = completelyFilledOut(props);
  const isValidUrl = validators.url(url);
  return hasRequiredFields && isValidUrl;
}

'use strict';

import React from 'react';
import ext from 'jquery-extend';
import cx from 'classnames';
import LabelInput from '../../form/label-input';
import FieldErrors from '../../form/field-errors';

export const FORM_FIELDS = [
  {
    field: 'url',
    initial_focus: true,
    placeholder: 'Paste Url Here',
    label: 'Your Url'
  },
];

export default React.createClass({

  onChange(val, key) {
    const { onChange } = this.props
    onChange({ [key]: val });
  },

  render() {
    const {
      form_global_errors,
      form_validations,
      form,
      label: labelOverride,
      onSubmit,
      onBlur,
    } = this.props
    const { url, } = form;
    const currentFields = { url, };
    const { onChange } = this;

    let formFields = FORM_FIELDS.map(p => ext({}, p, {
        value: currentFields[p.field]
      }));

    return (
      <div className={`${this.props.className}`}>
      {
        form_global_errors.map(({ message }) => <span
             key={message}
             className='form-error--general'>
             {message}
           </span>
          )
      }
      {
        formFields.map(fieldObject => {
          let {
            type='text', field, label, value,
            placeholder,
            initial_focus, field_errors_classname
          } = fieldObject;

          const valid = typeof form_validations[field] === 'undefined';
          let className = cx({
            'form__field': true,
            'form__field--errors': !valid
          });


          return (
            <div key={field} className={className}>
              <LabelInput onChange={onChange}
                initial_focus={initial_focus}
                valid={valid}
                input_type={type}
                label={labelOverride || label}
                placeholder={placeholder}
                field_name={field}
                onEnter={onSubmit}
                value={value} />
              <FieldErrors container_classname={{}}
                errors={form_validations[field]} />
            </div>
          );
        })
      }
      </div>
    );
  }
});

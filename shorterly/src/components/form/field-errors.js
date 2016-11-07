'use strict';

import React from 'react';
import cx from 'classnames';

const Error = ({ is_last, message }) => {
  const text = is_last ? message : `${message}, `;
  return (
    <span className='form__field__error'>{text}</span>
  );
};

export default ({ errors=[], container_classname='' }) => {
  if (errors.length === 0) return <span/>
  const classNames = cx({
    'field-errors': true,
  }) + ` ${container_classname}`;

  return (
    <div className={classNames}>
      {
        errors.map((e, i) => <Error
          is_last={i === errors.length - 1}
          message={e}/>)
      }
    </div>
  );
};


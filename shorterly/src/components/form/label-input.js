'use strict';

import React from 'react';
import cx from 'classnames';

const LabelInput = React.createClass({
  propTypes: {
    value: React.PropTypes.string,
    input_type: React.PropTypes.string,
    onChange: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    onBlur: React.PropTypes.func,
  },

  getInitialState() {
    return {
      focused: false
    };
  },

  componentDidMount() {
    if (this.props.initial_focus) this.refs.input.focus();
  },

  onChange(e) {
    let { onChange, field_name } = this.props;
    onChange(e.target.value, field_name, e)
  },

  onKeyUp(e) {
    let { onEnter, field_name } = this.props;
    if (e.keyCode === 13) {
      onEnter && onEnter(
        e.target.value,
        field_name
      );
    }
  },

  onFocus(e) {
    let { onFocus, field_name } = this.props;
    onFocus && onFocus(e.target.value, field_name, e);
    this.setState({ focused: true });
  },

  render() {
    const {
      containerClassName='',
      className='',
      input_type='text',
      value='',
      placeholder,
      inputClassName='',
      label='',
      valid=false
    } = this.props
    const { focused } = this.state;
    const isEmpty = value === '' || value === null;
    const defaultInputClassname = cx({
      'form__field__input': true,
      'form__field__input--not-empty': !isEmpty,
      'form__field__input--empty': isEmpty,
      'form__field__input--invalid': !valid,
    });
    const labelClassname = cx({
      'form__field__label': true,
      'form__field__label--shown': true,
      'form__field__label--invalid': !valid,
    });

    return (
      <div className='form__control'>
        <label className={labelClassname}>{label}</label>
        <input type={input_type}
          ref='input'
          className={defaultInputClassname}
          onChange={this.onChange}
          onFocus={this.onFocus}
          onKeyUp={this.onKeyUp}
          value={value}
          placeholder={placeholder} />
      </div>
    );
  }
});

export default LabelInput;

'use strict';

import React from 'react';
import { connect } from 'react-redux';
import { createUrl, updateForm, validateField } from '../../../actions/shorterly'
import { url_types } from '../../../constants'
import pvd from '../../../general-libs/preventer';
import { isFormValid } from '../../../reducers/shorterly/form/validations'
import FormBody from './body'


const UrlType  = ({ icon_classname }) => {
  return (
    <div className='spacer url-type center'>
      <i className={`fa fa-${icon_classname}`} />
    </div>
  );
}

const MarketingProposition = ({ }) => {
  return (
    <div className='container__inner--spacer'>
      <h3 className='header--3 center'>Customize urls for all devices!</h3>
      {
        url_types.map(type => {
          return <UrlType {...type} />
        })
      }
    </div>
  );
}

const ShortenerForm = React.createClass({

  onChange(props) {
    const {
      updateForm,
      dispatch
    } = this.props;
    dispatch(updateForm(props));
  },

  onSubmit() {
    const { shortener_form, createUrl } = this.props;
    const { url } = shortener_form;
    const { dispatch, validateField } = this.props;

    if (isFormValid(shortener_form)) {
      dispatch(createUrl({ url }));
    } else {
      dispatch(validateField({
        field_key: 'url',
        field_value: url
      }));
    }
  },

  render()  {
    const {
      shortener_form
    } = this.props;
    return (
      <div className='container__inner'>
        <div className='spacer center'>
          <h1 className='header--1 spacer--half-bottom'>SHORTERLY</h1>
          <h2 className='header--2'>Your favorite url shortener</h2>
        </div>
        <div className='btn-cont spacer--bottom container--raised'>
          <FormBody
            className='btn-cont__attached-to'
            form={shortener_form}
            {...this.props}
            onChange={this.onChange}
            onSubmit={this.onSubmit} />
          <div className='btn-cont__attached'>
            <a onClick={pvd(this.onSubmit)} className='btn--primary btn--shorten' href='#'>Shorten</a>
          </div>
        </div>
        <MarketingProposition />
      </div>
    );
  }
});


const mapStateToProps = ({
  form_global_errors,
  form_validations,
  shortener_form,
}) => ({

  // reducers
  form_global_errors,
  form_validations,
  shortener_form,

  // actions
  updateForm,
  validateField,
  createUrl
});


export default connect(mapStateToProps)(ShortenerForm);

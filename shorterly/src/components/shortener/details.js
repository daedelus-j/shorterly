'use strict';

import React from 'react';
import cx from 'classnames';
import copy from 'copy-to-clipboard';
import { connect } from 'react-redux';
import {
  updateDeviceUrl, updateForm,
  validateDetailsField,
  updateActiveDevice,
  showDetailsEditForm,
  closeDetailsEditForm,
  copiedUrl,
  validateField,
} from '../../actions/shorterly'
import { url_types } from '../../constants'
import pvd from '../../general-libs/preventer';
import { isFormValid } from '../../reducers/shorterly/form/validations';
import FormBody from './form/body'


const UrlType  = ({ type, onSelect, selected, icon_classname }) => {
  const classNames = cx({
    'url-type': true,
    'url-type--active': selected,
    'url-type--details': true,
    center: true,
  });

  const headerClassnames = cx({
    'header--4': true,
    'header--4--active': selected,
    'spacer--quarter-top': true,
    center: true,
  })

  return (
    <div onClick={pvd(()=>onSelect(type))} className={classNames}>
      <i className={`fa fa-${icon_classname}`} />
      <h3 className={headerClassnames}>{type}</h3>
    </div>
  );
}

const UrlButtons = ({ selected, onSelect }) => {
  return (
    <div className='container__inner--spacer'>
      {
        url_types.map(type => {
          return <UrlType
            onSelect={onSelect}
            selected={selected === type.type}
            key={type.type}
            {...type} />
        })
      }
    </div>
  );
}

const UrlDetails = React.createClass({

  onChange(props) {
    const {
      updateForm,
      dispatch
    } = this.props;
    dispatch(updateForm(props));
  },

  onSubmit() {
    const {
      active_device_model,
      shortener_details_form, updateDeviceUrl } = this.props;
    const { url } = shortener_details_form;
    const { dispatch, validateField } = this.props;

    if (isFormValid(shortener_details_form)) {
      dispatch(
        updateDeviceUrl(active_device_model, url)
      );
    } else {
      dispatch(validateField({
        field_key: 'url',
        field_value: url
      }));
    }
  },

  onSelect(type) {
    const {
      shortener_details_form,
      dispatch,
      updateActiveDevice
    } = this.props;
    if (shortener_details_form.form_active) return;
    dispatch(updateActiveDevice(type))
  },

  showForm() {
    const { dispatch, showDetailsEditForm } = this.props;
    dispatch(showDetailsEditForm());
  },

  closeForm() {
    const { dispatch, closeDetailsEditForm } = this.props;
    dispatch(closeDetailsEditForm());
  },

  onCopy() {
    const {
      active_device_model,
      copiedText,
      dispatch,
      synced_url,
    } = this.props;
    const { short_url } = synced_url;
    dispatch(copiedUrl());
    copy(short_url);
  },

  render()  {
    const {
      shortener_details_form,
      synced_url_desktop,
      synced_url_mobile,
      synced_url_tablet,
      active_device_model,
      copied_url,
      synced_url,
    } = this.props;
    const devices = {
      synced_url_desktop,
      synced_url_mobile,
      synced_url_tablet,
    };
    const { short_url } = synced_url;
    const {
      selected_device,
      form_active,
    } = shortener_details_form;
    const {
      url, visits,
      url_id, url_domain,
    } = active_device_model;
    const urlCopiedClassnames = cx({
      'url-copied': true,
      'url-copied--active': copied_url.active,
    });

    const body = form_active
      ? <div>
          <FormBody
            label={`Url`}
            form={shortener_details_form}
            {...this.props}
            onChange={this.onChange}
            onSubmit={this.onSubmit} />
          <div className='actions--right'>
            <a onClick={pvd(this.closeForm)}
              className='btn--sm btn btn--shorten spacer--quarter-right'
              href='#'>Cancel</a>
            <a onClick={pvd(this.onSubmit)}
              className='btn--sm btn--primary btn--shorten'
              href='#'>Update</a>
          </div>
        </div>
      : <div className='edit-cont'>
          <div className='header--4 spacer--quarter-bottom'>Redirect Url</div>
          <div className='float-r'>
            <a onClick={this.showForm} className='btn--primary btn--icon'>
              <i className='fa fa-pencil' />
            </a>
          </div>
          <div  className='edit-placeholder'>
            {url}
          </div>
        </div>

    return (
      <div className='container__inner'>
        <div className='spacer center'>
          <h1 className='header--1 spacer--half-bottom'>SHORTERLY</h1>
          <h2 className='header--2'>Your favorite url shortener</h2>
        </div>
        <div className='container--raised'>
          <div className='center clipboard spacer--half-bottom'>
            <div className='header--4 spacer--quarter-bottom'>Total Visits: {synced_url.total_visits}</div>
              Shortened Url:
              <br/>
              <span className='clipboard__url header--2'>{short_url}</span>
              <a onClick={pvd(this.onCopy)}
                className='spacer--quarter-top spacer--quarter-right btn--sm btn--primary'>
                Copy
              </a>
              <div className={urlCopiedClassnames}>Copied!</div>
          </div>
          <div className='btn-cont spacer--bottom btn-cont--details'>
            <h3 className='header--3 spacer--half-bottom'>{selected_device}</h3>
            <div className='header--4 spacer--half-bottom'>Visits: <b>{visits}</b></div>
            {body}
          </div>
          <UrlButtons
            onSelect={this.onSelect}
            selected={selected_device} />
        </div>
      </div>
    );
  }
});


const mapStateToProps = ({
  form_global_errors,
  form_validations,
  shortener_details_form,
  synced_url_desktop,
  synced_url_mobile,
  synced_url_tablet,
  copied_url,
  synced_url,
}) => {
  const devices = {
    synced_url_desktop,
    synced_url_mobile,
    synced_url_tablet,
  };
  const { selected_device } = shortener_details_form;
  const active_device_model = devices[`synced_url_${selected_device.toLowerCase()}`];

  return {
    // reducers
    form_global_errors,
    form_validations,
    shortener_details_form,
    synced_url_desktop,
    synced_url_mobile,
    synced_url_tablet,
    active_device_model,
    synced_url,
    copied_url,

    // actions
    updateForm,
    validateDetailsField,
    updateDeviceUrl,
    updateActiveDevice,
    showDetailsEditForm,
    closeDetailsEditForm,
    copiedUrl,
    validateField
  };
};


export default connect(mapStateToProps)(UrlDetails);

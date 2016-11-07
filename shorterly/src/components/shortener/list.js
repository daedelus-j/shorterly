'use strict';

import React from 'react';
import { connect } from 'react-redux';

const Url  = ({ id, devices, short_url, total_visits }) => {
  return (
    <div className='url spacer'>
      <h3 className='body--1'>Short url: {short_url}</h3>
      <h3 className='header--4'>id: {id}</h3>
      <h3 className='header--4'>Total visits: {total_visits}</h3>
      <h3 className='header--4'>Mobile Visits: {devices.MOBILE.visits}</h3>
      <h3 className='header--4'>Desktop Visits: {devices.DESKTOP.visits}</h3>
      <h3 className='header--4'>Tablet Visits: {devices.TABLET.visits}</h3>
    </div>
  );
}

const UrlList = React.createClass({

  render()  {
    const {
      urls
    } = this.props;
    const body = urls.length > 0
      ? <div className='container--raised'>
          <h3 className='header--3'>Created Urls ({urls.length})</h3>
          {
            urls.map(u => <Url key={u.id} {...u}/>)
          }
        </div>
      : <div className='container--raised'>
          <h3 className='header--3'>No urls created yet. <a href='/'>go home to create one</a></h3>
        </div>

    return (
      <div className='container__inner'>
        <div className='spacer center'>
          <h1 className='header--1 spacer--half-bottom'>SHORTERLY</h1>
          <h2 className='header--2'>Your favorite url shortener</h2>
        </div>
        {body}
      </div>
    );
  }
});


const mapStateToProps = ({ urls }) => ({
  // reducers
  urls,
});


export default connect(mapStateToProps)(UrlList);

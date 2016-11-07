'use strict';

require('../less/shorterly/index.less');

import React from 'react';
import ReactDOM from 'react-dom';
import ready from 'domready';
import { Provider } from 'react-redux';
import { factory } from '../stores';
import routes from '../routes/shorterly';
import { syncHistoryWithStore } from 'react-router-redux';
import { Router, browserHistory } from 'react-router';

function dataAdaptor(data) {
  if (!data) return {};
  if (data.urls) {
    return {
      urls: data.urls
    }
  }

  return {
    synced_url: data.url,
    synced_url_desktop: data.url.devices.DESKTOP,
    synced_url_mobile: data.url.devices.MOBILE,
    synced_url_tablet: data.url.devices.TABLET,
  }
}

ready(() => {
  const store = factory(browserHistory, dataAdaptor(window.__initial_state__));
  const history = syncHistoryWithStore(browserHistory, store);
  // hack for now to expose constructed store
  window.store = store;
  ReactDOM.render(
    <Provider store={store}>
      <Router history={history} routes={routes} />
    </Provider>
    , document.getElementById('content')
  );
});

'use strict';

import React from 'react';
import {
  IndexRoute, Redirect, Route
} from 'react-router';
import ShortenerForm from '../components/shortener/form';
import UrlDetails from '../components/shortener/details';
import UrlsList from '../components/shortener/list';


export default (
  <Route>
    <IndexRoute component={ShortenerForm}/>
    <Route path='/' component={ShortenerForm}/>
    <Route path='/urls/' component={UrlsList}/>
    <Route path='/urls/:id' component={UrlDetails} />
  </Route>
);


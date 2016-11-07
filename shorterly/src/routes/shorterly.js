'use strict';

import React from 'react';
import {
  IndexRoute, Redirect, Route
} from 'react-router';
import CreateForm from '../components/shortener/create';
import UrlDetails from '../components/shortener/details';
import UrlsList from '../components/shortener/list';


export default (
  <Route>
    <IndexRoute component={CreateForm}/>
    <Route path='/' component={CreateForm}/>
    <Route path='/urls/' component={UrlsList}/>
    <Route path='/urls/:id' component={UrlDetails} />
  </Route>
);


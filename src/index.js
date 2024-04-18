import React from 'react';
import ReactDOM from 'react-dom';

// router
import { ScrollToTop } from './utils/scrollToTop';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

// views
import { Home } from './views/Home';
import { Resume } from './views/Resume';
import { Projects } from './views/Projects';
import { NotFound } from './views/NotFound';

// styles
import './assets/styles/fonts.fontawesome.min.css';
import './assets/styles/main.min.css';

ReactDOM.render(
  <BrowserRouter>
    <ScrollToTop />
    <Switch>
      <Route path='/' exact component={Home} />
      <Route path='/404/' component={NotFound} />
      <Route path='/resume/' component={Resume} />
      <Route path='/projects/' component={Projects} />

      <Redirect from='*' to='/404/' />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);

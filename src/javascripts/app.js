/** @jsx React.DOM */

"use strict";

var React = require('react')
  , Dispatcher = require('./dispatcher.js')
  , Router = require('react-router')
  , Routes = Router.Routes
  , Route = Router.Route
  , Link = Router.Link
  , VasComponent = require('./components/vas/base.js')
  , App
  , routes;

App = React.createClass({
  render: function () {
    // <button id='button-full-screen'>Open Full Screen</button>
    return (
      <div className="wrapper">
        <header>
          <i className="fa fa-bars"></i>
          <ul>
            <li><Link to='vas'>VAS</Link></li>
          </ul>
        </header>
        <div id="content" className="content">
          <this.props.activeRouteHandler/>
        </div>
      </div>
    );
  }
});

routes = (
  <Routes location="hash">
    <Route name="app" path="/" handler={App}>
      <Route name="vas" handler={VasComponent}/>
    </Route>
  </Routes>
);

React.renderComponent(routes, document.body);

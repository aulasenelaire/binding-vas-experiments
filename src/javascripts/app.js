/** @jsx React.DOM */

"use strict";

var React = require('react')
  , Dispatcher = require('./dispatcher.js')
  , Router = require('react-router')
  , Routes = Router.Routes
  , Route = Router.Route
  , Link = Router.Link
  , TodoListComponent = require('./components/todo/list.js')
  , VasComponent = require('./components/vas/base.js')
  , App
  , routes;

App = React.createClass({
  render: function () {
    return (
      <div className="wrapper">
        <header>
          <button id='button-full-screen'>Open Full Screen</button>
          <ul>
            <li><Link to='todos'>Todos</Link></li>
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
  <Routes location="history">
    <Route name="app" path="/demo-vas-task-global" handler={App}>
      <Route name="todos" handler={TodoListComponent}/>
      <Route name="vas" handler={VasComponent}/>
    </Route>
  </Routes>
);

React.renderComponent(routes, document.body);

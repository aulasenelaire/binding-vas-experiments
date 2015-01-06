/** @jsx React.DOM */

"use strict";

var React = require('react/addons')
  , Router = require('react-router')
  , Dispatcher = require('../dispatcher.js')
  , RouteHandler = Router.RouteHandler
  , $ = require('jquery')
  , cx = React.addons.classSet
  , Router = require('react-router')
  , Link = Router.Link
  , App;

App = React.createClass({
  getInitialState: function() {
    return {
      background_color: 'white'
    , dropbox_account: this.props.uiStore.get('dropbox_client')
    , loading: false
    };
  }
, changeButtonClass: function (is_open) {
    var $button_icon = $('.js-off-canvas-button .js-icon')
      , classes = cx({
        'js-icon': true
      , 'fa': true
      , 'fa-2x': true
      , 'fa-bars': !is_open
      , 'fa-close': is_open
      });
    $button_icon.attr('class', classes);
  }
, onContentClick: function () {
    var $container = $('.js-container')
      , is_open = $container.hasClass('show-menu');

    if (is_open) {
      this.changeButtonClass(!is_open);
      $container.toggleClass('show-menu', !is_open);
    };
  }
, onClickLogout: function (event) {
    event.preventDefault();
    window.dropbox.signOut();
    window.location.reload();
  }
, onMenuButtonClick: function () {
    var $container = $('.js-container')
      , is_open = $container.hasClass('show-menu');

    $container.toggleClass('show-menu', !is_open);
    this.changeButtonClass(!is_open);
  }
, componentDidMount: function () {
    var timer
      , self = this;

    $('.js-menu-side a').on('click', this.onContentClick);
    this.props.uiStore.on('change:background_color', this.handleBackgroundColorChange);
    this.props.uiStore.on('change:dropbox_client', this.handleDropboxAccountChange);

    this.props.uiStore.on('loadStart', function () {
      clearTimeout(timer);
      // for slow responses, indicate the app is thinking
      // otherwise its fast enough to just wait for the
      // data to load
      timer = setTimeout(function () {
        self.setState({loading: true});
      }, 300);
    });

    this.props.uiStore.on('loadEnd', function () {
      clearTimeout(timer);
      self.setState({loading: false});
    });
  }
, willComponentUnmount: function () {
    this.props.uiStore.off('change:background_color', this.handleBackgroundColorChange);
    this.props.uiStore.off('change:dropbox_client', this.handleDropboxAccountChange);
  }
, handleBackgroundColorChange: function () {
    this.setState({background_color: this.props.uiStore.get('background_color')});
  }
, handleDropboxAccountChange: function () {
    this.setState({dropbox_account: this.props.uiStore.get('dropbox_client')});
  }
, render: function () {
    // <button id='button-full-screen'>Open Full Screen</button>
    var defualt_classes
      , self = this
      , dropboxUser
      , loading_classes;

    loading_classes = cx({
      'loading-data': true
    , 'js-hide': !this.state.loading
    });

    defualt_classes = cx({
      'js-container': true
    , 'container': true
    });

    if (!!this.state.dropbox_account) {
      dropboxUser = <div className='absolute-postitioned sidebar-profile'>
        {this.state.dropbox_account.name}
        <a href="#" onClick={self.onClickLogout}>Logout</a>
      </div>;
    }

    return <div className={defualt_classes + ' ' + this.state.background_color}>

      <div className={loading_classes}>Cargando datos &hellip;</div>

      <div className='menu-wrap'>
        <h3>Experimentos</h3>
        <nav className='js-menu-side menu-side'>
          <Link to='vas'>Visual Atention Span</Link>
        </nav>
        {dropboxUser}
      </div>
      <button className='js-off-canvas-button menu-button' onClick={this.onMenuButtonClick}>
        <i className='js-icon fa fa-2x fa-bars'></i>
      </button>
      <div className='content-wrap' onClick={this.onContentClick}>
        <div id='content' className='content'>
          <RouteHandler {...this.props} />
        </div>
      </div>
    </div>;
  }
});

module.exports = App;

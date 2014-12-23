/** @jsx React.DOM */

"use strict";

var React = require('react/addons')
  , $ = require('jquery')
  , uiStore = require('../stores/ui.js')
  , cx = React.addons.classSet
  , Router = require('react-router')
  , Link = Router.Link
  , App;

App = React.createClass({
  getDefaultProps: function() {
    return {
      ui: uiStore
    };
  }
, getInitialState: function() {
    return {
      background_color: 'white'
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
, onMenuButtonClick: function () {
    var $container = $('.js-container')
      , is_open = $container.hasClass('show-menu');

    $container.toggleClass('show-menu', !is_open);
    this.changeButtonClass(!is_open);
  }
, componentDidMount: function () {
    $('.js-menu-side a').on('click', this.onContentClick);
    this.props.ui.on('change:background_color', this.handleBackgroundColorChange);

    $.get('/config', function(result) {
      if (this.isMounted()) {
        var dropbox_client = new Dropbox.Client({key: result.dropbox_key});
        dropbox_client.authDriver(new Dropbox.AuthDriver.Popup({
            receiverUrl: window.location.origin + '/drobox_oauth_receiver'
        }));

        this.setState({
          dropbox_client: dropbox_client
        });
      }
    }.bind(this));
  }
, willComponentUnmount: function () {
    this.props.ui.off('change:background_color', this.handleBackgroundColorChange);
  }
, handleBackgroundColorChange: function () {
    this.setState({background_color: this.props.ui.get('background_color')});
  }
, render: function () {
    // <button id='button-full-screen'>Open Full Screen</button>
    var defualt_classes;

    defualt_classes = cx({
      'js-container': true
    , 'container': true
    });

    return (
      <div className={defualt_classes + ' ' + this.state.background_color}>
        <div className='menu-wrap'>
          <h3>Experimentos</h3>
          <nav className='js-menu-side menu-side'>
            <Link to='vas'>Visual Atention Span</Link>
          </nav>
        </div>
        <button className='js-off-canvas-button menu-button' onClick={this.onMenuButtonClick}>
          <i className='js-icon fa fa-2x fa-bars'></i>
        </button>
        <div className='content-wrap' onClick={this.onContentClick}>
          <div id='content' className='content'>
            <this.props.activeRouteHandler/>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = App;

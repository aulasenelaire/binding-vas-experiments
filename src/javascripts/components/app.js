/** @jsx React.DOM */

"use strict";

var React = require('react/addons')
  , Router = require('react-router')
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
  }
, handleBackgroundColorChange: function () {
    this.setState({background_color: this.props.uiStore.get('background_color')});
  }
, render: function () {
    // <button id='button-full-screen'>Open Full Screen</button>
    var defualt_classes
      , loading_classes;

    loading_classes = cx({
      'loading-data': true
    , 'js-hide': !this.state.loading
    });

    defualt_classes = cx({
      'js-container': true
    , 'container': true
    });

    return <div className={defualt_classes + ' ' + this.state.background_color}>

      <div className={loading_classes}>Cargando datos &hellip;</div>

      <div className='menu-wrap'>
        <h3>Experimentos</h3>
        <nav className='js-menu-side menu-side'>
          <Link to='vas'>Visual Atention Span</Link>
          <Link to='login'>Login</Link>
        </nav>
      </div>
      <button className='js-off-canvas-button menu-button' onClick={this.onMenuButtonClick}>
        <i className='js-icon fa fa-2x fa-bars'></i>
      </button>
      <div className='content-wrap' onClick={this.onContentClick}>
        <div id='content' className='content'>
          <RouteHandler />
        </div>
      </div>
    </div>;
  }
});

module.exports = App;

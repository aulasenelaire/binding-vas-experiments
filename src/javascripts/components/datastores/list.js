/** @jsx React.DOM */

"use strict";

var React = require('react')
  , Router = require('react-router')
  , Link = Router.Link
  , _ = require("underscore")
  , DropboxAuth = require('../../react-mixins/dropbox-auth.js')
  , DropboxLib = require('../../lib/dropbox.js')
  , Component;

Component = React.createClass({
  mixins: [DropboxAuth]
, statics: {
    fetchData: function (params) {
      return DropboxLib.listDatastores();
    }
  }
, getInitialState: function () {
    var data_fetched = this.props.data['ds-list'];
    return {
      datastore_list: data_fetched.datastore_list
    , data_store_title_empty: false
    , new_datastore_input: ''
    };
  }
, onDataStoreChanged: function () {
    this.setState({datastore_changed: true});
  }
, handleDeleteClick: function (datastoreId) {
    return function (event) {
      event.preventDefault();
      DropboxLib.deleteDatastore(datastoreId);
    }.bind(this);
  }
, handleClick: function (event) {
    var self = this
      , title = this.refs.datastore_title.getDOMNode().value;

    if (_.isEmpty(title)) {
      this.setState({data_store_title_empty: true});
    } else {
      this.setState({
        data_store_title_empty: false
      , new_datastore_input: ''
      });
      DropboxLib.createDatastore()
      .then(function (data) {
        data.new_datastore.setTitle(title);
      });
    }
  }
, handleUserInput: function(event) {
    this.setState({new_datastore_input: event.target.value});
  }
, componentDidMount: function () {
    // listTableIds
    var manager = DropboxLib.getDataStoreManager()
      , self = this;

    manager.datastoreListChanged.addListener(function (event) {
      var datastore_list = event.getDatastoreInfos();

      self.setState({
        datastore_list: datastore_list
      });
    });
  }
, render: function() {
    var dataStoreList
      , self = this
      , errorEmptyTitle;

    if (this.state.data_store_title_empty) {
      errorEmptyTitle = <li>Necesitas ponerle un titulo a este Data Store</li>;
    }

    dataStoreList = _.chain(this.state.datastore_list)
    .sortBy(function (item) {
      return - item.getModifiedTime();
    })
    .map(function (item) {
      var datastoreId = item.getId();
      return <li key={item.getId()}>
          {item.getTitle() || datastoreId}
          &nbsp;|&nbsp;
          <a href='#' onClick={self.handleDeleteClick(datastoreId)}>delete</a>
          &nbsp;|&nbsp;
          <Link to='ds-detail' params={{datastore_id: datastoreId}}>Details</Link>
        </li>;
    });

    return <div>
      Hola data stores!
      <ul>
        {dataStoreList}
        <li>
          <input
            ref="datastore_title"
            type="text"
            placeholder="New data store"
            onChange={this.handleUserInput}
            value={this.state.new_datastore_input} />
          <button ref="new_public_data_store" onClick={this.handleClick}>Create</button>
        </li>
        {errorEmptyTitle}
      </ul>
    </div>;
  }
});

module.exports = Component;

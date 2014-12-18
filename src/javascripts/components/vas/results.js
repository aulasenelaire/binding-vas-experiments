/** @jsx React.DOM */

"use strict";

var React = require('react')
  , _ = require("underscore")
  , Dispatcher = require('../../dispatcher.js')
  , VasResults;

VasResults = React.createClass({
  componentDidMount: function () {
    Dispatcher.dispatch({
      actionType: 'ui-change-bg-color'
    , background_color: 'white'
    });
  }
, render: function() {
    var trial_rows;
    trial_rows = this.props.trials.sort().map(function (trial, index) {
      var missed
        , successes;

      if (!trial.get('missed_count')) {
        missed = (<i className='fa fa-minus'></i>);
      } else {
        missed = trial.get('missed_letters') + '(' + trial.get('missed_count') + ')';
      }

      if (!trial.get('successes_count')) {
        successes = (<i className='fa fa-minus'></i>);
      } else {
        successes = trial.get('successes_letters') + '(' + trial.get('successes_count') + ')';
      }

      return (<tr>
        <td>{index + 1}</td>
        <td>{trial.get('letters_string')} ({trial.get('count')})</td>
        <td>{successes}</td>
        <td>{trial.get('failed_letters')} ({trial.get('failed_count')})</td>
        <td>{missed}</td>
        <td>{trial.get('duration')}</td>
      </tr>);
    })
    return (<div className='content-layout'>
      <h1>Resultados</h1>
      <table>
        <thead>
          <tr>
            <th>&nbsp;</th>
            <th>Letras</th>
            <th>Acertadas</th>
            <th>Falladas</th>
            <th>No vistas</th>
            <th>Duracion (ms)</th>
          </tr>
        </thead>
        <tbody>{trial_rows}</tbody>
      </table>
    </div>
    );
  }
});

module.exports = VasResults;


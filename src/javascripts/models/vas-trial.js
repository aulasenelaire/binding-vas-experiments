var Backbone = require("backbone")
  , Router = require('react-router')
  , Model
  , _ = require("underscore");

Model = {
  defaults: function() {
    return {
      executed : false
    };
  }
};

Model.getLetters = function () {
  return _.map(this.get('letters'), function (letter) {
    return letter.value;
  })
};

Model.getPositions = function () {
  return _.map(this.get('letters'), function (letter) {
    return letter.position;
  });
};

Model.getMissedLetters = function (letters, response) {
  return _.difference(letters, response);
};

Model.getSuccessLetters = function (letters, response) {
  return _.intersection(letters, response);
};

Model.getFailedLetters = function (letters, response) {
  return _.difference(response, letters);
};

Model.updateTrialWithResponse = function (playload) {
  var trial = playload.trial
    , letters = this.getLetters()
    , new_attributes = {}
    , response = playload.response.split('')
    , missed_letters = this.getMissedLetters(letters, response)
    , successes_letters = this.getSuccessLetters(letters, response)
    , failed_letters = this.getFailedLetters(letters, response)
    , all_ok = !missed_letters.length;

  new_attributes = {
    executed: true
  , successes_count: letters.length - missed_letters.length
  , missed_count: missed_letters.length
  , response_letters: response.join('')
  , missed_letters: missed_letters.join('')
  , successes_letters: successes_letters.join('')
  , failed_letters: failed_letters.join('')
  , failed_count: failed_letters.length
  , letters_string: letters.join('')
  , all_ok: all_ok
  , executed_time: new Date()
  };
  this.set(new_attributes);
};

module.exports = Backbone.Model.extend(Model);

var Backbone = require("backbone")
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

Model.getFailedLetters = function (response) {
  var letters = this.getLetters();
  return _.difference(letters, response);
};

Model.getSuccessLetters = function (response) {
  var letters = this.getLetters();
  return _.intersection(letters, response);
};

Model.updateTrialWithResponse = function (playload) {
  var trial = playload.trial
    , letters = this.getLetters()
    , new_attributes = {}
    , response = playload.response.split('')
    , failed_letters = this.getFailedLetters(response)
    , successes_letters = this.getSuccessLetters(response);

  new_attributes = {
    executed: true
  , successes_count: letters.length - failed_letters.length
  , fails_count: failed_letters.length
  , response_letters: response.join('')
  , failed_letters: failed_letters.join('')
  , successes_letters: successes_letters.join('')
  , letters: letters.join('')
  };
  console.log(new_attributes);
  // this.set(new_attributes);
};

module.exports = Backbone.Model.extend(Model);

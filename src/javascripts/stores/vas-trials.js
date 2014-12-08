"use strict";

var Backbone = require("backbone")
  , _ = require("underscore")
  , Dispatcher = require('../dispatcher.js')
  , vasTrialIStore
  , vasTrialItem
  , Collection;

vasTrialItem = Backbone.Model.extend({
  defaults: function() {
    return {
      executed : false
    };
  }
});

Collection = Backbone.Collection.extend({
    model: vasTrialItem
  , initialize: function () {
      _.bindAll(this, 'dispatchCallback');
      this.dispatchToken = Dispatcher.register(this.dispatchCallback);
    }
  , dispatchCallback: function (payload) {
      switch(payload.actionType) {
        case 'vas-trial-add':
          this.add(payload.todo);
      }
    }
  , getRandomTrial: function (payload) {
      var trials = this.where({executed: false});

      if (!trials.length) {
        return null;
      }

      return trials[_.random(0, trials.length -1)];
    }
  , autoPopulate: function () {
      var letters = this.getAlphabet()
        , self = this
        , trials = []
        , letters_count = [2, 3, 4, 5]
        , durations = [150, 200, 250]
        , positions = ['tr', 'r', 'br', 'bl', 'l', 'tl'];

      _.each(letters_count, function (number, i) {
        var number_of_combinations = self.getNumberOfCombinations(number, positions)
          , combinations = self.getCombinations(number, positions);

        _.map(durations, function (duration) {
          _.each(combinations, function (letters) {
            var trial;

            trial = {
              number_of_combinations: number_of_combinations
            , count: number
            , duration: duration
            , letters: letters
            };

            trials.push(trial);
          });
        });

      });

      this.add(trials);
    }
  , getAlphabet: function () {
      var letters;
      return _.map(_.range(0, 26), function(foo, i) {
        return String.fromCharCode(i + 97);
      });
    }
  , getRandomLetters: function (number, letters) {
      return _.reduce(_.range(0, number), function (memo, num) {
        var letter = letters[_.random(0, letters.length -1)];
        letters = _.without(letters, letter);
        memo.push(letter);
        return memo;
      }, []);
    }
  , getCombinations: function (counter, positions) {
      var combinations = this.getNumberOfCombinations(counter, positions)
        , used_combinations = []
        , used_combinations_count = 0
        , trials = []
        , i = 0;


      while (used_combinations_count < combinations) {
        var combination = this.getLettersWithPosition(counter, positions)
          , combination_index = this.getCombinationIndex(combination);

        if (_.difference(used_combinations, [combination_index]).length === used_combinations.length ) {
          used_combinations.push(combination_index);
          trials.push(combination);
          used_combinations_count++;
        }
      };

      return trials;
    }
  , getCombinationIndex: function (combination) {
      return _.reduce(combination, function (memo, trial_number) {
        var index = trial_number.position;
        if (_.isEmpty(memo)) {
          memo = index
        } else {
          memo = memo + '--' + index;
        }

        return memo;
      }, '');
    }
  , getNumberOfCombinations: function (letters_count, positions) {
      var positions_count = positions.length
        , letters = letters_count
        , n = getFactorial(letters);

      function getFactorial(number) {
        var factorial = number
          , x;
        for(x = number - 1; x > 0; x--) {
         factorial = factorial * x;
        }
        return factorial;
      }

      return getFactorial(positions_count) / (getFactorial(letters) * getFactorial(positions_count - letters));
    }
  , getLettersWithPosition: function (counter, positions) {
      var used_positions = []
        , letters = this.getRandomLetters(counter, this.getAlphabet());
      return _.reduce(letters, function (memo, letter) {
        var free_positions = _.difference(positions, used_positions)
          , position = free_positions[_.random(0, free_positions.length -1)]
          , letter_position;

        used_positions.push(position);

        letter_position = {
          value: letter
        , position: position
        };

        memo.push(letter_position);
        return memo;
      }, []);
    }
});

// the Store is an instantiated Collection; a singleton.
vasTrialIStore = new Collection();

vasTrialIStore.autoPopulate();

module.exports = vasTrialIStore;

module.exports = function(propName) {
  return {
    componentDidMount: function() {
      return this.props[propName].on("all", (function(_this) {
        return function() {
          return _this.forceUpdate();
        };
      })(this), this);
    },
    componentWillUnmount: function() {
      return this.props[propName].off("all", (function(_this) {
        return function() {
          return _this.forceUpdate();
        };
      })(this), this);
    }
  };
};

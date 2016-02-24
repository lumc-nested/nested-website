var React = require('react');
var ReactDOM = require('react');
var Website = require('./Website');


require('babel-polyfill');


require('../styles/main.less');


// Export React so the devtools can find it
(window !== window.top ? window.top : window).React = React;


ReactDOM.render(<Website />, document.getElementById('content'));


module.exports = {};

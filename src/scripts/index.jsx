var React = require('react');
var Website = require('./Website');


require('babel-core/polyfill');


require('../styles/main.less');


// Export React so the devtools can find it
(window !== window.top ? window.top : window).React = React;


React.render(<Website />, document.getElementById('content'));


module.exports = {};

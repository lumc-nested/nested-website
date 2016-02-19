var EventListener = require('react-bootstrap/lib/utils/EventListener');
var React = require('react');
var ReactBootstrap = require('react-bootstrap');

var Nested = require('nested-editor');


var Panel = ReactBootstrap.Panel;


// Filetypes we support for opening, by extension.
var filetypes = {
  json: {binary: false, type: 'json'},
  ped: {binary: false, type: 'ped'},
  fam: {binary: true, type: 'fam'},
  xlsx: {binary: true, type: 'xlsx'},
  ods: {binary: true, type: 'xlsx'}
};


var FileInput = React.createClass({
  render: function() {
    var accept = this.props.extensions.map(e => '.' + e).join(',');

    return (
      <a className="file-input" href="#">
        {this.props.caption} <input type="file" accept={accept} onChange={this.props.onChange} />
      </a>
    );
  }
});


// Component can use `this.state.size`, which is populated by `this.getSize`,
// which should be implemented by the component.
var ResizeMixin = {
  _resized: true,

  getInitialState: function() {
    return {size: 0};
  },

  resize: function() {
    this._resized = true;
  },

  componentDidMount: function() {
    this._onWindowResizeListener = EventListener.listen(window, 'resize', this.resize);

    this._resizeInterval = setInterval(() => {
      if (this._resized) {
        this._resized = false;
        this.setState({size: this.getSize()});
      }
    }, 250);
  },

  componentWillUnmount: function() {
    if (this._onWindowResizeListener) {
      this._onWindowResizeListener.remove();
    }

    if (this._resizeInterval) {
      this._resizeInterval.clearInterval();
    }
  }
};


var Website = React.createClass({
  mixins: [ResizeMixin],

  openFile: function(event) {
    var file = event.target.files[0];
    var filetype = filetypes[file.name.split('.').reverse()[0]];
    var reader = new FileReader();

    // Clear input element so we are called again even when re-opening the
    // same file.
    event.target.value = null;

    reader.onload = (e) => {
      this.refs.editor.openDocument(e.target.result, filetype.type);
    };

    if (file) {
      if (filetype.binary) {
        reader.readAsBinaryString(file);
      } else {
        reader.readAsText(file);
      }
    }
  },

  getSize: function() {
    return parseInt(
      document.defaultView.getComputedStyle(React.findDOMNode(this.refs.panel), null).height,
      10
    );
  },

  render: function() {
    var editorStyle = {
      bottom: this.state.size + 15
    };

    return (
      <div>
        <Nested ref="editor" style={editorStyle} />
        <Panel ref="panel" bsStyle="primary">
          <FileInput
              extensions={Object.keys(filetypes)}
              onChange={this.openFile}
              caption="Click here to open a pedigree file ..." />
        </Panel>
      </div>
    );
  }
});


module.exports = Website;

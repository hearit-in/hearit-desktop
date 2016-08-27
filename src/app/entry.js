import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';

require("normalize.css");
require("react-tap-event-plugin")();

ReactDOM.render(<App />, document.getElementById("main"));

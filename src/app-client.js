window.$ = window.jQuery = require("jquery");

import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { App } from './components/App';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'froala-editor/js/froala_editor.pkgd.min.js';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'font-awesome/css/font-awesome.css';

const AppClient = () => (
    <Router>
        <App />
    </Router>
);

window.onload = () => {
    hydrate(<AppClient />, document.getElementById('main'));
};
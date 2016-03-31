/**
 * Copyright 2016, WuXueqian
 * All right reserved.
 *
 * @author WuXueqian
 * @date 16/3/31 10:55
 * @license MIT LICENSE
 */
 
 //APP Main Entry

window.app = window.app || {};

require('../components/footer');

(function (app){
    'use strict';

    var ReactDOM = require('reactDom');
    var Footer = app.Footer;

    function render() {
        ReactDOM.render(
            <Footer />,
            document.getElementById('general-content')
        )
    }

    render();

})(window.app || {});

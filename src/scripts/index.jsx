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

(function (app){
    'use strict';

    require('../components/generalPart');

    var ReactDOM = require('reactDom');
    var GeneralPart = app.GeneralPart;

    function render() {
        ReactDOM.render(
            <GeneralPart />,
            document.getElementById('general-content')
        )
    }

    render();

})(window.app || {});

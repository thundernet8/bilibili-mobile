/**
 * Copyright 2016, WuXueqian
 * All right reserved.
 *
 * @author WuXueqian
 * @date 16/3/31 18:29
 * @license MIT LICENSE
 */
 
 window.app = window.app || {};

(function (app){
    'use strict';

    require('../components/header');
    require('../components/footer');

    var Header = app.Header;
    var Footer = app.Footer;

    /*
     * 通用界面,包含各个Tab
     */
    app.GeneralPart = React.createClass({
        displayName: 'GeneralPart',
        render: function (){
            return (
                <Footer />
            );
        }
    });

    module.exports = app.GeneralPart;

})(window.app);
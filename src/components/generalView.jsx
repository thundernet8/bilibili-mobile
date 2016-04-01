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
     * 首屏视图,包含各个Tab
     */
    app.GeneralView = React.createClass({
        displayName: 'GeneralView',
        render: function (){
            return (
                <Footer />
            );
        }
    });

    module.exports = app.GeneralView;

})(window.app);
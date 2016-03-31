/**
 * Copyright 2016, WuXueqian
 * All right reserved.
 *
 * @author WuXueqian
 * @date 16/3/31 10:38
 * @license MIT LICENSE
 */

window.app = window.app || {};

(function (app){
    'use strict';

    var React = require('react');
    var ReactDOM = require('reactDom');

    app.Footer = React.createClass({
       displayName: 'Footer',
       render: function (){
            return (
                <footer className="footer">
                    <div className="inner">
                        <ul className="footer-tabs">
                            <li className="footer-tab" id="tab-home">首页</li>
                            <li className="footer-tab" id="tab-focus">关注</li>
                            <li className="footer-tab" id="tab-find">发现</li>
                            <li className="footer-tab" id="tab-me">我的</li>
                        </ul>
                    </div>
                </footer>
            );
       }
    });

    module.exports = app.Footer;
})(window.app || {});
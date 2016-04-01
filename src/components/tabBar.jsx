/**
 * Copyright 2016, WuXueqian
 * All right reserved.
 *
 * @author WuXueqian
 * @date 16/4/1 22:10
 * @license MIT LICENSE
 */

/*jshint esversion: 6 */
/*jshint quotmark: false */
/*jshint white: false */
/*jshint trailing: false */
/*jshint newcap: false */

window.app = window.app || {};

(function (app){
    'use strict';

    var React = require('react');

    /*
     * 底部TabBar组件
     */
    app.TabBar = React.createClass({
        render: function (){
            return (
              <footer id="general-tab-bar" className="tab-bar">
                  <div className="inner">
                    <ul className="tab-titles">
                        <li id="tab-home-title" className="tab-title active">首页</li>
                        <li id="tab-focus-title" className="tab-title">关注</li>
                        <li id="tab-find-title" className="tab-title">发现</li>
                        <li id="tab-me-title" className="tab-title">我的</li>
                    </ul>
                  </div>
              </footer>
            );
        }
    });

    module.exports = app.TabBar;

})(window.app);
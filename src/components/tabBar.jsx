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

'use strict';

window.app = window.app || {};

import React from 'react';
import {IndexLink, Link} from 'react-router';

/*
 * 底部TabBar组件
 */

let TabBar = React.createClass({
    displayName: 'TabBar',
    render: function (){
        return (
            <footer id="general-tab-bar" className="tab-bar">
                <div className="inner">
                    <ul className="tab-titles">
                        <li id="tab-home-title" className="tab-title active"><IndexLink to="/" activeClassName="active">首页</IndexLink></li>
                        <li id="tab-focus-title" className="tab-title"><IndexLink to="/focus" activeClassName="active">关注</IndexLink></li>
                        <li id="tab-find-title" className="tab-title"><IndexLink to="/find" activeClassName="active">发现</IndexLink></li>
                        <li id="tab-me-title" className="tab-title"><IndexLink to="/me" activeClassName="active">我的</IndexLink></li>
                    </ul>
                </div>
            </footer>
        );
    }
});

app.TabBar = TabBar;

export default app.TabBar;
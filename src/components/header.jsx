/**
 * Copyright 2016, WuXueqian
 * All right reserved.
 *
 * @author WuXueqian
 * @date 16/3/31 17:46
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

let Header = app.Header || {};

/*
 * 首页Tab的Header
 */
Header.HomeHeader = React.createClass({
    displayName: 'HomeHeader',
    render: function (){
        return (
            <header className="header" id="home-header">
                <div className="inner">
                    <ul className="header-segments">
                        <li className="header-segment" id="segment-live">直播</li>
                        <li className="header-segment" id="segment-recommend">推荐</li>
                        <li className="header-segment" id="segment-bangumi">番剧</li>
                        <li className="header-segment" id="segment-district">分区</li>
                    </ul>
                </div>
            </header>
        );
    }
});

/*
 * 关注Tab的Header
 */
Header.FocusHeader = React.createClass({
    displayName: 'FocusHeader',
    render: function (){
        return (
            <header className="header" id="focus-header">
                <div className="inner">
                    <ul className="header-segments">
                        <li className="header-segment" id="segment-track">追番</li>
                        <li className="header-segment" id="segment-activity">动态</li>
                        <li className="header-segment" id="segment-tag">标签</li>
                    </ul>
                </div>
            </header>
        );
    }
});

/*
 * 个人Tab的Header
 */
Header.SelfHeader = React.createClass({
    displayName: 'SelfHeader',
    render: function (){
        return (
            <header className="header" id="self-header">
                <div className="inner titled-bar">
                    <div className="title-label">我的</div>
                </div>
            </header>
        );
    }
});

app.Header = Header;

export default app.Header;
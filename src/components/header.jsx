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
            <header id="tab-home-header" className="tab-view-header segment-bar">
                <div className="inner">
                    <ul className="segment-titles">
                        <li id="segment-live-title" className="segment-title active">直播</li>
                        <li id="segment-recommend-title" className="segment-title">推荐</li>
                        <li id="segment-bangumi-title" className="segment-title">番剧</li>
                        <li id="segment-district-title" className="segment-title">分区</li>
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
            <header id="tab-focus-header" className="tab-view-header segment-bar">
                <div className="inner">
                    <ul className="segment-titles">
                        <li id="segment-track-title" className="segment-title active">追番</li>
                        <li id="segment-activity-title" className="segment-title">动态</li>
                        <li id="segment-tag-title" className="segment-title">标签</li>
                    </ul>
                </div>
            </header>
        );
    }
});

/*
 * 个人Tab的Header
 */
Header.MeHeader = React.createClass({
    displayName: 'MeHeader',
    render: function (){
        return (
            <header id="tab-me-header" className="tab-view-header nav-bar">
                <div className="inner titled-bar">
                    <div className="title-label">我的</div>
                </div>
            </header>
        );
    }
});

app.Header = Header;

export default app.Header;
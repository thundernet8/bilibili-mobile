/**
 * Copyright 2016, WuXueqian
 * All right reserved.
 *
 * @author WuXueqian
 * @date 16/4/1 22:57
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
import Header from './header.jsx';

let Tab = app.Tab || {};

/*
 * 首页Tab
 */
Tab.HomeTab = React.createClass({
    displayName: 'HomeTab',
    render: function (){
        return (
            <section id="tab-home" className="tab-view active">
                {/* Tab Header */}
                <Header.HomeHeader />
                {/* Tab内容容器 */}
                <div id="tab-home-body" className="tab-view-body segments seg-4 transition">
                    {/* Segment-直播 */}
                    <section id="segment-live" className="segment active">

                    </section>
                    {/* Segment-推荐 */}
                    <section id="segment-recommend" className="segment">

                    </section>
                    {/* Segment */}
                    <section id="segment-bangumi" className="segment">

                    </section>
                    {/* Segment-分区 */}
                    <section id="segment-district" className="segment">

                    </section>
                </div>
            </section>
        );
    }
});


/*
 * 关注Tab
 */
Tab.FocusTab = React.createClass({
    displayName: 'FocusTab',
    render: function (){
        return (
            <section id="tab-focus" className="tab-view">
                {/* Tab Header */}
                <Header.FocusHeader />
                {/* Tab内容容器 */}
                <div id="tab-focus-body" className="tab-view-body segments seg-3 transition">

                </div>
            </section>
        );
    }
});


/*
 * 发现Tab
 */
Tab.FindTab = React.createClass({
    displayName: 'FindTab',
    render: function (){
        return (
            <section id="tab-find" className="tab-view">

            </section>
        );
    }
});


/*
 * 我的Tab
 */
Tab.MeTab = React.createClass({
    displayName: 'MeTab',
    render: function (){
        return (
            <section id="tab-me" className="tab-view">
                {/* Tab Header */}
                <Header.MeHeader />
                {/* Tab内容容器 */}
                <div id="tab-me-body" className="tab-view-body cells">

                </div>
            </section>
        );
    }
});

app.Tab = Tab;

export default app.Tab;
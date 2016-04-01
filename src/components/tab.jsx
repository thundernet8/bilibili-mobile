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

window.app = window.app || {};

(function (app){
    'use strict';

    var React = require('react');
    var Tab = app.Tab || {};

    /*
     * 首页Tab
     */
    Tab.HomeTab = React.createClass({
        render: function (){
            return (
                <section id="tab-home" className="tab-view active">
                    /* Tab Header */
                    <header id="tab-home-header" className="tab-view-header">
                        <div className="inner">
                            <ul className="segment-titles">
                                <li id="segment-live-title" className="segment-title active">直播</li>
                                <li id="segment-recommend-title" className="segment-title">推荐</li>
                                <li id="segment-bangumi-title" className="segment-title">番剧</li>
                                <li id="segment-district-title" className="segment-title">分区</li>
                            </ul>
                        </div>
                    </header>
                    /* Tab内容容器 */
                    <div id="tab-home-body" className="tab-view-body segments">
                        /* Segment-直播 */
                        <section id="segment-live" className="segment active">

                        </section>
                        /* Segment-推荐 */
                        <section id="segment-recommend" className="segment">

                        </section>
                        /* Segment */
                        <section id="segment-bangumi" className="segment">

                        </section>
                        /* Segment-分区 */
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
        render: function (){
            return (
                <section id="tab-focus" className="tab-view">

                </section>
            );
        }
    });


    /*
     * 发现Tab
     */
    Tab.FindTab = React.createClass({
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
        render: function (){
            return (
                <section id="tab-me" className="tab-view">

                </section>
            );
        }
    });

    app.Tab = Tab;
    module.exports = app.Tab;

})(window.app);
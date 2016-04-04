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
 * 公用函数和对象(High-Order-Component)
 */

let HeaderHOC = HeaderComponent => React.createClass({
    displayName: 'HeaderHOC',
    switchSegment: function (index){
        if(typeof this.props.onSegmentSwitch == 'function'){
            this.props.onSegmentSwitch(index);
        }
        this.setState({
            currentSegmentIndex: index
        });
    },
    judgeActiveClassName: function (index){
        if(index==this.state.currentSegmentIndex){
            return ' active';
        }
        return '';
    },
    getInitialState: function () {
        return {
            currentSegmentIndex: 0
        };
    },
    render: function (){
        const otherProps = {
            switchSegment: this.switchSegment,
            judgeActiveClassName: this.judgeActiveClassName,
            state: this.state  //将状态以属性的state键值方式传递给Header组件
        };
        const props = Object.assign(otherProps, this.props);
        return (
            <HeaderComponent {...props} />
        );
    }
});

/*
 * 首页Tab的Header
 */
let HomeHeader = React.createClass({
    displayName: 'HomeHeader',
    getInitialState: function (){
      return this.props.state;
    },
    render: function (){
        return (
            <header id="tab-home-header" className="tab-view-header segment-bar">
                <div className="inner">
                    <ul className="segment-titles seg-4">
                        <li id="segment-live-title" className={"segment-title transition"+this.props.judgeActiveClassName(0)} onClick={this.props.switchSegment.bind(null, 0)}>直播</li>
                        <li id="segment-recommend-title" className={"segment-title transition"+this.props.judgeActiveClassName(1)} onClick={this.props.switchSegment.bind(null, 1)}>推荐</li>
                        <li id="segment-bangumi-title" className={"segment-title transition"+this.props.judgeActiveClassName(2)} onClick={this.props.switchSegment.bind(null, 2)}>番剧</li>
                        <li id="segment-district-title" className={"segment-title transition"+this.props.judgeActiveClassName(3)} onClick={this.props.switchSegment.bind(null, 3)}>分区</li>
                        <span className="slide-border" />
                    </ul>
                </div>
            </header>
        );
    }
});

Header.HomeHeader = HeaderHOC(HomeHeader);

/*
 * 关注Tab的Header
 */
let FocusHeader = React.createClass({
    displayName: 'FocusHeader',
    getInitialState: function (){
        return this.props.state;
    },
    render: function (){
        return (
            <header id="tab-focus-header" className="tab-view-header segment-bar">
                <div className="inner">
                    <ul className="segment-titles seg-3">
                        <li id="segment-track-title" className={"segment-title transition"+this.props.judgeActiveClassName(0)} onClick={this.props.switchSegment.bind(null, 0)}>追番</li>
                        <li id="segment-activity-title" className={"segment-title transition"+this.props.judgeActiveClassName(1)} onClick={this.props.switchSegment.bind(null, 1)}>动态</li>
                        <li id="segment-tag-title" className={"segment-title transition"+this.props.judgeActiveClassName(2)} onClick={this.props.switchSegment.bind(null, 2)}>标签</li>
                        <span className="slide-border" />
                    </ul>
                </div>
            </header>
        );
    }
});

Header.FocusHeader = HeaderHOC(FocusHeader);

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
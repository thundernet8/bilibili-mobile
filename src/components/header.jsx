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

let app = window.app || (window.app={});

import React from 'react';
import {Link} from 'react-router';
import Utils from '../scripts/utils';

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
    },
    judgeActiveClassName: function (index){
        if(index==this.props.currentSegmentIndex){
            return ' active';
        }
        return '';
    },
    render: function (){
        const otherProps = {
            switchSegment: this.switchSegment,
            judgeActiveClassName: this.judgeActiveClassName
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
    componentDidMount: function(){
        //订阅观察Segment序号变化
        Utils.subscribe('homeTabSegmentIndex', function(index){
            this.props.switchSegment(index);
        }.bind(this));
    },
    shouldComponentUpdate: function (nextProps, nextState){
        return this.props != nextProps || this.state != nextState;
    },
    render: function (){
        return (
            <header id="tab-home-header" className="tab-view-header segment-bar">
                <div className="inner">
                    <ul className="segment-titles seg-3">
                        <li id="segment-live-title" className={"segment-title transition"+this.props.judgeActiveClassName(0)} onClick={this.props.switchSegment.bind(null, 0)}>直播</li>
                        {/* <li id="segment-recommend-title" className={"segment-title transition"+this.props.judgeActiveClassName(1)} onClick={this.props.switchSegment.bind(null, 1)}>推荐</li> */}
                        <li id="segment-bangumi-title" className={"segment-title transition"+this.props.judgeActiveClassName(1)} onClick={this.props.switchSegment.bind(null, 1)}>番剧</li>
                        <li id="segment-region-title" className={"segment-title transition"+this.props.judgeActiveClassName(2)} onClick={this.props.switchSegment.bind(null, 2)}>分区</li>
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
    shouldComponentUpdate: function (nextProps, nextState){
        return this.props != nextProps || this.state != nextState;
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

/*
 * 基本Navigation Controller,带标题以及左右按钮
 */
Header.BasicNaviController = React.createClass({
    displayName: 'BasicNaviController',
    getDefaultProps: function(){
        return {
            leftBtnIconClass: '',
            leftBtnText: '',
            leftBtnPath: '',
            navBarTitle: '',
            rightBtnIconClass: '',
            rightBtnText: '',
            rightBtnPath: ''
        };
    },
    getInitialState: function(){
        return this.props;
    },
    componentWillReceiveProps: function(nextProps){
        this.setState(nextProps);
    },
    render: function(){
        const LeftLink = this.state.leftBtnPath ? React.createClass({render: function(){return (<Link to={this.props.leftBtnPath}>{this.props.children}</Link>)}}) : React.createClass({render: function(){return (<a href="javascript:">{this.props.children}</a>)}});
        const RightLink = this.state.rightBtnPath ? React.createClass({render: function(){return (<Link to={this.props.rightBtnPath}>{this.props.children}</Link>)}}) : React.createClass({render: function(){return (<a href="javascript:">{this.props.children}</a>)}});

        return (
            <header className="basic-nav-controller">
                <div className="left-nav-btn">
                    <LeftLink leftBtnPath={this.state.leftBtnPath}>
                        <i className={'icon ' + this.state.leftBtnIconClass} />
                        <span className="nav-btn-text">{this.state.leftBtnText}</span>
                    </LeftLink>
                </div>
                <div className="nav-title">{this.state.navBarTitle}</div>
                <div className="right-nav-btn">
                    <RightLink rightBtnPath={this.state.rightBtnPath}>
                        <i className={'icon ' + this.state.rightBtnIconClass} />
                        <span className="nav-btn-text">{this.state.rightBtnText}</span>
                    </RightLink>
                </div>
            </header>
        );
    }
});


/*
 * 视频播放页Navigation Controller,仅带左返回按钮
 */
Header.VideoNaviController = React.createClass({
    displayName: 'VideoNaviController',
    getDefaultProps: function(){
        return {
            leftBtnIconClass: 'fa fa-chevron-circle-left',
            leftBtnText: '',
            leftBtnPath: ''
        };
    },
    getInitialState: function(){
        return this.props;
    },
    componentWillReceiveProps: function(nextProps){
        this.setState(nextProps);
    },
    render: function(){
        const LeftLink = this.state.leftBtnPath ? React.createClass({render: function(){return (<Link to={this.props.leftBtnPath}>{this.props.children}</Link>)}}) : React.createClass({render: function(){return (<a href="javascript:">{this.props.children}</a>)}});
        return (
            <header className="video-nav-controller">
                <div className="left-nav-btn">
                    <LeftLink leftBtnPath={this.state.leftBtnPath}>
                        <i className={'icon ' + this.state.leftBtnIconClass} />
                    </LeftLink>
                </div>
            </header>
        );
    }
});

app.Header = Header;

window.app = app;

export default app.Header;
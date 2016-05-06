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
import TabBar from '../components/tabBar.jsx';
import Utils from '../scripts/utils';
import LiveChannelList from './homeSegmentLiveCategoryList.jsx';
import LiveIndexChannels from './homeSegmentLiveIndexCategories.jsx';
import BangumiHead from './homeSegmentBangumiHead.jsx';
import BangumiIndexCats from './homeSegmentBangumiIndexCats.jsx';
import RegionList from './homeSegmentRegion.jsx';

let Tab = app.Tab || {};

/*
 * 公用函数和对象,添加滑动Handler(High-Order-Component)
 */

let TabHOC = (TabComponent, TabName='homeTab') => React.createClass({
    displayName: 'TabHOC',
    translateX: 0,
    preTranslateX: 0,
    segmentIndex: Utils.store(TabName).segmentIndex || 0,
    segmentWidth: 0,
    containerWidth: 0,
    segmentCount: 0,
    onTouchStart: function (event){
        event.preventDefault();

        this.startT = new Date().getTime();
        this.segmentWidth = this.segmentWidth || event.target.offsetWidth;
        this.containerWidth = this.containerWidth || event.currentTarget.offsetWidth;
        this.segmentCount = this.segmentCount || (this.containerWidth/this.segmentWidth).toFixed(0)*1;
        this.startX = event.touches[0].pageX;
        this.preTranslateX = this.segmentIndex * this.segmentWidth * (-1);

        event.currentTarget.style.transitionDuration = '0s';
    },
    onTouchMove: function (event){
        const edgeWith = 0;
        const leftEdge = edgeWith;
        const rightEdge = -(this.containerWidth - this.segmentWidth + edgeWith);
        this.diffX = event.touches[0].pageX - this.startX;
        this.translateX = this.preTranslateX + this.diffX;
        this.translateX = this.translateX > leftEdge ? edgeWith : this.translateX;
        this.translateX = this.translateX < rightEdge ? rightEdge : this.translateX;

        event.currentTarget.style.webkitTransform = `translate3d(${this.translateX}px, 0, 0)`;
        event.currentTarget.style.transform = `translate3d(${this.translateX}px, 0, 0)`;
    },
    onTouchEnd: function (event){
        event.currentTarget.style.transitionDuration = '.4s';
        if (!this.diffX){
            return;
        }
        const deltaT = new Date().getTime() - this.startT;
        if(deltaT<300){
            this.segmentIndex = Math.max(0, Math.min(this.segmentIndex-(this.diffX/Math.abs(this.diffX)), this.segmentCount-1));
        }else{
            this.segmentIndex = Math.abs(this.translateX / this.segmentWidth).toFixed(0);
        }
        this.preTranslateX = this.segmentIndex * this.segmentWidth * (-1);
        this.setState({
            segmentIndex: this.segmentIndex
        });
        event.currentTarget.style.webkitTransform = `translate3d(${this.preTranslateX}px, 0, 0)`;
        event.currentTarget.style.transform = `translate3d(${this.preTranslateX}px, 0, 0)`;
    },
    switchSegmentCallback: function (index){
        this.setState({
            segmentIndex: index
        });
        Utils.store(TabName, {segmentIndex: index});
    },
    getInitialState: function () {
        return {
            segmentIndex: Utils.store(TabName).segmentIndex || 0
        };
    },
    render: function (){
        const props = {
            touchStart: this.onTouchStart,
            touchMove: this.onTouchMove,
            touchEnd: this.onTouchEnd,
            currentSegmentIndex: this.state.segmentIndex,
            switchSegmentParentCb: this.switchSegmentCallback
        };
        return (
            <div className="view-list">
                <div id="general-view">
                    <div id="tab-view-wrap">
                        <TabComponent {...props} />
                    </div>
                    <TabBar />
                </div>
                {this.props.children}
            </div>
        );
    }
});

/*
 * 首页Tab
 */
let HomeTab = React.createClass({
    displayName: 'HomeTab',
    getSegmentWrapperClassName: function (){
        switch(this.props.currentSegmentIndex)
        {
            //case 1:
            //    return 'seg-2-of-4';
            //    break;
            //case 2:
            //    return 'seg-3-of-4';
            //    break;
            //case 3:
            //    return 'seg-4-of-4';
            //    break;
            //default:
            //    return 'seg-1-of-4';
            //    break;
            case 1:
                return 'seg-2-of-3';
                break;
            case 2:
                return 'seg-3-of-3';
                break;
            default:
                return 'seg-1-of-3';
                break;
        }
    },
    getSegmentWrapperStyle: function (){
        switch(this.props.currentSegmentIndex)
        {
            //case 1:
            //    return {transform: 'translate3d(-25%, 0, 0)'};
            //    break;
            //case 2:
            //    return {transform: 'translate3d(-50%, 0, 0)'};
            //    break;
            //case 3:
            //    return {transform: 'translate3d(-75%, 0, 0)'};
            //    break;
            //default:
            //    return {transform: 'translate3d(0, 0, 0)'};
            //    break;
            case 1:
                return {transform: 'translate3d(calc(-100% / 3), 0, 0)'};
                break;
            case 2:
                return {transform: 'translate3d(calc(-200% / 3), 0, 0)'};
                break;
            default:
                return {transform: 'translate3d(0, 0, 0)'};
                break;
        }
    },
    judgeActiveClassName: function (index){
        if(index==this.props.currentSegmentIndex){
            return ' active';
        }
        return '';
    },
    handleHeaderSegmentSwitch: function (index){
        console.log('Switch to segment '+ (index+1).toString());
        if(index==this.props.currentSegmentIndex){
            return;
        }
        switch (index)
        {
            case 0:
            case 1:
            case 2:
            //case 3:
                this.props.switchSegmentParentCb(index);
                break;
            default:
                this.props.switchSegmentParentCb(0);
                break;
        }
    },
    shouldComponentUpdate: function (nextProps, nextState){
        return this.props != nextProps || this.state != nextState;
    },
    render: function (){
        return (
            <section id="tab-home" className="tab-view">
                {/* Tab Header */}
                <Header.HomeHeader currentSegmentIndex={this.props.currentSegmentIndex} onSegmentSwitch={this.handleHeaderSegmentSwitch} />
                {/* Tab内容容器 */}
                <div id="tab-home-body" className={"tab-view-body transition segments seg-3 " + this.getSegmentWrapperClassName()} style={this.getSegmentWrapperStyle()} /*onTouchStart={this.props.touchStart} onTouchMove={this.props.touchMove} onTouchEnd={this.props.touchEnd}*/>
                    {/* Segment-直播 */}
                    <section id="segment-live" className={"segment " + this.judgeActiveClassName(0)}>
                        <LiveChannelList />
                        <LiveIndexChannels />
                    </section>
                    {/* Segment-推荐 */}
                    {/*<section id="segment-recommend" className={"segment " + this.judgeActiveClassName(1)}></section>*/}
                    {/* Segment-番剧 */}
                    <section id="segment-bangumi" className={"segment " + this.judgeActiveClassName(1)}>
                        <BangumiHead.HeadOne />
                        <BangumiHead.HeadTwo />
                        <BangumiIndexCats />
                    </section>
                    {/* Segment-分区 */}
                    <section id="segment-region" className={"segment " + this.judgeActiveClassName(2)}>
                        <RegionList />
                    </section>
                </div>
            </section>
        );
    },
    componentWillUnmount: function (){
        console.log('Component HomeTab will unmount');
    }
});

Tab.HomeTab = TabHOC(HomeTab, 'homeTab');


/*
 * 关注Tab
 */
let FocusTab = React.createClass({
    displayName: 'FocusTab',
    getSegmentWrapperClassName: function (){
        switch(this.props.currentSegmentIndex)
        {
            case 1:
                return 'seg-2-of-3';
                break;
            case 2:
                return 'seg-3-of-3';
                break;
            default:
                return 'seg-1-of-3';
                break;
        }
    },
    getSegmentWrapperStyle: function (){
        switch(this.props.currentSegmentIndex)
        {
            case 1:
                return {transform: 'translate3d(calc(-100% / 3), 0, 0)'};
                break;
            case 2:
                return {transform: 'translate3d(calc(-200% / 3), 0, 0)'};
                break;
            default:
                return {transform: 'translate3d(0, 0, 0)'};
                break;
        }
    },
    judgeActiveClassName: function (index){
        if(index==this.props.currentSegmentIndex){
            return ' active';
        }
        return '';
    },
    handleHeaderSegmentSwitch: function (index){
        console.log('Switch to segment '+ (index+1).toString());
        if(index==this.props.currentSegmentIndex){
            return;
        }
        switch (index)
        {
            case 0:
            case 1:
            case 2:
                this.props.switchSegmentParentCb(index);
                break;
            default:
                this.props.switchSegmentParentCb(0);
                break;
        }
    },
    shouldComponentUpdate: function (nextProps, nextState){
        return this.props != nextProps || this.state != nextState;
    },
    render: function (){
        return (
            <section id="tab-focus" className="tab-view">
                {/* Tab Header */}
                <Header.FocusHeader currentSegmentIndex={this.props.currentSegmentIndex} onSegmentSwitch={this.handleHeaderSegmentSwitch} />
                {/* Tab内容容器 */}
                <div id="tab-focus-body" className={"tab-view-body transition segments seg-3 " + this.getSegmentWrapperClassName()} style={this.getSegmentWrapperStyle()} /*onTouchStart={this.props.touchStart} onTouchMove={this.props.touchMove} onTouchEnd={this.props.touchEnd}*/>
                    {/* Segment-追番 */}
                    <section id="segment-track" className={"segment " + this.judgeActiveClassName(0)}>

                    </section>
                    {/* Segment-动态 */}
                    <section id="segment-activity" className={"segment " + this.judgeActiveClassName(1)}>

                    </section>
                    {/* Segment-标签 */}
                    <section id="segment-tag" className={"segment " + this.judgeActiveClassName(2)}>

                    </section>
                </div>
            </section>
        );
    },
    componentWillUnmount: function (){
        console.log('Component FocusTab will unmount');
    }
});

Tab.FocusTab = TabHOC(FocusTab, 'focusTab');


/*
 * 发现Tab
 */
let FindTab = React.createClass({
    displayName: 'FindTab',
    shouldComponentUpdate: function (nextProps, nextState){
        return this.props != nextProps || this.state != nextState;
    },
    render: function (){
        return (
            <section id="tab-find" className="tab-view">

            </section>
        );
    },
    componentWillUnmount: function (){
        console.log('Component FindTab will unmount');
    }
});

Tab.FindTab = TabHOC(FindTab, 'findTab');


/*
 * 我的Tab
 */
let MeTab = React.createClass({
    displayName: 'MeTab',
    shouldComponentUpdate: function (nextProps, nextState){
        return this.props != nextProps || this.state != nextState;
    },
    getCurrentPosition: function (){
        if (navigator.geolocation){
            navigator.geolocation.getCurrentPosition(this.showPosition);
        }
    },
    showPosition: function (position){
        console.log(position.coords.latitude);
        this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    },
    getInitialState: function (){
        return {
            latitude: '',
            longitude: ''
        }
    },
    render: function (){
        return (
            <section id="tab-me" className="tab-view">
                {/* Tab Header */}
                <Header.MeHeader />
                {/* Tab内容容器 */}
                <div id="tab-me-body" className="tab-view-body cells">
                    <div>地理位置为经度: {this.state.longitude ? this.state.longitude : ""}</div>
                    <div>地理位置为纬度: {this.state.latitude ? this.state.latitude : ""}</div>
                </div>
            </section>
        );
    },
    componentWillUnmount: function (){
        console.log('Component MeTab will unmount');
    },
    componentDidMount: function (){
        this.getCurrentPosition();
    }
});

Tab.MeTab = TabHOC(MeTab, 'meTab');



app.Tab = Tab;

export default app.Tab;
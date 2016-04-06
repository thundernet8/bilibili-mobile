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
import Utils from '../scripts/utils';

let Tab = app.Tab || {};

/*
 * 公用函数和对象,添加滑动Handler(High-Order-Component)
 */

let TabHOC = (TabComponent, TabName='homeTab') => React.createClass({
    displayName: 'TabHOC',
    translateX: 0,
    preTranslateX: 0,
    segmentIndex: Utils.store(TabName).segmentIndex || 0,
    containerWidth: 0,
    onTouchStart: function (event){
        event.preventDefault();

        this.startT = new Date().getTime();
        this.containerWidth = event.target.offsetWidth;
        this.startX = event.touches[0].pageX;
    },
    onTouchMove: function (event){
        const edgeWith = 0;
        const leftEdge = edgeWith;
        const rightEdge = -(this.containerWidth + edgeWith);
        const diffX = event.touches[0].pageX - this.startX;
        console.log(diffX);
        this.translateX = this.preTranslateX + diffX;
        //this.translateX = this.translateX > leftEdge ? edgeWith : this.translateX;
        //this.translateX = this.translateX < rightEdge ? rightEdge : this.translateX;

        event.target.childNodes[1].style.webkitTransform = `translate3d(${this.translateX}px, 0, 0)`;
        event.target.childNodes[1].style.transform = `translate3d(${this.translateX}px, 0, 0)`;
    },
    onTouchEnd: function (event){
        const deltaT = new Date().getTime() - this.startT;
        if(deltaT<300){
            event.target.childNodes[1].style.webkitTransform = '';
            event.target.childNodes[1].style.transform = '';
        }
        this.segmentIndex = (this.translateX / this.containerWidth).toFixed(0);
        this.preTranslateX = this.segmentIndex * this.containerWidth;
        this.setState({
            currentSegmentIndex: Math.abs(this.segmentIndex)
        });
        event.target.childNodes[1].style.webkitTransform = `translate3d(${this.preTranslateX}px, 0, 0)`;
        event.target.childNodes[1].style.transform = `translate3d(${this.preTranslateX}px, 0, 0)`;
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
            <TabComponent {...props} />
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
          case 1:
              return 'seg-2-of-4';
              break;
          case 2:
              return 'seg-3-of-4';
              break;
          case 3:
              return 'seg-4-of-4';
              break;
          default:
              return 'seg-1-of-4';
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
            case 3:
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
                <div id="tab-home-body" className={"tab-view-body transition segments seg-4 " + this.getSegmentWrapperClassName()} onTouchStart={this.props.touchStart} onTouchMove={this.props.touchMove} onTouchEnd={this.props.touchEnd}>
                    {/* Segment-直播 */}
                    <section id="segment-live" className={"segment " + this.judgeActiveClassName(0)}>

                    </section>
                    {/* Segment-推荐 */}
                    <section id="segment-recommend" className={"segment " + this.judgeActiveClassName(1)}>

                    </section>
                    {/* Segment-番剧 */}
                    <section id="segment-bangumi" className={"segment " + this.judgeActiveClassName(2)}>

                    </section>
                    {/* Segment-分区 */}
                    <section id="segment-district" className={"segment " + this.judgeActiveClassName(3)}>

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
Tab.FocusTab = React.createClass({
    displayName: 'FocusTab',
    getSegmentWrapperClassName: function (){
        switch(this.state.currentSegmentIndex)
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
    judgeActiveClassName: function (index){
        if(index==this.state.currentSegmentIndex){
            return ' active';
        }
        return '';
    },
    handleHeaderSegmentSwitch: function (index){
        console.log('Switch to segment '+ (index+1).toString());
        switch (index)
        {
            case 0:
            case 1:
            case 2:
                this.setState({
                    currentSegmentIndex: index
                });
                break;
            default:
                this.setState({
                    currentSegmentIndex: 0
                });
                break;
        }
    },
    getInitialState: function (){
        return {
            currentSegmentIndex: 0
        };
    },
    shouldComponentUpdate: function (nextProps, nextState){
        return this.props != nextProps || this.state != nextState;
    },
    render: function (){
        return (
            <section id="tab-focus" className="tab-view">
                {/* Tab Header */}
                <Header.FocusHeader onSegmentSwitch={this.handleHeaderSegmentSwitch} />
                {/* Tab内容容器 */}
                <div id="tab-focus-body" className={"tab-view-body transition segments seg-3 " + this.getSegmentWrapperClassName()}>
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


/*
 * 发现Tab
 */
Tab.FindTab = React.createClass({
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


/*
 * 我的Tab
 */
Tab.MeTab = React.createClass({
    displayName: 'MeTab',
    shouldComponentUpdate: function (nextProps, nextState){
        return this.props != nextProps || this.state != nextState;
    },
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
    },
    componentWillUnmount: function (){
        console.log('Component MeTab will unmount');
    }
});

app.Tab = Tab;

export default app.Tab;
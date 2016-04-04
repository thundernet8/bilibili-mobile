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
    getSegmentWrapperClassName: function (){
      switch(this.state.currentSegmentIndex)
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
            case 3:
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
    render: function (){
        return (
            <section id="tab-home" className="tab-view">
                {/* Tab Header */}
                <Header.HomeHeader onSegmentSwitch={this.handleHeaderSegmentSwitch} />
                {/* Tab内容容器 */}
                <div id="tab-home-body" className={"tab-view-body transition segments seg-4 " + this.getSegmentWrapperClassName()}>
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
    }
});


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
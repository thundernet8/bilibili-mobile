/**
 * Copyright 2016, WuXueqian
 * All right reserved.
 *
 * @author WuXueqian
 * @date 16/4/21 19:15
 * @license MIT LICENSE
 */

/*jshint esversion: 6 */
/*jshint quotmark: false */
/*jshint white: false */
/*jshint trailing: false */
/*jshint newcap: false */

'use strict';

import React from 'react';


export default React.createClass({
    displayName: 'PullRefreshIndicator',
    getDefaultProps: function(){
        return {
            text: {
                unpull: '再拉, 再拉就刷给你看',
                pulling: '够了啦, 松开人家嘛',
                pulled: '刷呀刷呀，好累啊，喵^ω^',
                pulledFinish: '刷呀刷呀，刷完啦，喵^ω^'
            },
            icon: {
                unpull: 'arrow-down',
                pulling: 'arrow-down arrow-up',
                pulled: 'refresh-circle spin',
                pulledFinish: 'refresh-done'
            },
            triggerHeight: 100
        }
    },
    getInitialState: function(){
        return {
            pullStatus: 'unpull' //unpull/pulling/pulled/pulledFinish
        }
    },
    componentWillReceiveProps: function(nextProps){
        this.setState({
            pullStatus: this.filterPullStatus(nextProps.pullStatus)
        })
    },
    filterPullStatus: function(status){
        const legalStatus = ['unpull', 'pulling', 'pulled', 'pulledFinish'];
        return legalStatus.indexOf(status) > -1 ? status:'unpull';
    },
    render: function(){
        return (
            <div className="pull-refresh-indicator">
                <img src="dist/images/pull_refresh_img.png" />
                <div className="pull-refresh-wrap">
                    <i className={"icon pull-refresh-icon "+this.props.icon[this.state.pullStatus]} />
                    <span className="pull-refresh-text">{this.props.text[this.state.pullStatus]}</span>
                </div>
            </div>
        )
    }
});
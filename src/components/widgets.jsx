/**
 * Copyright 2016, WuXueqian
 * All right reserved.
 *
 * @author WuXueqian
 * @date 16/5/9 21:54
 * @license MIT LICENSE
 */

/*jshint esversion: 6 */
/*jshint quotmark: false */
/*jshint white: false */
/*jshint trailing: false */
/*jshint newcap: false */

'use strict';

import React from 'react';


let Widget={};

Widget.SpinLoading = React.createClass({
    displayName: 'SpinLoadingWidget',
    getInitialState: function(){
        return {
            text: '正在加载中...',
            cls: ''
        }
    },
    componentWillMount: function(){
        this.setState({
            text: this.props.text||this.state.text,
            cls: this.props.cls||this.state.cls
        });
    },
    render: function(){
        return (
            <div className={"loading widget "+this.state.cls}><i className="fa fa-spinner" /><div className="loading-text">{this.state.text}</div></div>
        );
    }
});

Widget.CoverLoading = React.createClass({
    displayName: 'CoverLoadingWidget',
    getInitialState: function(){
       return {
           text: '正在加载中...',
           cls: ''
       }
    },
    componentWillMount: function(){
       this.setState({
           text: this.props.text||this.state.text,
           cls: this.props.cls||this.state.cls
       });
    },
    render: function(){
        return (
            <div className={"loading widget "+this.state.cls}><img src="dist/images/sub_loading_cover.png" className="sub-loading-cover" alt="加载中" /><div className="loading-text">{this.state.text}</div></div>
        );
    }
});

Widget.LoadError = React.createClass({
    displayName: 'LoadErrorWidget',
    getInitialState: function(){
        return {
            text: '发生了一个错误!',
            cls: ''
        }
    },
    componentWillMount: function(){
        this.setState({
            text: this.props.text||this.state.text,
            cls: this.props.cls||this.state.cls
        });
    },
    render: function(){
        return (
            <div className={"error loadError widget "+this.state.cls}><i className="fa fa-warning" /><div className="error-text">{this.state.text}</div></div> //TODO
        );
    }
});

export default Widget;
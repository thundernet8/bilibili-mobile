/**
 * Copyright 2016, WuXueqian
 * All right reserved.
 *
 * @author WuXueqian
 * @date 16/4/17 22:01
 * @license MIT LICENSE
 */

/*jshint esversion: 6 */
/*jshint quotmark: false */
/*jshint white: false */
/*jshint trailing: false */
/*jshint newcap: false */

'use strict';

import React from 'react';
import Header from './header.jsx';
import PullRefreshIndicator from './pullRefreshIndicator.jsx';
import jQuery from 'jquery';
import Config from '../scripts/config';


export default React.createClass({
    displayName: 'BangumiIndexView',
    getInitialState: function(){
        return {
            list: [],
            page: 1,
            error: false,
            isLoad: false
        };
    },
    getTagList: function(){
        let url = Config.APIType=='json' ? Config.bangumiIndexAPIJSON:Config.bangumiIndexAPIUrl;
        jQuery.ajax({
            method: 'get',
            url: url + '&page=1&pagesize=30',
            //dataType: 'jsonp',
            dataType: 'json',
            context: this,
            //beforeSend: function(xhr, settings){
            //    xhr.setRequestHeader('User-Agent', 'bilianime/101130 CFNetwork/758.3.15 Darwin/15.4.0');
            //    xhr.setRequestHeader('Cookie', 'sid=936ny0js');
            //    xhr.setRequestHeader('Host', 'bangumi.bilibili.com');
            //},
            success: function(data){
                let renderList = [];
                if(data.hasOwnProperty('message') && data.message=='success' && data.hasOwnProperty('result')){
                    let result = data.result;
                    if(!result.length)return;
                    for(let i=0; i<result.length; i++){
                        renderList.push(
                            <li key={result[i].tag_id} className="tag" data-index={result[i].index} data-tagId={result[i].tag_id} data-tagName={result[i].tag_name}>
                                <img src={result[i].cover} />
                                <span className="tag-name">{result[i].tag_name}</span>
                            </li>
                        );
                    }
                }

                let loadClear = function(){
                    if(this.isMounted()){
                        this.setState({
                            list: renderList,
                            isLoad: true
                        })
                    }
                }.bind(this);

                if(!window.load){
                    setTimeout(function(){
                        loadClear();
                    }.bind(this), 500);
                }else{
                    loadClear();
                }
            },
            error: function(){
                this.setState({
                    error: true
                });
            }
        });
    },
    getMoreTagList: function(){

    },
    onTouchStart: function(e){
        this._pullRefreshIndicator.touchStartHandler(e);
    },
    onTouchMove: function(e){
        this._pullRefreshIndicator.touchMoveHandler(e);
    },
    onTouchEnd: function(e){
        let callback = function(){
            this.getTagList();
        }.bind(this);
        this._pullRefreshIndicator.touchEndHandler(e, callback);
    },
    componentDidMount: function(){
        this.getTagList();
    },
    render: function(){
        const ErrorWidget = <div className="tag-list error">发生了一个错误</div>;
        let TagList;
        if(this.state.error){
            TagList = ErrorWidget;
        }else if(this.state.isLoad){
            TagList = <div className="tag-list">{this.state.list}</div>;
        }else{
            TagList = <div className="tag-list" />;
        }
        return (
            <div id="bangumi-index">
                <Header.BasicNaviController leftBtnIconClass="left-arrow" leftBtnPath="/backForward" navBarTitle="番剧索引" />
                <section className="view-body" onTouchStart={this.onTouchStart} onTouchMove={this.onTouchMove} onTouchEnd={this.onTouchEnd}>
                    <PullRefreshIndicator ref={(p)=>this._pullRefreshIndicator=p} pullStatus="unpull" marginTop={-120} />
                    {TagList}
                </section>
            </div>
        )
    }
});
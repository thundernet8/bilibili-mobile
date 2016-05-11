/**
 * Copyright 2016, WuXueqian
 * All right reserved.
 *
 * @author WuXueqian
 * @date 16/5/10 22:34
 * @license MIT LICENSE
 */

/*jshint esversion: 6 */
/*jshint quotmark: false */
/*jshint white: false */
/*jshint trailing: false */
/*jshint newcap: false */

'use strict';

import React from 'react';
import Utils from '../scripts/utils';
import Config from '../scripts/config';
import Header from './header.jsx';
import Widget from './widgets.jsx';


export default React.createClass({
    displayName: 'HomeBangumiCartoonCategoryView',
    getInitialState: function(){
        return {
            categoryName: '',
            isLoad: false,
            page: 1,
            totalPages: 1,
            totalCount: 0,
            perPage: Config.bangumiCategoryVideosPerPage,
            list: [],
            error: false
        }
    },
    getCartoonVideos: function(page){
        const type = this.props.params.type;
        const url = Config.bangumiCartoonAPIJSON + type + '_cartoon.json';  //TODO page
        jQuery.ajax({
            context: this,
            method: 'get',
            url: url,
            dataType: 'json',
            success: function(data){
                const videos = data.list;

                if(videos['0']){
                    let list=[];
                    for(let key in videos){
                        const video = videos[key];
                        if(typeof video !== "object")continue;
                        list.push(
                            <li key={video.aid} className="cartoon-video col-1">
                                <div className="inner-wrap">
                                    <img className="video-cover" src={video.pic} alt={video.title} />
                                    <div className="video-info">
                                        <h2>{video.title}</h2>
                                        <div className="video-meta">
                                            <span className="author">{"UP主: "+video.author}</span>
                                            <span className="play">{"播放: "+(parseInt(video.play)>=10000?(parseInt(video.play)/10000).toFixed(1)+"万":video.play)}</span>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        );
                    }

                    let loadClear = function(){
                        if(this.isMounted()){
                            this.setState({
                                categoryName: data.name,
                                totalPages: data.pages,
                                totalCount: data.num,
                                list: list,
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
                }

            },
            error: function(data){
                this.setState({
                    error: true
                });
            }
        });
    },
    componentDidMount: function(){
        this.getCartoonVideos(this.state.page);
    },
    render: function (){
        if(this.state.error){
            return (
                <div id="bangumi-category">
                    <Header.BasicNaviController leftBtnIconClass="left-arrow" leftBtnPath="/backForward" navBarTitle={this.state.categoryName} />
                    <section className="view-body error">
                        <Widget.LoadError text="服务器开了个小差~" />
                    </section>
                </div>
            );
        }
        return (
            <div id="bangumi-category">
                <Header.BasicNaviController leftBtnIconClass="left-arrow" leftBtnPath="/backForward" navBarTitle={this.state.categoryName} />
                <section className="view-body">
                    {this.state.isLoad?this.state.list:<Widget.CoverLoading text="哔哩哔哩~" />}
                </section>
            </div>
        );
    }
});
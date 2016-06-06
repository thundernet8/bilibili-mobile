/**
 * Copyright 2016, WuXueqian
 * All right reserved.
 *
 * @author WuXueqian
 * @date 16/5/9 21:00
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
import {Link} from 'react-router';


export default React.createClass({
    displayName: 'HomeBangumiCategoryView',
    getInitialState: function(){
        return {
            categoryName: '',
            categoryCover: '',
            isLoad: false,
            page: 1,
            totalPages: 1,
            totalCount: 0,
            perPage: Config.bangumiCategoryVideosPerPage,
            list: [],
            error: false
        }
    },
    getCategoryVideos: function(page){
        const id = this.props.params.id;
        const url = Config.bangumiCategoryAPIJSON + id + '.json';  //TODO page
        jQuery.ajax({
            context: this,
            method: 'get',
            url: url,
            dataType: 'json',
            success: function(data){
                const videos = data.result;

                if(videos.length){
                    const category = videos[0]['tags'].filter((t)=>t.tag_id==id)[0];

                    let list=[];
                    for(let i=0; i<videos.length; i++){
                        const video=videos[i];
                        list.push(
                            <li key={video.season_id} className="video col-1">
                                <Link to={'/video/'+video.aid}>
                                    <div className="inner-wrap">
                                        <img className="video-cover" src={video.cover} alt={video.bangumi_title} />
                                        <div className="video-info">
                                            <h2>{video.bangumi_title}</h2>
                                            <div className="video-brief">{video.brief}</div>
                                            <div className="video-status">{video.is_finish?video.total_count+"话全":"连载中, 最新更新 第 "+video.newest_ep_index+" 话" }</div>
                                            <div className="video-meta">
                                                <span className="subscribe-count">{(parseInt(video.danmaku_count)/10000).toFixed(1)+"万人订阅"}</span>
                                                <span className="last-time">{video.last_time.substr(0,7).replace(/[-]/, '年')+'月'}</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        );
                    }

                    let loadClear = function(){
                        if(this.isMounted()){
                            this.setState({
                                categoryName: category.tag_name,
                                categoryCover: category.cover,
                                totalPages: data.pages,
                                totalCount: data.count,
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
        this.getCategoryVideos(this.state.page);
    },
    render: function (){
        if(this.state.error){
            return (
                <div id="bangumi-category" className="fullscreen-view inset-nav">
                    <Header.BasicNaviController leftBtnIconClass="left-arrow" leftBtnPath="/backForward" navBarTitle={this.state.categoryName} />
                    <section className="view-body error">
                        <Widget.LoadError text="服务器开了个小差~" />
                    </section>
                </div>
            );
        }
        return (
            <div id="bangumi-category" className="fullscreen-view inset-nav">
                <Header.BasicNaviController leftBtnIconClass="left-arrow" leftBtnPath="/backForward" navBarTitle={this.state.categoryName} />
                <section className="view-body">
                    {this.state.isLoad?this.state.list:<Widget.CoverLoading text="哔哩哔哩~" />}
                </section>
            </div>
        );
    }
});
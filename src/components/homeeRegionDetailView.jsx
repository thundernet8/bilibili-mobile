/**
 * Copyright 2016, WuXueqian
 * All right reserved.
 *
 * @author WuXueqian
 * @date 16/4/11 22:48
 * @license MIT LICENSE
 */

/*jshint esversion: 6 */
/*jshint quotmark: false */
/*jshint white: false */
/*jshint trailing: false */
/*jshint newcap: false */

'use strict';

import React from 'react';
import Header from '../components/header.jsx';
import Footer from '../components/footer.jsx';
import Config from '../scripts/config';
import Widget from './widgets.jsx';
import jQuery from 'jquery';
import Utils from '../scripts/utils';


/*
 * 分区详情视图
 */

const regions = {
    live: '直播',
    bangumi: '番剧',
    cartoon: '动画',
    music: '音乐',
    dance: '舞蹈',
    game: '游戏',
    tech: '科技',
    entertainment: '娱乐',
    guichu: '鬼畜',
    movie: '电影',
    tv: '电视剧',
    fashion: '时尚'
};

let HotRecommend = React.createClass({
    displayName: 'HotRecommend',
    getInitialState: function(){
        return {
            list: []
        }
    },
    componentWillReceiveProps: function(nextProps){
        if(nextProps.hasOwnProperty('list')){
            this.setState({
                list: nextProps.list
            });
        }
    },
    render: function(){
        if(!this.state.list.length){
            return null;
        }
        return (
            <section className="recommend">
                <header>
                    <div className="mod-info">
                        <img className="mod-icon" src="dist/images/icons/home_region_icon_13.png" />
                        <span className="mod-name">热门推荐</span>
                    </div>
                    <div className="more-link">
                        <img className="rank-icon" src="dist/images/icons/home_region_icon_14.png" />
                        <span className="more-text">排行榜</span>
                        <img className="more-icon" src="dist/images/icons/btn_icon_enter.png" />
                    </div>
                </header>
                <div className="mod-content">{this.state.list}</div>
            </section>
        );
    }
});


let Contribution = React.createClass({
    displayName: 'Contribution',
    getInitialState: function(){
        return {
            list: []
        }
    },
    componentWillReceiveProps: function(nextProps){
        if(nextProps.hasOwnProperty('list')){
            this.setState({
                list: nextProps.list
            });
        }
    },
    render: function(){
        if(!this.state.list.length){
            return null;
        }
        return (
            <section className="contribution">
                <header>
                    <div className="mod-info">
                        <img className="mod-icon" src="dist/images/icons/home_region_icon_15.png" />
                        <span className="mod-name">最新投稿</span>
                    </div>
                    <div className="more-link">
                        <span className="more-text">进去看看</span>
                        <img className="more-icon" src="dist/images/icons/btn_icon_enter.png" />
                    </div>
                </header>
                <div className="mod-content">{this.state.list}</div>
            </section>
        );
    }
});


let AllActivity = React.createClass({
    displayName: 'AllActivity',
    getInitialState: function(){
        return {
            list: []
        }
    },
    componentWillReceiveProps: function(nextProps){
        if(nextProps.hasOwnProperty('list')){
            this.setState({
                list: nextProps.list
            });
        }
    },
    render: function(){
        if(!this.state.list.length){
            return null;
        }
        return (
            <section className="activity">
                <header>
                    <div className="mod-info">
                        <img className="mod-icon" src="dist/images/icons/home_region_icon_16.png" />
                        <span className="mod-name">全区动态</span>
                    </div>
                </header>
                <div className="mod-content">{this.state.list}</div>
            </section>
        );
    }
});


export default React.createClass({
    displayName: 'RegionDetailView',
    getInitialState: function(){
        return {
            regionName: regions[this.props.params.slug],
            regionSlug: this.props.params.slug,
            isLoad: false,
            hotList: [],
            contributionList: [],
            activityList: [],
            error: false
        };
    },
    getHotRecommend: function(){
        const self = this;
        const url = Config.regionDetailAPIJSON + self.props.params.slug + '/show.json';
        jQuery.getJSON(url, function(data){
            let recommends = [];
            let renderList = [];
            if(data.hasOwnProperty('result')&&data.result.hasOwnProperty('recommends')) recommends = data.result.recommends;
            for(let i=0; i<recommends.length&&i<4; i++){
                const item = recommends[i];
                renderList.push(
                    <li key={item.aid} className="video-item">
                        <img className="cover" src={item.pic} alt={item.title} />
                        <h4>{item.title}</h4>
                        <div className="meta">
                            <div className="play"><i className="icon icon-play" /><span className="num">{Utils.formatTenThousandNum(item.play)}</span></div>
                            <div className="view"><i className="icon icon-view" /><span className="num">{Utils.formatTenThousandNum(item.video_review)}</span></div>
                        </div>
                    </li>
                );
            }

            let loadClear = function(){
                if(self.isMounted()){
                    self.setState({
                        hotList: renderList,
                        isLoad: true
                    })
                }
            };

            if(!window.load){
                setTimeout(function(){
                    loadClear();
                }, 500);
            }else{
                loadClear();
            }

        }).fail(function(){
            self.setState({
                error: true
            });
        });
    },
    getContribution: function(){
        const self = this;
        const url = Config.regionDetailAPIJSON + self.props.params.slug + '/contribution.json';
        jQuery.getJSON(url, function(data){
            let contributions = [];
            let renderList = [];
            if(data.hasOwnProperty('list')) contributions = data.list;
            for(let key in contributions){
                const item = contributions[key];
                if(typeof item !== 'object')continue;
                renderList.push(
                    <li key={item.aid} className="video-item">
                        <img className="cover" src={item.pic} alt={item.title} />
                        <h4>{item.title}</h4>
                    </li>
                );
            }

            let loadClear = function(){
                if(self.isMounted()){
                    self.setState({
                        contributionList: renderList,
                        isLoad: true
                    })
                }
            };

            if(!window.load){
                setTimeout(function(){
                    loadClear();
                }, 500);
            }else{
                loadClear();
            }

        }).fail(function(){
            self.setState({
                error: true
            });
        });
    },
    getActivity: function(){
        const self = this;
        const url = Config.regionDetailAPIJSON + self.props.params.slug + '/activity.json';
        jQuery.getJSON(url, function(data){
            let activities = [];
            let renderList = [];
            if(data.hasOwnProperty('list')) activities = data.list;
            for(let i=0; i<activities.length; i++){
                const item = activities[i];
                renderList.push(
                    <li key={item.aid} className="video-item">
                        <img className="cover" src={item.pic} alt={item.title} />
                        <h4>{item.title}</h4>
                        <div className="meta">
                            <div className="play"><i className="icon icon-play" /><span className="num">{Utils.formatTenThousandNum(item.play)}</span></div>
                            <div className="view"><i className="icon icon-view" /><span className="num">{Utils.formatTenThousandNum(item.video_review)}</span></div>
                        </div>
                    </li>
                );
            }

            let loadClear = function(){
                if(self.isMounted()){
                    self.setState({
                        activityList: renderList,
                        isLoad: true
                    })
                }
            };

            if(!window.load){
                setTimeout(function(){
                    loadClear();
                }, 500);
            }else{
                loadClear();
            }

        }).fail(function(){
            self.setState({
                error: true
            });
        });
    },
    getMoreActivity: function(){
        //TODO
    },
    componentDidMount: function(){
        this.getHotRecommend();
        this.getContribution();
        this.getActivity();
    },
    render: function (){
        if(this.state.error){
            return (
                <div id="region" className="fullscreen-view inset-nav">
                    <Header.BasicNaviController leftBtnIconClass="left-arrow" leftBtnPath="/backForward" navBarTitle={this.state.regionName} />
                    <section className="view-body error">
                        <Widget.LoadError text="服务器开了个小差~" />
                    </section>
                </div>
            );
        }

        if(!this.state.isLoad){
            return (
                <div id="region" className="fullscreen-view inset-nav">
                    <Header.BasicNaviController leftBtnIconClass="left-arrow" leftBtnPath="/backForward" navBarTitle={this.state.regionName} />
                    <section className="view-body">
                        <Widget.CoverLoading text="哔哩哔哩~" />
                    </section>
                </div>
            );
        }
        return (
            <div id="region" className="fullscreen-view inset-nav">
                <Header.BasicNaviController leftBtnIconClass="left-arrow" leftBtnPath="/backForward" navBarTitle={this.state.regionName} />
                <section className="view-body">
                    <HotRecommend list={this.state.hotList} />
                    <Contribution list={this.state.contributionList} />
                    <AllActivity list={this.state.activityList} />
                </section>
            </div>
        );
    }
});
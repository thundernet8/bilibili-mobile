/**
 * Copyright 2016, WuXueqian
 * All right reserved.
 *
 * @author WuXueqian
 * @date 16/4/27 20:17
 * @license MIT LICENSE
 */

/*jshint esversion: 6 */
/*jshint quotmark: false */
/*jshint white: false */
/*jshint trailing: false */
/*jshint newcap: false */

'use strict';

import React from 'react';
import Config from '../scripts/config';
import jQuery from 'jquery';


let BangumiCatLatestUpdateBlock = React.createClass({
    displayName: 'BangumiCatLatestUpdateBlock',
    getInitialState: function(){
        return {
            catIcon: '',
            catName: '新番连载',
            moreText: '今日更新',
            updateCount: 0,
            list: []
        }
    },
    componentWillMount: function(){

    },
    componentDidMount: function(){
        let list = this.props.list.slice(0, 6);
        let updateCount = this.props.updateCount;
        let length = list.length;
        let renderList = [];
        for(let i=0; i<length; i++){
            let item = list[i];
            renderList.push(
                <li key={item.newest_ep_id}>
                    <img src={item.cover} />
                    <h4>{item.title}</h4>
                    <div className="meta">
                        <span className="time">{item.time}</span>
                        <span> • </span>
                        <span className="order">第 {item.newest_ep_index} 话</span>
                    </div>
                </li>
            );
        }
        this.setState({
            updateCount: updateCount,
            list: renderList
        });
    },
    componentWillReceiveProps: function(nextProps){

    },
    render: function(){
        return (
            <section className="cat-block latest-update">
                <header className="cat-block-header">
                    <div className="cat-info">
                        <img className="cat-icon" src={this.state.catIcon} />
                        <span className="cat-name">{this.state.catName}</span>
                    </div>
                    <div className="more-link">
                        <span className="more-text">{this.state.moreText}</span>
                        <span className="update-count">{this.state.updateCount}</span>
                        <img className="more-icon" src="dist/images/icons/enter.png" />
                    </div>
                </header>
                <div className="cat-block-content">
                    {this.state.list}
                </div>
            </section>
        );
    }
});


let BangumiCatOneRowBlock = React.createClass({
    displayName: 'BangumiCatOneRowBlock',
    getInitialState: function(){
        return {
            catIcon: '',
            catID: 0,
            catName: '',
            moreText: '进去看看',
            list: []
        }
    },
    componentWillReceiveProps: function(nextProps){
        let catName = nextProps.category.tag_name;
        let catID = nextProps.category.tag_id;
        let length = nextProps.list.list.length;
        let renderList = [];
        for(let i=0; i<length; i++){
            let item = nextProps.list.list[i];
            let meta = item.is_finish ? item.total_count+'话全':'更新至'+item.newest_ep_index+'话';
            renderList.push(
                <li key={item.bangumi_id}>
                    <img src={item.cover} />
                    <h4>{item.title}</h4>
                    <div className="meta">{meta}</div>
                </li>
            );
        }
        this.setState({
            catID: catID,
            catName: catName,
            list: renderList
        });
    },
    render: function(){
        return (
            <section className="cat-block">
                <header className="cat-block-header">
                    <div className="cat-info">
                        <img className="cat-icon" src={this.state.catIcon} />
                        <span className="cat-name">{this.state.catName}</span>
                    </div>
                    <div className="more-link">
                        <span className="more-text">{this.state.moreText}</span>
                        <img className="more-icon" src="dist/images/icons/enter.png" />
                    </div>
                </header>
                <div className="cat-block-content">
                    {this.state.list}
                </div>
            </section>
        );
    }
});

export default React.createClass({
    displayName: 'BangumiIndexCats',
    getDefaultProps: function(){
        return {

        }
    },
    getInitialState: function(){
        return {
            latestUpdate: [],
            catList: [],
            isLoad: false,
            error: false
        }
    },
    getData: function(){
        //let url = Config.APIType=='json' ? Config.bangumiCatAPIJSON.replace('{$paras}', `${this.props.catID}_page_${this.props.page}_limit_${this.props.limit}`):Config.bangumiCatAPIUrl.replace('{$paras}', `&catid=${this.props.catID}&page=${this.props.page}&limit=${this.props.limit}`);
        let url = Config.APIType=='json' ? Config.bangumiIndexAPIJSON:Config.bangumiIndexAPIUrl;
        jQuery.ajax({
            context: this,
            method: 'get',
            url: url,
            dataType: 'json',
            success: function(data){
                data = data.result || {};
                let renderLatestUpdate=[], renderCategories = [];
                if(data.hasOwnProperty('latestUpdate')){
                    console.log(data.latestUpdate);
                    renderLatestUpdate.push(
                        <BangumiCatLatestUpdateBlock key="lastUpdate" list={data.latestUpdate.list} updateCount={data.latestUpdate.updateCount} />
                    );
                }

                if(data.hasOwnProperty('categories')){
                    const length = data.categories.length;
                    for(let i=0; i<length; i++){
                        let item = data.categories[i];
                        renderCategories.push(
                            <BangumiCatOneRowBlock key={item.category.tag_id} category={item.category} list={item.list} />
                        );
                    }
                }

                let loadClear = function(){
                    if(this.isMounted()){
                        this.setState({
                            latestUpdate: renderLatestUpdate,
                            catList: renderCategories,
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
    componentWillMount: function(){

    },
    componentDidMount: function(){
        this.getData();
    },
    render: function(){
        return (
            <section className="bangumi-cat-wrap">
                {this.state.latestUpdate}
                {this.state.catList}
            </section>
        )
    }
});
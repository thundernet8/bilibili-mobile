/**
 * Copyright 2016, WuXueqian
 * All right reserved.
 *
 * @author WuXueqian
 * @date 16/5/4 20:28
 * @license MIT LICENSE
 */

/*jshint esversion: 6 */
/*jshint quotmark: false */
/*jshint white: false */
/*jshint trailing: false */
/*jshint newcap: false */

'use strict';

import React from 'react';
import jQuery from 'jquery';
import Config from '../scripts/config';
import {Link} from 'react-router';


let LiveAD = React.createClass({
    displayName: 'LiveAD',
    getInitialState: function(){
        return {
            display: false,
            banner: {}
        }
    },
    componentDidMount: function(){
        this.setState({
            display: this.props.display,
            banner: this.props.banner
        });
    },
    render: function(){
        if(!this.state.display){
            return (
                <section className="live-ad" style={{display: 'none'}} />
            );
        }
        return (
            <section className="live-ad">
                <div className="ad-wrap">
                    <a href={this.state.banner.link} title={this.state.banner.title} target="_blank"><img src={this.state.banner.img} alt={this.state.banner.title} /></a>
                </div>
            </section>
        );
    }
});


let LiveCategoryBlock = React.createClass({
    displayName: 'LiveCategoryBlock',
    getInitialState: function(){
        return {
            categoryIcon: '',
            categoryName: '',
            categorySlug: '',
            moreText: '进去看看',
            list: []
        }
    },
    componentDidMount: function(){
        const categoryIcon = this.props.partition.sub_icon.src;
        const categoryName = this.props.partition.name;
        const categorySlug = this.props.partition.slug;
        const liveCount = this.props.lives.length;
        let list = [];
        for(let i=0; i<liveCount; i++){
            const item = this.props.lives[i];
            list.push(
                <li key={item.room_id}>
                    <div className="thumb">
                        <img src={item.cover.src} alt={item.title} className="cover" />
                        <img src={item.owner.face} alt={item.owner.name} className="avatar" />
                    </div>
                    <h4>{item.owner.name}</h4>
                    <div className="meta">
                        <span className="online-count">{item.online}</span>
                        <span className="category-des">{item.title}</span>
                    </div>
                </li>
            );
        }
        this.setState({
            categoryIcon: categoryIcon,
            categoryName: categoryName,
            categorySlug: categorySlug,
            list: list
        });
    },
    render: function(){
        return (
            <section className="category-block">
                <header className="category-block-header">
                    <div className="category-info">
                        <img className="category-icon" src={this.state.categoryIcon} />
                        <span className="category-name">{this.state.categoryName}</span>
                    </div>
                    <div className="more-link">
                        <Link to={"/live/category/"+this.state.categorySlug}>
                            <span className="more-text">{this.state.moreText}</span>
                            <img className="more-icon" src="dist/images/icons/btn_icon_enter.png" />
                        </Link>
                    </div>
                </header>
                <div className="category-block-content">
                    {this.state.list}
                </div>
            </section>
        );
    }
});


export default React.createClass({
    displayName: 'LiveIndexCategories',
    getInitialState: function(){
        return {
            banner: [],
            categoryList: [],
            isLoad: false,
            error: false
        }
    },
    getData: function(){
        const url = Config.APIType=='json' ? Config.liveHomeAPIJSON:Config.liveHomeAPIUrl;
        jQuery.ajax({
            context: this,
            method: 'get',
            url: url,
            dataType: 'json',
            success: function(data){
                data = data.data || {};
                let banner=[];
                let categoryList=[];
                if(data.hasOwnProperty('bannerLives')){
                    banner.push(<LiveAD key="ad" display={true} banner={data.bannerLives[0]} />);
                }

                if(data.hasOwnProperty('partitions')){
                    const len = data.partitions.length;
                    for(let i=0; i<len; i++){
                        let item = data.partitions[i];
                        categoryList.push(<LiveCategoryBlock key={"category_block_"+i} partition={item.partition} lives={item.lives} />);
                    }
                }

                let loadClear = function(){
                    if(this.isMounted()){
                        this.setState({
                            banner: banner,
                            categoryList: categoryList,
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
            error: function(data){
                this.setState({
                    error: true
                });
            }

        });
    },
    componentDidMount: function(){
        this.getData();
    },
    render: function(){
        if(this.state.error){
            return (
                <section className="live-category-wrap error">
                    an error occurred!
                </section>
            );
        }
        return (
            <section className="live-category-wrap">
                {this.state.banner}
                {this.state.categoryList}
                {/* 全部直播锚点 */}
                <div className="all-live-anchor">
                    <Link to={"/live/category/all"}>全部直播</Link>
                </div>
            </section>
        );
    }
});
/**
 * Copyright 2016, WuXueqian
 * All right reserved.
 *
 * @author WuXueqian
 * @date 16/4/9 20:43
 * @license MIT LICENSE
 */

/*jshint esversion: 6 */
/*jshint quotmark: false */
/*jshint white: false */
/*jshint trailing: false */
/*jshint newcap: false */

'use strict';



import Header from '../components/header.jsx';
import Footer from '../components/footer.jsx';
import jQuery from 'jquery';
import Config from '../scripts/config';
import React from 'react';
import Widget from './widgets.jsx';


/*
 * 直播分类详情视图
 */
export default React.createClass({
    displayName: 'LiveCategoryView',
    getInitialState: function(){
        return {
            categoryName: '',
            categoryIcon: '',
            page: 1,            //TODO 全部直播时需要分页
            list: [],
            isLoad: false,
            error: false
        }
    },
    getLiveRoom: function(){
        const slug = this.props.params.slug;
        const categoriesUrl = Config.liveCategoriesAPIJSON;
        const categoryUrl = Config.liveCategoryAPIJSON + slug + '.json';

        let self = this;
        jQuery.getJSON(categoriesUrl, function(data){
            const categories = data.categories;
            const category = categories.filter((v)=>v.slug==slug)[0];

            jQuery.getJSON(categoryUrl, function(data){
                const rooms = data.data;
                let list=[];
                for(let i=0; i<rooms.length; i++){
                    let room = rooms[i];
                    list.push(
                        <li key={room.room_id} className="live-room">
                            <div className="thumb">
                                <img src={room.cover.src} alt={room.title} className="cover" />
                                <img src={room.owner.face} alt={room.owner.name} className="avatar" />
                            </div>
                            <h4>{room.owner.name}</h4>
                            <div className="meta">
                                <span className="online-count">{room.online>=10000?(room.online/10000).toFixed(1)+'万':room.online}</span>
                                <span className="room-des">{room.title}</span>
                            </div>
                        </li>
                    );
                }

                let loadClear = function(){
                    if(self.isMounted()){
                        self.setState({
                            categoryName: category.name,
                            categoryIcon: category.icon,
                            list: list,
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
                    categoryName: category.name,
                    error: true
                });
            });

        }).fail(function(){
            self.setState({
                error: true
            });
        });

    },
    componentDidMount: function(){
        this.getLiveRoom();
    },
    render: function (){
        if(this.state.error){
            return (
                <div id="live-category">
                    <Header.BasicNaviController leftBtnIconClass="left-arrow" leftBtnPath="/backForward" navBarTitle={this.state.categoryName} />
                    <section className="view-body error">
                        <Widget.LoadError text="服务器开了个小差~" />
                    </section>
                </div>
            );
        }
        return (
            <div id="live-category">
                <Header.BasicNaviController leftBtnIconClass="left-arrow" leftBtnPath="/backForward" navBarTitle={this.state.categoryName} />
                <section className="view-body">
                    {this.state.isLoad?this.state.list:<Widget.CoverLoading text="哔哩哔哩~" />}
                </section>
            </div>
        );
    }
});
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


/*
 * 直播分类详情视图
 */
export default React.createClass({
    displayName: 'LiveCategoryView',
    getInitialState: function(){
        return {
            categoryName: '',
            categoryIcon: '',
            isLoad: false,
            error: false
        }
    },
    getCategoryVideos: function(){
        const slug = this.props.params.slug;
        const url = Config.liveCategoriesAPIJSON;
        jQuery.ajax({
            context: this,
            method: 'get',
            url: url,
            dataType: 'json',
            success: function(data){
                const categories = data.categories;
                const category = categories.filter((v)=>v.slug==slug)[0];

                let loadClear = function(){
                    if(this.isMounted()){
                        this.setState({
                            categoryName: category.name,
                            categoryIcon: category.icon,
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
        this.getCategoryVideos();
    },
    render: function (){
        if(this.state.error){
            return (
                <div id="live-category">
                    <Header.BasicNaviController leftBtnIconClass="left-arrow" leftBtnPath="/backForward" navBarTitle={this.state.categoryName} />
                    <section className="view-body error">
                        an error occurred
                    </section>
                </div>
            );
        }
        return (
            <div id="live-category">
                <Header.BasicNaviController leftBtnIconClass="left-arrow" leftBtnPath="/backForward" navBarTitle={this.state.categoryName} />
                <section className="view-body">
                    live category view
                </section>
            </div>
        );
    }
});
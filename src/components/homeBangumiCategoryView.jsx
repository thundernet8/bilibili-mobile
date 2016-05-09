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


export default React.createClass({
    displayName: 'HomeBangumiCategoryView',
    getInitialState: function(){
        return {
            categoryName: '',
            categoryIcon: '',
            isLoad: false,
            page: 1,
            error: false
        }
    },
    getCategoryVideos: function(){
        const id = this.props.params.id;
        const url = Config.liveCategoriesAPIJSON;  //TODO
        jQuery.ajax({
            context: this,
            method: 'get',
            url: url,
            dataType: 'json',
            success: function(data){
                const categories = data.categories;
                const category = categories.filter((v)=>v.id==id)[0];

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
                <div id="bangumi-category">
                    <Header.BasicNaviController leftBtnIconClass="left-arrow" leftBtnPath="/backForward" navBarTitle={this.state.categoryName} />
                    <section className="view-body error">
                        an error occurred
                    </section>
                </div>
            );
        }
        return (
            <div id="bangumi-category">
                <Header.BasicNaviController leftBtnIconClass="left-arrow" leftBtnPath="/backForward" navBarTitle={this.state.categoryName} />
                <section className="view-body">
                    bangumi category view
                </section>
            </div>
        );
    }
});
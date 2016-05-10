/**
 * Copyright 2016, WuXueqian
 * All right reserved.
 *
 * @author WuXueqian
 * @date 16/5/6 22:30
 * @license MIT LICENSE
 */

/*jshint esversion: 6 */
/*jshint quotmark: false */
/*jshint white: false */
/*jshint trailing: false */
/*jshint newcap: false */

'use strict';

let app = window.app || {};

import Header from '../components/header.jsx';
import Footer from '../components/footer.jsx';
import jQuery from 'jquery';
import Config from '../scripts/config';


/*
 * 所有直播视图(未分类)
 */
app.LiveUnCategoryView = React.createClass({
    displayName: 'LiveUnCategoryView',
    getInitialState: function(){
        return {
            list: [],
            isLoad: false,
            error: false
        }
    },
    getChannels: function(){
        //const url = Config.liveCategoriesAPIJSON;
        jQuery.ajax({
            context: this,
            method: 'get',
            url: url,
            dataType: 'json',
            success: function(data){
                //const categories = data.categories;
                //const category = categories.filter((v)=>v.slug==slug)[0];

                let loadClear = function(){
                    if(this.isMounted()){
                        this.setState({
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
            },
            error: function(data){
                this.setState({
                    error: true
                });
            }
        });
    },
    componentDidMount: function(){
        this.getChannels();
    },
    render: function (){
        if(this.state.error){
            return (
                <div id="live-all">
                    <Header.BasicNaviController leftBtnIconClass="left-arrow" leftBtnPath="/backForward" navBarTitle="全部直播" />
                    <section className="view-body error">
                        an error occurred
                    </section>
                </div>
            );
        }
        return (
            <div id="live-all">
                <Header.BasicNaviController leftBtnIconClass="left-arrow" leftBtnPath="/backForward" navBarTitle="全部直播" />
                <section className="view-body">
                    live all view
                </section>
            </div>
        );
    }
});

window.app = app;

export default app.LiveUnCategoryView;
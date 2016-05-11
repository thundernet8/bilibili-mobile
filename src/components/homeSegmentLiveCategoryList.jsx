/**
 * Copyright 2016, WuXueqian
 * All right reserved.
 *
 * @author WuXueqian
 * @date 16/4/9 20:05
 * @license MIT LICENSE
 */

/*jshint esversion: 6 */
/*jshint quotmark: false */
/*jshint white: false */
/*jshint trailing: false */
/*jshint newcap: false */


'use strict';

import React from 'react';
import {Link} from 'react-router';


export default React.createClass({
    displayName: 'LiveCategoryList',
    shouldComponentUpdate: function(){
        return false;
    },
    render: function(){
        return (
            <section id="live-categories">
                <ul>
                    <li className="paint"><Link to="/live/category/paint"><i className="icon icon-paint" /><span>绘画专区</span></Link></li>
                    <li className="zhai"><Link to="/live/category/zhai"><i className="icon icon-zhai" /><span>御宅文化</span></Link></li>
                    <li className="yule"><Link to="/live/category/yule"><i className="icon icon-yule" /><span>生活娱乐</span></Link></li>
                    <li className="danji"><Link to="/live/category/danji"><i className="icon icon-danji" /><span>单机联机</span></Link></li>
                    <li className="wangyou"><Link to="/live/category/wangyou"><i className="icon icon-wangyou" /><span>网络游戏</span></Link></li>
                    <li className="jingji"><Link to="/live/category/jingji"><i className="icon icon-jingji" /><span>电子竞技</span></Link></li>
                    <li className="fangying"><Link to="/live/category/fangying"><i className="icon icon-fangying" /><span>放映厅</span></Link></li>
                    <li className="all"><Link to="/live/category/all"><i className="icon icon-all" /><span>全部直播</span></Link></li>
                </ul>
            </section>
        );
    }
});
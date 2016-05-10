/**
 * Copyright 2016, WuXueqian
 * All right reserved.
 *
 * @author WuXueqian
 * @date 16/4/15 21:12
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

let BangumiHead;
export default BangumiHead = {
    HeadOne: React.createClass({
        displayName: 'BangumiHeadOne',
        shouldComponentUpdate: function(){
            return false;
        },
        render: function(){
            return (
                <section id="bangumi-sort-head-1">
                    <ul>
                        <li className="serial"><Link to="/bangumi/cartoon/serial"><i className="icon" /><span>连载动画</span></Link></li>
                        <li className="completed"><Link to="/bangumi/cartoon/completed"><i className="icon" /><span>完结动画</span></Link></li>
                        <li className="domestic"><Link to="/bangumi/cartoon/domestic"><i className="icon" /><span>国产动画</span></Link></li>
                        <li className="extension"><Link to="/bangumi/cartoon/extension"><i className="icon" /><span>官方延伸</span></Link></li>
                    </ul>
                </section>
            );
        }
    }),
    HeadTwo: React.createClass({
        displayName: 'BangumiHeadTwo',
        shouldComponentUpdate: function(){
            return false;
        },
        render: function(){
            return (
                <section id="bangumi-sort-head-2">
                    <ul>
                        <li className="recommend"><Link to="/bangumi/recommend"><i className="icon" /><span>番剧推荐</span></Link></li>
                        <li className="daily"><Link to="/bangumi/daily"><i className="icon" /><span>每日放送</span></Link></li>
                        <li className="index"><Link to="/bangumi/index"><i className="icon" /><span>番剧索引</span></Link></li>
                    </ul>
                </section>
            );
        }
    })
};
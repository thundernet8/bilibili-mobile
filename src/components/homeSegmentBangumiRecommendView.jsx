/**
 * Copyright 2016, WuXueqian
 * All right reserved.
 *
 * @author WuXueqian
 * @date 16/4/17 22:00
 * @license MIT LICENSE
 */

/*jshint esversion: 6 */
/*jshint quotmark: false */
/*jshint white: false */
/*jshint trailing: false */
/*jshint newcap: false */

'use strict';

import React from 'react';
import Header from './header.jsx';


export default React.createClass({
    displayName: 'BangumiRecommendView',
    render: function(){
        return (
            <div id="bangumi-recommend" className="fullscreen-view inset-nav">
                <Header.BasicNaviController leftBtnIconClass="left-arrow" leftBtnPath="/backForward" navBarTitle="番剧推荐" />
                <section className="view-body">
                    bangumi recommend view
                </section>
            </div>
        )
    }
});
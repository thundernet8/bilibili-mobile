/**
 * Copyright 2016, WuXueqian
 * All right reserved.
 *
 * @author WuXueqian
 * @date 16/4/17 22:01
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
import PullRefreshIndicator from './pullRefreshIndicator.jsx';


export default React.createClass({
    displayName: 'BangumiIndexView',
    render: function(){
        return (
            <div id="bangumi-index">
                <Header.BasicNaviController leftBtnIconClass="left-arrow" leftBtnPath="/backForward" navBarTitle="番剧索引" />
                <section className="view-body">
                    <PullRefreshIndicator pullStatus="unpull" />
                    bangumi index view
                </section>
            </div>
        )
    }
});
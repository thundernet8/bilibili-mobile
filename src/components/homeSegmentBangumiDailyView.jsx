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


export default React.createClass({
    displayName: 'BangumiDailyView',
    render: function(){
        return (
            <div id="bangumi-daily" className="fullscreen-view inset-nav">
                <Header.BasicNaviController leftBtnIconClass="left-arrow" leftBtnPath="/backForward" navBarTitle="每日放送" />
                <section className="view-body">
                    bangumi daily view
                </section>
            </div>
        )
    }
});
/**
 * Copyright 2016, WuXueqian
 * All right reserved.
 *
 * @author WuXueqian
 * @date 16/4/17 21:53
 * @license MIT LICENSE
 */

/*jshint esversion: 6 */
/*jshint quotmark: false */
/*jshint white: false */
/*jshint trailing: false */
/*jshint newcap: false */

'use strict';

import React from 'react';
import BangumiRecommendView from '../components/bangumiRecommendView.jsx';
import BangumiDailyView from '../components/bangumiDailyView.jsx';
import BangumiIndexView from '../components/bangumiIndexView.jsx';


export default React.createClass({
    displayName: 'BangumiChannelView',
    render: function(){
        if(this.props.params.type && this.props.params.type=='recommend'){
            return (
                <BangumiRecommendView />
            );
        }
        if(this.props.params.type && this.props.params.type=='daily'){
            return (
                <BangumiDailyView />
            );
        }
        if(this.props.params.type && this.props.params.type=='index'){
            return (
                <BangumiIndexView />
            );
        }
        return (
            <div>
                bangumi channel view(serial/completed/domestic/extension)---{this.props.params.type}
            </div>
        )
    }
});
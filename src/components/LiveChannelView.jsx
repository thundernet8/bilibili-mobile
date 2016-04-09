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

window.app = window.app || {};

import Header from '../components/header.jsx';
import Footer from '../components/footer.jsx';

/*
 * 直播频道详情视图
 */
app.LiveChannelView = React.createClass({
    displayName: 'LiveChannelView',
    render: function (){
        return (
            <Header.HomeHeader />
        );
    }
});

export default app.LiveChannelView;
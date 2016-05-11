/**
 * Copyright 2016, WuXueqian
 * All right reserved.
 *
 * @author WuXueqian
 * @date 16/4/1 22:00
 * @license MIT LICENSE
 */

/*jshint esversion: 6 */
/*jshint quotmark: false */
/*jshint white: false */
/*jshint trailing: false */
/*jshint newcap: false */

'use strict';

let app = window.app || (window.app={});

import Header from '../components/header.jsx';
import Footer from '../components/footer.jsx';

/*
 * 视频详情视图
 */
app.VideoDetailView = React.createClass({
    displayName: 'VideoDetailView',
    render: function (){
        return (
            <Header.HomeHeader />
        );
    }
});

window.app = app;

export default app.VideoDetailView;
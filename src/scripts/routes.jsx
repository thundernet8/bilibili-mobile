/**
 * Copyright 2016, WuXueqian
 * All right reserved.
 *
 * @author WuXueqian
 * @date 16/4/2 15:51
 * @license MIT LICENSE
 */

/*jshint esversion: 6 */
/*jshint quotmark: false */
/*jshint white: false */
/*jshint trailing: false */
/*jshint newcap: false */

'use strict';

import {Router, Route, hashHistory, browserHistory} from 'react-router';

import App from '../components/app.jsx';
import GeneralView from '../components/generalView.jsx';
import VideoDetailView from '../components/videoDetailView.jsx';
import TopicDetailView from '../components/topicDetailView.jsx';
import LiveChannelView from '../components/liveChannelView.jsx';
import RegionView from '../components/regionView.jsx';
import Tab from '../components/tab.jsx';
import BackForward from '../components/backForward.jsx';

//APP路由
let routes = (
    <Router history={hashHistory}>
        <Route name="app" component={App}>
            <Route name="generalView" component={GeneralView}>
                <Route name="homeTab" path="/" component={Tab.HomeTab} />
                <Route name="focusTab" path="/focus" component={Tab.FocusTab} />
                <Route name="findTab" path="/find" component={Tab.FindTab} />
                <Route name="meTab" path="/me" component={Tab.MeTab} />
            </Route>
            <Route name="videoDetailView" path="/video/:id" component={VideoDetailView} />
            <Route name="topic" path="/article/:id" component={TopicDetailView} />
            <Route name="liveChannel" path="/live/channel/:id" component={LiveChannelView} />
            <Route name="region" path="/region/:name" component={RegionView} />
            <Route name="back" path="/backForward" component={BackForward} />
        </Route>
    </Router>
);

export default routes;
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

import LiveCategoryView from '../components/homeLiveCategoryView.jsx';

import BangumiChannelView from '../components/homeSegmentBangumiChannelView.jsx';
import BangumiRecommendView from '../components/homeSegmentBangumiRecommendView.jsx';
import BangumiDailyView from '../components/homeSegmentBangumiDailyView.jsx';
import BangumiIndexView from '../components/homeSegmentBangumiIndexView.jsx';
import BangumiCategoryView from '../components/homeBangumiCategoryView.jsx';
import BangumiCartoonCategoryView from '../components/homeBangumiCartoonCategoryView.jsx';

import RegionDetailView from '../components/homeeRegionDetailView.jsx';

import Tab from '../components/tab.jsx';

import BackForward from '../components/backForward.jsx';

//APP路由
let routes = (
    <Router history={hashHistory}>
        <Route name="app" component={App}>
            <Route name="generalView" component={GeneralView}>
                <Route name="homeTab" path="/" component={Tab.HomeTab}>
                    <Route name="liveCategory" path="/live/category/:slug" component={LiveCategoryView} />

                    <Route name="bangumi" path="/bangumi/:type" component={BangumiChannelView} />
                    {/*
                    <Route name="bangumi_recommend" path="/bangumi/recommend" component={BangumiRecommendView} />
                    <Route name="bangumi_daily" path="/bangumi/daily" component={BangumiDailyView} />
                    <Route name="bangumi_index" path="/bangumi/index" component={BangumiIndexView} />
                    */}
                    <Route name="bangumi_category" path="/bangumi/category/:id" component={BangumiCategoryView} />

                    <Route name="bangumi_cartoon" path="/bangumi/cartoon/:type" component={BangumiCartoonCategoryView} />

                    <Route name="region" path="/region/:slug" component={RegionDetailView} />

                </Route>
                <Route name="focusTab" path="/focus" component={Tab.FocusTab} />
                <Route name="findTab" path="/find" component={Tab.FindTab} />
                <Route name="meTab" path="/me" component={Tab.MeTab} />
            </Route>
            <Route name="videoDetailView" path="/video/:id" component={VideoDetailView} />
            <Route name="topic" path="/article/:id" component={TopicDetailView} />


            <Route name="back" path="/backForward" component={BackForward} />
        </Route>
    </Router>
);

export default routes;
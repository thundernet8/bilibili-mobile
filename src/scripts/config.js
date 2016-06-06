/**
 * Copyright 2016, WuXueqian
 * All right reserved.
 *
 * @author WuXueqian
 * @date 16/4/25 20:23
 * @license MIT LICENSE
 */

/*jshint esversion: 6 */
/*jshint quotmark: false */
/*jshint white: false */
/*jshint trailing: false */
/*jshint newcap: false */

'use strict';

let app = window.app || {};

app.Config = {
    APIType: 'json',
    bangumiTagsAPIJSON: 'test/api/bangumi/tags.json?_=_',
    bangumiTagsAPIUrl: 'http://bangumi.bilibili.com/api/tags?actionKey=appkey&appkey=27eb53fc9058f8c3&build=101130&device=phone&platform=ios&sign=94d9ebfe9a568d0238c78d93fc4c7edb&ts=1461582368',
    bangumiTagsPerPage: 30,
    bangumiIndexAPIJSON: 'test/api/bangumi/index_page.json',
    bangumiIndexAPIUrl: '',
    liveHomeAPIJSON: 'test/api/live/home.json',
    liveHomeAPIUrl: 'http://live.bilibili.com/mobile/home?actionKey=appkey&appkey=27eb53fc9058f8c3&build=101130&device=phone&platform=ios&scale=2&sign=079a5f6d575506d0fedf59afa13dea04&ts=1461582272',
    liveCategoriesAPIJSON: 'test/api/live/categories.json',
    liveCategoryAPIJSON: 'test/api/live/category/',
    bangumiCategoryAPIJSON: 'test/api/bangumi/tag/',
    bangumiCategoryVideosPerPage: 30,
    bangumiCartoonAPIJSON: 'test/api/bangumi/cartoon/',

    regionDetailAPIJSON: 'test/api/region/',

    videoDetailAPIJSON: 'test/api/video/aid.json',
    videoSourceAPIJSON: 'test/api/video/cid.json'
};

window.app = app;

export default app.Config;
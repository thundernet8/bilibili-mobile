/**
 * Copyright 2016, WuXueqian
 * All right reserved.
 *
 * @author WuXueqian
 * @date 16/3/31 18:29
 * @license MIT LICENSE
 */

/*jshint esversion: 6 */
/*jshint quotmark: false */
/*jshint white: false */
/*jshint trailing: false */
/*jshint newcap: false */

'use strict';

let app = window.app || {};

import Header from '../components/header.jsx';
import TabBar from '../components/tabBar.jsx';

/*
 * 首屏视图,包含各个Tab
 */
app.GeneralView = React.createClass({
    displayName: 'GeneralView',
    render: function (){
        return this.props.children;
    }
});

window.app = app;

export default app.GeneralView;
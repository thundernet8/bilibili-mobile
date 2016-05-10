/**
 * Copyright 2016, WuXueqian
 * All right reserved.
 *
 * @author WuXueqian
 * @date 16/5/9 21:54
 * @license MIT LICENSE
 */

/*jshint esversion: 6 */
/*jshint quotmark: false */
/*jshint white: false */
/*jshint trailing: false */
/*jshint newcap: false */

'use strict';

import React from 'react';


let Widget;

Widget.Loading = React.createClass({
    displayName: 'LoadingWidget',
    render: function(){
        return (
            <div className="loading widget"><i className="fa fa-spinner" /><span className="loading-text">正在加载中...</span></div>
        );
    }
});

Widget.LoadError = React.createClass({
    displayName: 'LoadErrorWidget',
    render: function(){
        return (
            <div className="error loadError widget">an error occurred</div> //TODO
        );
    }
});

export default Widget;
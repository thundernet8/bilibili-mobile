/**
 * Copyright 2016, WuXueqian
 * All right reserved.
 *
 * @author WuXueqian
 * @date 16/4/2 16:29
 * @license MIT LICENSE
 */

/*jshint esversion: 6 */
/*jshint quotmark: false */
/*jshint white: false */
/*jshint trailing: false */
/*jshint newcap: false */

'use strict';

let app = window.app || (window.app={});

import React from 'react';

app.BackForward = React.createClass({
    displayName: 'BackForward',
    render: function (){
        history.go(-2);
        return (<div></div>);
    }
});

window.app = app;

export default app.BackForward;
/**
 * Copyright 2016, WuXueqian
 * All right reserved.
 *
 * @author WuXueqian
 * @date 16/4/2 16:00
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

app.Root = React.createClass({
    displayName: 'Root',
    render: function () {
        return (
            <div id="app">{this.props.children}</div>
        );
    }
});

window.app = app;

export default app.Root;
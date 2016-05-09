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

Widget.LoadError = React.createClass({
    displayName: 'LoadErrorWidget',
    render: function(){
        return (
            <div className="error loadError">an error occurred</div> //TODO
        );
    }
});

export default Widget;
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

//APP Entry

import jQuery from 'jquery';
import React from  'react';
import {render} from 'react-dom';
import routes from './routes.jsx';

jQuery(document).ready(function (){
    'use strict';

    render(routes, document.getElementById('content'));

    setTimeout(function (){
        jQuery('#launch').fadeOut(1000);
    }, 2000);
});
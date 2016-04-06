/**
 * Copyright 2016, WuXueqian
 * All right reserved.
 *
 * @author WuXueqian
 * @date 16/4/6 18:55
 * @license MIT LICENSE
 */

/*jshint esversion: 6 */
/*jshint quotmark: false */
/*jshint white: false */
/*jshint trailing: false */
/*jshint newcap: false */


'use strict';

window.app = window.app || {};

app.Utils = {
    store: function (namespace, data){
        if(data){
            return localStorage.setItem(namespace, JSON.stringify(data));
        }

        let store = localStorage.getItem(namespace);
        return (store && JSON.parse(store)) || {};
    }
};

export default app.Utils;
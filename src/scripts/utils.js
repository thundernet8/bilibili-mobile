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
    },

    getDateStr: function(timestamp){
        const date = new Date(parseInt(timestamp)*1000);
        const now = new Date();
        const refDate = new Date(now.getFullYear()+now.getMonth()+now.getDate()+' UTC+8');
        const diffTime = date-refDate;
        if(diffTime<-1*24*3600*1000){
            return ('0'+date.getMonth()).slice(-2)+'-'+('0'+date.getDate()).slice(-2)+' '+('0'+date.getHours()).slice(-2)+':'+('0'+date.getMinutes()).slice(-2);
        }else if(diffTime<0){
            return '昨天 '+('0'+date.getHours()).slice(-2)+':'+('0'+date.getMinutes()).slice(-2);
        }else if(diffTime<6*3600*1000){
            return '凌晨 '+('0'+date.getHours()).slice(-2)+':'+('0'+date.getMinutes()).slice(-2);
        }else if(diffTime<12*3600*1000){
            return '上午 '+('0'+date.getHours()).slice(-2)+':'+('0'+date.getMinutes()).slice(-2);
        }else if(diffTime<18*3600*1000){
            return '下午 '+('0'+(date.getHours()-12)).slice(-2)+':'+('0'+date.getMinutes()).slice(-2);
        }else{
            return '晚上 '+('0'+(date.getHours()-12)).slice(-2)+':'+('0'+date.getMinutes()).slice(-2);
        }
    }
};

export default app.Utils;
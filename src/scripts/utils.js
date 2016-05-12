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

let app = window.app || (window.app={});

app.Utils = {
    /**
     * 利用本地存储实现配置等数据持久化
     */
    store: function (namespace, data){
        if(data){
            return localStorage.setItem(namespace, JSON.stringify(data));
        }

        let store = localStorage.getItem(namespace);
        return (store && JSON.parse(store)) || {};
    },

    /**
     * 将时间戳转换为特定的日期字符串
     */
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
    },

    /**
     * 应用状态Setter
     */
    setStatus: function(property, value){
        let status = app.Status || {};

        //inform
        //if(status[property]!=value){
        //    app.Utils.inform(property, value);
        //}
        app.Utils.inform(property, value);

        status[property] = value;
        app.Status = status;

        //debug
        console.warn('Set App Status->key: '+property+', value: '+value);
    },

    /**
     * 事件订阅与通知
     */
    subscribe: function(key, callback){
        let callbacks = app.Callbacks || {};
        callbacks[key] = callbacks[key] || [];
        callbacks[key].push(callback);

        //app.callbacks = Array.from(new Set(callbacks));
        app.Callbacks = callbacks; //允许重复事件
    },

    inform: function(key, value){
        let keyCallbacks = (app.Callbacks || {})[key] || [];
        if(!keyCallbacks.length) return;
        keyCallbacks.forEach((cb)=>cb(value));

        //debug
        console.warn('Inform event for key: '+key);
    },

    /**
     * 数字单位格式转换-进'万'单位
     */
    formatTenThousandNum: function(num){
        return parseInt(num)<10000 ? num.toString() : (parseInt(num)/10000).toFixed(1)+'万';
    }

};

window.app = app;

export default app.Utils;
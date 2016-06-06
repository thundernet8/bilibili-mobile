/**
 * Copyright 2016, WuXueqian
 * All right reserved.
 *
 * @author WuXueqian
 * @date 16/5/17 22:10
 * @license MIT LICENSE
 */

/*jshint esversion: 6 */
/*jshint quotmark: false */
/*jshint white: false */
/*jshint trailing: false */
/*jshint newcap: false */

"use strict";

//import videoJs from 'videojs';
import CommentManager from 'comment-manager'; //开源弹幕管理器
import BilibiliParser from 'bilibili-parser';

export default {
    //给 video.js视频播放注册弹幕插件http://docs.videojs.com/docs/guides/plugins.html
    load: function(player){
        videojs.plugin('danmuPlugin', function(options){
            function Danmu(ele){
                let self = this;
                this.danmuDiv = document.createElement('div');
                this.danmuDiv.className = 'vjs-danmu';
                ele.el().insertBefore(this.danmuDiv, ele.el().getElementsByClassName('vjs-poster')[0]);

                this.danmuShowControl = document.createElement('div');
                this.danmuShowControl.className = 'vjs-danmu-control vjs-menu-button vjs-control';
                this.danmuShowControlContent = document.createElement('i');
                this.danmuShowControlContent.className = 'fa fa-align-right';
                this.danmuShowControl.appendChild(this.danmuShowControlContent);
                ele.el().getElementsByClassName('vjs-control-bar')[0].appendChild(this.danmuShowControl);

                if(typeof CommentManager !== "undefined"){
                    this.cmManager = new CommentManager(this.danmuDiv);
                    this.cmManager.display = true;
                    this.cmManager.init();
                    this.cmManager.clear();

                    //弹幕控制绑定
                    let video = ele.el().children[0];
                    let lastPosition = 0;
                    video.addEventListener("progress", function () {
                        if (lastPosition == video.currentTime) {
                            video.hasStalled = true;
                            self.cmManager.stopTimer();
                        } else
                            lastPosition = video.currentTime;
                    });

                    //时间轴更新
                    video.addEventListener("timeupdate", function () {
                        if (self.cmManager.display === false) return;
                        if (video.hasStalled) {
                            self.cmManager.startTimer();
                            video.hasStalled = false;
                        }
                        self.cmManager.time(Math.floor(video.currentTime * 1000));
                    });

                    video.addEventListener("play", function () {
                        self.cmManager.startTimer();
                    });

                    video.addEventListener("pause", function () {
                        self.cmManager.stopTimer();
                    });

                    video.addEventListener("waiting", function () {
                        self.cmManager.stopTimer();
                    });

                    video.addEventListener("playing", function () {
                        self.cmManager.startTimer();
                    });

                    video.addEventListener("seeked", function () {
                        self.cmManager.clear();
                    });

                    if (window) {
                        window.addEventListener("resize", function () {
                            self.cmManager.setBounds();
                        });
                    }

                    //绑定控制按钮
                    this.danmuShowControl.addEventListener("click", function () {
                        if (self.cmManager.display == true) {
                            self.cmManager.display = false;
                            self.cmManager.clear();
                            self.danmuShowControlContent.setAttribute("class", "fa fa-close");
                        } else {
                            self.cmManager.display = true;
                            self.danmuShowControlContent.setAttribute("class", "fa fa-align-right");
                        }
                    });

                    //load函数实体
                    this.load = function (url, callback) {
                        if (callback == null)
                            callback = function () {
                                return;
                            };
                        var xmlhttp;
                        if (window.XMLHttpRequest) {
                            xmlhttp = new XMLHttpRequest();
                        }
                        else {
                            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
                        }
                        xmlhttp.open("GET", url, true);
                        xmlhttp.send();
                        var cm = this.cmManager;
                        var cmvideo = video;
                        xmlhttp.onreadystatechange = function () {
                            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                                if (navigator.appName == 'Microsoft Internet Explorer') {
                                    var f = new ActiveXObject("Microsoft.XMLDOM");
                                    f.async = false;
                                    f.loadXML(xmlhttp.responseText);
                                    cm.load(BilibiliParser(f));
                                    cm.seek(cmvideo.currentTime * 1000);
                                    callback(true);
                                } else {
                                    cm.seek(cmvideo.currentTime * 1000);
                                    cm.load(BilibiliParser(xmlhttp.responseXML));
                                    callback(true);
                                }
                            } else
                                callback(false);
                        }
                    }

                }

                return this;
            }

            this.danmu = new Danmu(options.player);
        });
        player.danmuPlugin({player: player});
    }
};
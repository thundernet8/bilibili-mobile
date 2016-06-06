/**
 * Copyright 2016, WuXueqian
 * All right reserved.
 *
 * @author WuXueqian
 * @date 16/5/17 21:42
 * @license MIT LICENSE
 */

/*jshint esversion: 6 */
/*jshint quotmark: false */
/*jshint white: false */
/*jshint trailing: false */
/*jshint newcap: false */

"use strict";

import React from 'react';
import ReactDom from 'react-dom';
//import videoJs from 'videojs';
import videoPlugin from '../scripts/videoPlugin';
import cx from 'classnames';

const _forEach = require('lodash-compat/collection/forEach');
const _debounce = require('lodash-compat/function/debounce');
const _defaults = require('lodash-compat/object/defaults');

const DEFAULT_VIDEO_WIDTH = 480;
const DEFAULT_VIDEO_HEIGHT = 360;
const DEFAULT_VIDEO_ASPECT_RATIO = 3/4;
const DEFAULT_ADJUSTED_SIZE = 0;
const DEFAULT_RESIZE_DEBOUNCE_TIME = 500;

const DEFAULT_VIDEO_OPTIONS = {
    preload: 'auto',
    autoplay: false,
    controls: true
};

function noop(){

}

export default React.createClass({
    displayName: 'VideoPlayer',
    propTypes: {
        src: React.PropTypes.string.isRequired,
        width: React.PropTypes.number,
        height: React.PropTypes.number,
        endlessMode: React.PropTypes.bool,
        options: React.PropTypes.object,
        onReady: React.PropTypes.func,
        eventListeners: React.PropTypes.object,
        resize: React.PropTypes.bool,
        resizeOptions: React.PropTypes.shape({
            aspectRatio: React.PropTypes.number,
            shortWindowVideoHeightAdjustment: React.PropTypes.number,
            defaultVideoWidthAdjustment: React.PropTypes.number,
            debounceTime: React.PropTypes.number
        }),
        videoJsDefaultSkin: React.PropTypes.bool,
        videoJsBigPlayCentered: React.PropTypes.bool,
        children: React.PropTypes.element,
        dispose: React.PropTypes.bool,
        onNextVideo: React.PropTypes.func
    },
    getDefaultProps: function(){
        return {
            endlessMode: false,
            options: DEFAULT_VIDEO_OPTIONS,
            onReady: noop,
            eventListeners: {},
            resize: true,
            resizeOptions: {},
            videoJsDefaultSkin: true,
            videoJsBigPlayCentered: true,
            onNextVideo: noop
        }
    },
    componentDidMount: function(){
        this.mountVideoPlayer();
    },
    componentWillReceiveProps: function(nextProps){
        let isEndless = this.props.endlessMode;
        let willBeEndless = nextProps.endlessMode;

        if (isEndless !== willBeEndless) {
            if (willBeEndless) {
                this.addEndlessMode();
            } else {
                this.removeEndlessMode();
            }
        }

        let isResizable = this.props.resize;
        let willBeResizeable = nextProps.resize;

        if (isResizable !== willBeResizeable) {
            if (willBeResizeable) {
                this.addResizeEventListener();
            } else {
                this.removeResizeEventListener();
            }
        }

        let currentSrc = this.props.src;
        let newSrc = nextProps.src;
        if (currentSrc !== newSrc) {
            this.setVideoPlayerSrc(newSrc);
        } else if (isEndless === willBeEndless) {
            this.restartVideo();
        }
    },
    shouldComponentUpdate: function(){
        return false;
    },
    componentWillUnmount: function(){
        this.unmountVideoPlayer();
    },
    mountVideoPlayer: function(){
        var src = this.props.src;
        var danmu = this.props.danmu;

        var options = this.getVideoPlayerOptions();

        this._player = videojs(this.getVideoPlayerElement(), options);

        var player = this._player;

        //弹幕插件
        videoPlugin.load(player);

        player.ready(this.handleVideoPlayerReady);
        _forEach(this.props.eventListeners, function (val, key) {
            player.on(key, val);
        });
        if (this.props.poster) {
            player.poster(this.props.poster);
        }
        if (this.props.endlessMode) {
            this.addEndlessMode();
        }

        //资源加载
        player.src(src);
        //player.ABP();
        player.danmu.load(danmu);
    },
    unmountVideoPlayer: function(){
        this.removeResizeEventListener();
        this._player.dispose();
    },
    setVideoPlayerSrc: function(src){
        this._player.src(src);
    },
    addEndlessMode: function(){
        let player = this._player;
        player.on('ended', this.handleNextVideo);
        if (player.ended()) {
            this.handleNextVideo();
        }
    },
    removeEndlessMode: function () {
        let player = this._player;
        player.off('ended', this.handleNextVideo);
    },
    pauseVideo: function () {
        this._player.pause();
    },
    playVideo: function () {
        this._player.play();
    },
    restartVideo: function () {
        this._player.currentTime(0).play();
    },
    togglePauseVideo: function () {
        if (this._player.paused()) {
            this.playVideo();
        } else {
            this.pauseVideo();
        }
    },
    handleVideoPlayerReady: function () {
        if (this.props.resize) {
            this.handleVideoPlayerResize();
            this.addResizeEventListener();
        }
        this.props.onReady();
    },
    _windowHeight: function(){
        return window.innerHeight;
    },
    _videoElementWidth: function(){
        return this.getVideoPlayerElement().parentElement.parentElement.offsetWidth;
    },
    getVideoPlayer: function(){
        return this._player;
    },
    getVideoPlayerElement: function(){
        return ReactDom.findDOMNode(this.refs.videoPlayer);
    },
    getVideoPlayerOptions: function(){
        return _defaults({}, this.props.options, {
            //height: this.props.resize ? 'auto' : (this.props.height || DEFAULT_VIDEO_HEIGHT),
            //width: this.props.resize ? 'auto' : (this.props.width || DEFAULT_VIDEO_WIDTH)
        }, DEFAULT_VIDEO_OPTIONS);
    },
    getVideoResizeOptions: function(){
        return _defaults({}, this.props.resizeOptions, {
            aspectRatio: DEFAULT_VIDEO_ASPECT_RATIO,
            shortWindowVideoHeightAdjustment: DEFAULT_ADJUSTED_SIZE,
            defaultVideoWidthAdjustment: DEFAULT_ADJUSTED_SIZE,
            debounceTime: DEFAULT_RESIZE_DEBOUNCE_TIME
        });
    },
    getResizedVideoPlayerMeasurements: function(){
        const resizeOptions = this.getVideoResizeOptions();
        const aspectRatio = resizeOptions['aspectRatio'];
        const defaultVideoWidthAdjustment = resizeOptions['defaultVideoWidthAdjustment'];
        const windowHeight = this._windowHeight();
        const baseWidth = this._videoElementWidth();
        const videoWidth = baseWidth - defaultVideoWidthAdjustment;
        let videoHeight = videoWidth * aspectRatio;

        if(windowHeight < videoHeight){
            const shortWindowVideoHeightAdjustment = resizeOptions['shortWindowVideoHeightAdjustment'];
            videoHeight = windowHeight - shortWindowVideoHeightAdjustment;
        }
        return{
            width: videoWidth,
            height: videoHeight
        }
    },
    addResizeEventListener: function(){
        const debounceTime = this.getVideoResizeOptions().debounceTime;
        this._handleVideoPlayerResize = _debounce(this.handleVideoPlayerResize, debounceTime);
        window.addEventListener('resize', this._handleVideoPlayerResize);
    },
    removeResizeEventListener: function(){
        window.removeEventListener('resize', this._handleVideoPlayerResize);
    },
    handleVideoPlayerResize: function(){
        const player = this._player;
        const videoMeasurements = this.getResizedVideoPlayerMeasurements();
        player.dimensions(videoMeasurements.width, videoMeasurements.height);
        player.danmu.cmManager.setBounds();
    },
    handleNextVideo: function(){
        this.props.onNextVideo();
    },
    renderDefaultWarning: function(){
        return (
            <p class="vjs-no-js">浏览器不支持HTML5</p>
        );
    },
    render: function(){
        var videoPlayerClasses = cx({
            'video-js': true,
            'vjs-default-skin': this.props.vjsDefaultSkin,
            'vjs-big-play-centered': this.props.vjsBigPlayCentered
        });
        return (
            <video ref="videoPlayer" className={videoPlayerClasses}>
                {this.props.children || this.renderDefaultWarning()}
            </video>
        );
    }
});

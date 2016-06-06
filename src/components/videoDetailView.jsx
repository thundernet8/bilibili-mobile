/**
 * Copyright 2016, WuXueqian
 * All right reserved.
 *
 * @author WuXueqian
 * @date 16/4/1 22:00
 * @license MIT LICENSE
 */

/*jshint esversion: 6 */
/*jshint quotmark: false */
/*jshint white: false */
/*jshint trailing: false */
/*jshint newcap: false */

'use strict';

let app = window.app || (window.app={});

import Header from '../components/header.jsx';
import Footer from '../components/footer.jsx';
import Player from '../components/_videoPlayer.jsx';
import jQuery from 'jquery';
import Config from '../scripts/config';
import Widget from './widgets.jsx';

/*
 * 分集分页选择
 */
let Pagination = React.createClass({
    displayName: "VideoPagination",
    render: function(){
        let parts = this.props.parts;
        let nowPlay = this.props.now;
        let handler = this.props.handler;

        if(!parts || parts.length <= 1){
            return <div></div>;
        }

        let renderList = [];
        for(let i=0; i<parts.length; i++){
            let cid = parts[i].cid.toString();
            if (cid != nowPlay.toString()) {
                renderList.push({title: parts[i].part, link: cid});
            }
        }

        let data = {
            pages: renderList
        };

        let handleSelect = function(link, e){
            e.preventDefault();
            handler(link);
        };

        return (<div></div>); //TODO
    }
});

/*
 * 视频信息
 */
let VideoInfo = React.createClass({
    displayName: "VideoInfo",
    render: function(){
        let data = this.props.data;
        return (
            <section className="video-info">
                <div className="author">
                    <img className="avatar" src={data.face} />
                    <span className="author">{data.author}</span>
                </div>
                <h2>{data.title}</h2>
                <div className="meta">
                    <span className="play-count"><i className="fa fa-youtube-play" />{data.play}</span>
                    <span className="review"><i className="fa fa-eye" />{data.video_review}</span>
                    <span className="time"><i className="fa fa-clock-o" />{data.created_at}</span>
                </div>
                <p>{data.description}</p>
            </section>
        );
    }
});


/*
 * 视频模块
 */
let VideoMod = React.createClass({
    displayName: "VideoMod",
    getInitialState: function(){
        return {
            load: false,
            playerLoad: false,
            error: false,
            data: null,
            cid: null,
            videoUrl: null,
            danmuUrl: null,
            partList: [],
            width: null,
            height: null
        }
    },
    loadInfo: function(){
        const url = Config.videoDetailAPIJSON; //videoDetailAPIJSON+this.props.aid
        jQuery.ajax({
            method: 'get',
            url: url,
            context: this,
            success: function(data){
                let videoList = [];
                for (let i in data.list){
                    if(data.list.hasOwnProperty(i)){
                        videoList.push(data.list[i])
                    }
                }

                let video = videoList[0];
                this.setState({
                    cid: video.cid,
                    data: data,
                    load: true,
                    partList: videoList
                });
                this.loadVideo(video.cid, 1);
            },
            error: function(data){
                this.setState({
                    load: true,
                    error: true
                });
            }
        });
    },
    loadVideo: function(cid, quality){
        let width = 480;
        let height = 360;
        if(window.innerHeight){
            height = window.innerHeight * 0.7;
        }
        let element = document.getElementById('video-container');
        if(element){
            width = element.offsetWidth;
        }

        let url = Config.videoSourceAPIJSON; // 'video/' + cid + '/' +quality
        jQuery.ajax({
            method: 'get',
            url: url,
            context: this,
            success: function(data){
                this.setState({
                    width: width,
                    height: height,
                    videoUrl: data.url,
                    danmuUrl: 'http://comment.bilibili.com/' + cid + '.xml',
                    playerLoad: true
                });
            },
            error: function(){
                this.setState({
                    width: width,
                    height: height,
                    error: true,
                    playerLoad: true
                });
            }
        });
    },
    componentDidMount: function(){
        this.loadInfo();
    },
    handleClick: function(nav, index, e){
        if(nav && nav.subMenu){

        }else{
            e.preventDefault();
            if(index[0] == 0){
                this.loadVideo(this.state.cid, index[1] + 1);
            }
        }
    },
    partSelect: function(cid){
        this.setState({
            playerLoad: false
        });
        this.loadVideo(cid, 1);
    },
    render: function(){
        let data = [{
            link: '##',
            title: '清晰度',
            subCols: 3,
            subMenu: [{link: '##', title: '低清'}, {link: '##', title: '高清'}, {link: '##', title: '原画'}]
        }];
        if(this.state.error){
            return (
                <Widget.LoadError text="发生了一个错误~" />
            )
        }

        if(!this.state.load){
            return (
                <Widget.SpinLoading />
            )
        }

        return (
            <div>
                <Pagination parts={this.state.partList} now={this.state.cid} handler={this.partSelect} />
                {/* <AMUIReact.Menu cols={2} data={data} theme='dropdown2' onSelect={this.handleClick}/> */}
                {this.state.playerLoad ?
                    <Player src={this.state.videoUrl} width={this.state.width} height={this.state.height} danmu={this.state.danmuUrl} poster={this.state.data.pic} vjsBigPlayCentered={true} /> :
                    <Widget.SpinLoading />
                }
                <VideoInfo data={this.state.data} />
            </div>
        )
    }
});

/*
 * 视频详情视图
 */
app.VideoDetailView = React.createClass({
    displayName: 'VideoDetailView',
    componentWillMount: function(){
        const vjsStylePath = 'vender/css/videojs/5.10.4/video-js.min.css';
        const vjsScriptPath = 'vender/js/videojs/5.10.4/video.min.js';
        let head = document.getElementsByTagName('head')[0];
        let body = document.getElementsByTagName('body')[0];
        let style = document.createElement('link');
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', vjsStylePath);
        head.appendChild(style);
        let script = document.createElement('script');
        script.setAttribute('src', vjsScriptPath);
        body.appendChild(script);
    },
    render: function (){
        return (
            <div>
                <Header.VideoNaviController leftBtnIconClass="fa fa-angle-left" leftBtnPath="/backForward" />
                <div id="video-container" className="view-body video-view-body">
                    <VideoMod aid={this.props.params.aid} />
                </div>
            </div>
        );
    }
});

window.app = app;

export default app.VideoDetailView;
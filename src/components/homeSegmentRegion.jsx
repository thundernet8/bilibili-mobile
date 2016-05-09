/**
 * Copyright 2016, WuXueqian
 * All right reserved.
 *
 * @author WuXueqian
 * @date 16/4/11 22:31
 * @license MIT LICENSE
 */

/*jshint esversion: 6 */
/*jshint quotmark: false */
/*jshint white: false */
/*jshint trailing: false */
/*jshint newcap: false */

'use strict';

import React from 'react';
import {Link} from 'react-router';
import Utils from '../scripts/utils';


export default React.createClass({
    displayName: 'RegionList',
    shouldComponentUpdate: function(){
        return false;
    },
    render: function(){
        const gotoLiveRegion = function(){
            Utils.setStatus('homeTabSegmentIndex', 0);
        };
        const gotoBangumiRegion = function(){
            Utils.setStatus('homeTabSegmentIndex', 1);
        };
        return (
            <section id="region-items">
                <ul>
                    <li className="live"><a href="javascript:void 0" onClick={gotoLiveRegion}><div className="icon-bg"><i className="icon" /></div><span>直播</span></a></li>
                    <li className="bangumi"><a href="javascript:void 0" onClick={gotoBangumiRegion}><div className="icon-bg"><i className="icon" /></div><span>番剧</span></a></li>
                    <li className="cartoon"><Link to="/region/cartoon"><div className="icon-bg"><i className="icon" /></div><span>动画</span></Link></li>
                    <li className="music"><Link to="/region/music"><div className="icon-bg"><i className="icon" /></div><span>音乐</span></Link></li>
                    <li className="dance"><Link to="/region/dance"><div className="icon-bg"><i className="icon" /></div><span>舞蹈</span></Link></li>
                    <li className="game"><Link to="/region/game"><div className="icon-bg"><i className="icon" /></div><span>游戏</span></Link></li>
                    <li className="tech"><Link to="/region/tech"><div className="icon-bg"><i className="icon" /></div><span>科技</span></Link></li>
                    <li className="entertainment"><Link to="/region/entertainment"><div className="icon-bg"><i className="icon" /></div><span>娱乐</span></Link></li>
                    <li className="guichu"><Link to="/region/guichu"><div className="icon-bg"><i className="icon" /></div><span>鬼畜</span></Link></li>
                    <li className="movie"><Link to="/region/movie"><div className="icon-bg"><i className="icon" /></div><span>电影</span></Link></li>
                    <li className="tv"><Link to="/region/tv"><div className="icon-bg"><i className="icon" /></div><span>电视剧</span></Link></li>
                    <li className="fashion"><Link to="/region/fashion"><div className="icon-bg"><i className="icon" /></div><span>时尚</span></Link></li>
                    {/* <li className="gamecenter"><Link to="/region/gamecenter"><div className="icon-bg"><i className="icon" /></div><span>游戏中心</span></Link></li> */}
                </ul>
            </section>
        );
    }

});
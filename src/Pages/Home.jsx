import * as React from 'react';
import {Header} from './components/header';
import {FeedSelector} from './components/feedSelector';
import { useState } from 'react';

export const Home = () => {
    const feeds = ['Global feed', 'Some other feed'];
    const [activeFeed, setActiveFeed] = useState(feeds[0]);
    return <div className="home-page">
        <Header/>
        <div className="container page">
            <div className="row">

                <div className="col-md-9">
                    <FeedSelector feeds={feeds} activeFeed={activeFeed} selectFeed={setActiveFeed}/>

                    <div className="article-preview">
                        <div className="article-meta">
                            <a href="profile.html"><img src="http://i.imgur.com/Qr71crq.jpg"/></a>
                            <div className="info">
                                <a href="" className="author">Eric Simons</a>
                                <span className="date">January 20th</span>
                            </div>
                            <button className="btn btn-outline-primary btn-sm pull-xs-right">
                                <i className="ion-heart"></i> 29
                            </button>
                        </div>
                        <a href="" className="preview-link">
                            <h1>How to build webapps that scale</h1>
                            <p>This is the description for the post.</p>
                            <span>Read more...</span>
                        </a>
                    </div>

                    <div className="article-preview">
                        <div className="article-meta">
                            <a href="profile.html"><img src="http://i.imgur.com/N4VcUeJ.jpg"/></a>
                            <div className="info">
                                <a href="" className="author">Albert Pai</a>
                                <span className="date">January 20th</span>
                            </div>
                            <button className="btn btn-outline-primary btn-sm pull-xs-right">
                                <i className="ion-heart"></i> 32
                            </button>
                        </div>
                        <a href="" className="preview-link">
                            <h1>The song you won't ever stop singing. No matter how hard you try.</h1>
                            <p>This is the description for the post.</p>
                            <span>Read more...</span>
                        </a>
                    </div>

                </div>

                <div className="col-md-3">
                    <div className="sidebar">
                        <p>Popular Tags</p>

                        <div className="tag-list">
                            <a href="" className="tag-pill tag-default">programming</a>
                            <a href="" className="tag-pill tag-default">javascript</a>
                            <a href="" className="tag-pill tag-default">emberjs</a>
                            <a href="" className="tag-pill tag-default">angularjs</a>
                            <a href="" className="tag-pill tag-default">react</a>
                            <a href="" className="tag-pill tag-default">mean</a>
                            <a href="" className="tag-pill tag-default">node</a>
                            <a href="" className="tag-pill tag-default">rails</a>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    </div>
}

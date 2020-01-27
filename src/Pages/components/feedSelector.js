import 'react';
import * as React from 'react';

export const FeedSelector = ({feeds, activeFeed, selectFeed}) => {
    const createSelectFeed = feed => e => {
        e.preventDefault();
        selectFeed(feed);
    };

    return <div className="feed-toggle">
        <ul className="nav nav-pills outline-active">
            {feeds.map(feed => (
                <li className="nav-item" key={feed} >
                    <a
                        className={"nav-link " + (activeFeed === feed ? 'active': '')}
                       href="/"
                        onClick={createSelectFeed(feed)}
                    >{feed}</a>
                </li>
            ))}
        </ul>
    </div>
}

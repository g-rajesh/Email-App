import React from 'react'

import ContentImage from '../../images/content.png';
import './Content.css';

const Content = ({user}) => {

    if(!user) {
        return <div className="info">
            <img src={ContentImage} alt="email" />
            <h1>Select an email to view the contents</h1>
        </div>
    }
    
    return (
        <div className="contents">
            <h2>{user.name}</h2>
            {/* <h3>{user.subject}</h3> */}
            <p>{user.email}</p>
        </div>
    )
}

export default Content;

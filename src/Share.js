import React from "react";
import webShare from 'react-web-share-api';
 
const Button = ({ share, isSupported }) => isSupported
    ? <button onClick={share}>Share now!</button>
    : <span>Web Share not supported</span>;
 
export default webShare(Button);
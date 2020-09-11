import React, {Component} from 'react';
import NavBar from "../navBar/NavBar";
import {
    useParams,
} from "react-router-dom";
 export default function TopicInfo(props) {

        let { auth,id,  topic_name } = props;
    let {Id}= useParams();
    console.log("id", Id);
        return (
            <div>
                <NavBar/>
                <div className="my-3 p-3 bg-white rounded shadow-sm">
                    <h6 className="border-bottom border-gray pb-2 mb-0">{topic_name}</h6>
                    <div className="media text-muted pt-3">
                        <svg className="bd-placeholder-img mr-2 rounded" width="32" height="32"
                             xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false"
                             role="img" aria-label="Placeholder: 32x32"><title>Placeholder</title>
                            <rect width="100%" height="100%" fill="#007bff"></rect>
                            <text x="50%" y="50%" fill="#007bff" dy=".3em">32x32</text>
                        </svg>
                        <p className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                            <strong className="d-block text-gray-dark">{auth}</strong>
                            Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo,
                            tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.
                        </p>
                    </div>
                </div>
            </div>
        );

}


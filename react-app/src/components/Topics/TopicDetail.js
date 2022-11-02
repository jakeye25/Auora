import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { thunkGetAllTopic } from "../../store/topic";
import './TopicDetail.css'
import TopicList from "./TopicList";


function TopicDetail() {
    const topics = useSelector((state) => state.topic)
    const dispatch = useDispatch()
    const {topicName} = useParams()

    useEffect(() => {
        dispatch(thunkGetAllTopic())
    },[dispatch])

    let alltopics = Object.values(topics)
    console.log("topics ", alltopics)

    let topicArr = alltopics.filter(element => element.name==topicName)
    console.log('topicarr', topicArr)

    let indTopic = topicArr[0]
    let indTopicques = topicArr[0]?.questions


    if(!indTopicques){
        return(
            <h1>No such questions</h1>
        )
    }


    return(
        <div id="indtopic-container">
            <div className="indtopic-topiclist-container">
                <TopicList/>
            </div>
            <div>
                <img
                src={indTopic?.topicimage}
                alt='pic'></img>
                <div>{indTopic?.name}</div>
            </div>
            {indTopicques &&
                    indTopicques?.map((topic) => (
                    <div key = {topic.id} className='indtopic-container'>
                        <NavLink className='topiclink'
                        to = {`/questions/${topic?.id}`}
                        >
                            <div className="topicname">
                                {topic?.questioncontent}
                            </div>
                        </NavLink>
                        <NavLink className='topiclink'
                        to = {`/questions/${topic?.id}`}
                        >
                            <div className="topicname">
                                {topic?.answers.length} answers
                            </div>
                        </NavLink>
                        {topic?.questionimage &&(<NavLink className='topiclink'
                        to = {`/questions/${topic?.id}`}
                        >
                            <img src={topic?.questionimage}
                            alt='pic'></img>


                        </NavLink>)}
                        </div>
                ))}
        </div>
    )


}

export default TopicDetail

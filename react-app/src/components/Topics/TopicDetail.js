import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { thunkGetAllTopic } from "../../store/topic";



function TopicDetail() {
    const topics = useSelector((state) => state.topic)
    const dispatch = useDispatch()
    const {topicName} = useParams()

    useEffect(() => {
        dispatch(thunkGetAllTopic())
    },[dispatch])

    let alltopics = Object.values(topics)
    console.log("topics ", alltopics)

    let a = alltopics.filter(element => element.name==topicName)
    console.log('topicname', a)


    let b = a[0]?.questions
    console.log('questionsArr', b)

    if(!b){
        return(
            <h1>No such questions</h1>
        )
    }


    return(
        <div id="topic-container">
            {b &&
                    b?.map((topic) => (
                    <div key = {topic.id} className='indtopic-container'>
                        <NavLink className='topiclink'
                        to = {`/questions/${topic?.id}`}
                        >
                        {/* {topic?.topicimage? <div><img
                        className="topicimg"
                        src={topic?.topicimage}
                        alt="img"></img></div> :<div></div>} */}
                            <br></br>

                            <div className="topicname">
                                &nbsp; {topic?.questioncontent}
                            </div>
                        </NavLink>
                        </div>
                ))}
        </div>
    )


}

export default TopicDetail

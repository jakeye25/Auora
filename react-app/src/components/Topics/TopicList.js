import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { thunkGetAllTopic } from "../../store/topic";


function TopicList() {
    const topics = useSelector((state) => state.topic)
    const dispatch = useDispatch()

    let alltopics = Object.values(topics)
    console.log("topics ", alltopics)

    useEffect(() => {
        dispatch(thunkGetAllTopic())
    },[dispatch])

    return(
        <div>
            {alltopics &&
                    alltopics.map((topic) => (
                    <div key = {topic.id}>
                        <NavLink
                        to = {`/topics/${topic?.id}`}
                        >
                            <div>
                                {topic?.name}
                            </div>
                        </NavLink>
                        {topic?.topicimage? <div><img
                        src={topic?.topicimage}
                        alt="img"></img></div> :<div></div>}
                        </div>
                ))}
        </div>
    )
}


export default TopicList

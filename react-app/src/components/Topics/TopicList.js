import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { thunkGetAllTopic } from "../../store/topic";

function TopicList() {
    const topics = useSelector((state) => state.topic)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(thunkGetAllTopic())
    },[dispatch])

    return(
        <div>
            <h1>Topiclist</h1>
        </div>
    )
}


export default TopicList

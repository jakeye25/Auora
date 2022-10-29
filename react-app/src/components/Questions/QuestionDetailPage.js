import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetOneQuestion } from "../../store/question";


function QuestionDetailPage() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector((state) => state)
    const question = useSelector((state) => state.question[id])
    const answer = useSelector((state) => state.answer)

    useEffect(() => {
        dispatch(thunkGetOneQuestion(id));

    }, [dispatch, id])

    return (
        <>
            <h1>Testing question detail page</h1>


        </>
    )


}

export default QuestionDetailPage

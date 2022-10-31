import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import { thunkGetCurrentAnswer } from "../../store/answer";


function MyAnswerListings() {

    const dispatch = useDispatch()

    const user = useSelector(state => state.session.user)
    const history=useHistory()
    const currentAnswer = useSelector(state => state.answer)

    const currentAnswerArr = Object.values(currentAnswer)

    const answerfilter = currentAnswerArr.filter(answer => answer?.userId === user?.id);

    useEffect(() => {
        // dispatch(thunkGetAllProduct())
        dispatch(thunkGetCurrentAnswer())
    }, [dispatch])

    if (!user) history.push('/')

    return (
        <div>
            answers
        </div>
    )

}

export default MyAnswerListings

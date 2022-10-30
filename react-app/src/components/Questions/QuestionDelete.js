import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { thunkDeleteQuestion } from "../../store/question"


function QuestionDelete() {
    const dispatch = useDispatch()
    const history = useHistory()

    let question = useSelector((state) => state.question)

    const onClick = async (event) => {
        await dispatch(thunkDeleteQuestion(question.id))
        history.push('/home')
    }

    return (
        <div>
            deleteQuestion
        </div>
    )



}

export default QuestionDelete

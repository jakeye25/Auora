import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { thunkDeleteQuestion } from "../../store/question"


function QuestionDelete({question}) {
    const dispatch = useDispatch()
    const history = useHistory()

    // let question = useSelector((state) => state.question)

    const onClick = async (event) => {
        await dispatch(thunkDeleteQuestion(question.id))
        history.push('/home')
    }

    return (
        <div>
            <button className="delete_product_button" onClick={onClick}>Delete Question</button>
        </div>
    )



}

export default QuestionDelete

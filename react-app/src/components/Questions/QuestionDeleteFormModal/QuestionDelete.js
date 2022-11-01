import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { thunkDeleteQuestion } from "../../../store/question"
import './QuestionDelete.css'


function QuestionDelete({question, setShowModal}) {
    const dispatch = useDispatch()
    const history = useHistory()

    // let question = useSelector((state) => state.question)

    const onClick = async (event) => {
        await dispatch(thunkDeleteQuestion(question.id))
        history.push('/home')
    }

    return (
        <div >
            <div onClick={() => setShowModal(false)}>Cancel</div>
            <button className="delete_product_button" onClick={onClick}>Delete</button>
        </div>
    )



}

export default QuestionDelete

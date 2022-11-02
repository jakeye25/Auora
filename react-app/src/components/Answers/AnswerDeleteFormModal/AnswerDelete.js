import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { thunkDeleteAnswer } from "../../../store/answer"




function AnswerDelete({answer, setShowModal}) {
    const dispatch = useDispatch()
    const history = useHistory()

    // let question = useSelector((state) => state.question)

    const onClick = async (event) => {
        await dispatch(thunkDeleteAnswer(answer?.id))
        history.push('/myanswers')
    }

    return (
        <div><div onClick={() => setShowModal(false)}>Cancel</div>
            <button className="delete_product_button" onClick={onClick}>Delete Answer</button>
        </div>
    )



}

export default AnswerDelete

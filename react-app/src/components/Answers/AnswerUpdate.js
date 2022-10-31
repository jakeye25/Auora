import { useEffect, useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { thunkUpdateAnswer } from "../../store/answer";


function AnswerUpdate({answer}) {
    const history = useHistory();
    const dispatch = useDispatch();

    const questionId= answer?.questionId

    const [answercontent, setAnswercontent] = useState(answer?.answercontent)
    const [answerimage, setAnswerimage] = useState(answer?.answerimage)
    const [validations, setValidations] = useState([])

    useEffect(() => {
        const errors = []
        if (answercontent.length < 5 || answercontent.length > 1000) {
            errors.push('Please enter a valid Answer')
        }
        if (answerimage &&
            (!answerimage.includes("jpg") &&
                !answerimage.includes("png") &&
                !answerimage.includes("jpeg") &&
                !answerimage.includes("svg"))
        )
            errors.push("Please enter a valid url image");
        setValidations(errors)
    }, [answercontent, answerimage])

    const onSubmit = async (event) => {
        event.preventDefault();
        const payload = {
            questionId: questionId,
            answercontent,
            answerimage

        }

        let updatedAnswer = await dispatch(thunkUpdateAnswer(payload))

        if (updatedAnswer) {
            history.push('/home');
            // setShowModal(false)

        }
        // onClick=()=> setShowModal(false)
    }



}

export default AnswerUpdate

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { thunkCreateQuestion } from "../../store/question";


function QuestionCreate () {
    const history = useHistory()
    const dispatch = useDispatch()

    const [questioncontent, setQuestioncontent] = useState('')
    const [questionimage, setQuestionimage] = useState('')
    const [topicId, settopicId] = useState('')
    const [validations, setValidations] = useState([])

    useEffect(() => {
        const errors =[]
        if(questioncontent.length<5 || questioncontent.length>1000) {
            errors.push('Please enter a valid Question')
        }
        if(questionimage &&
            (!previewImage.includes("jpg") &&
            !previewImage.includes("png") &&
            !previewImage.includes("jpeg") &&
            !previewImage.includes("svg"))
            )
            errors.push("Please enter a valid url image");
        setValidations(errors)
    }, [questioncontent, questionimage])

    const onSubmit = async (event) => {
        event.preventDefault()
        const payload = {
            questioncontent,
            questionimage,
            topicId
        }

        let createdQuestion = await dispatch(thunkCreateQuestion(payload))

        if (createdQuestion) {
            history.push('/home')
        }
    }
    return(
        <>
        </>
    )



}

export default QuestionCreate;

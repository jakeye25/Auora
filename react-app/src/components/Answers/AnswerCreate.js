import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { thunkCreateAnswer } from "../../store/answer";

function AnswerCreate({ question }) {
    const dispatch = useDispatch()
    const questionId = question.id
    const history = useHistory()

    const user = useSelector((state) => state.session.user)

    const [answercontent, setAnswercontent] = useState('')
    const [answerimage, setAnaswerimage] = useState('')

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
        event.preventDefault()
        const payload = {
            questionId: questionId,
            answercontent,
            answerimage

        }

        let createdAnswer = await dispatch(thunkCreateAnswer(payload))

        if (createdAnswer) {
            history.push('/home');

        }
        // onClick=()=> setShowModal(false)
    }

    return (
        <div id="createanswer-container">
            <div>{user?.username}</div>
            <div>{question?.questioncontent}</div>
            <form className="create_product_form" onSubmit={onSubmit}>

                <div className="create_product_input">
                    <div className="create_product_text_box">
                        <div>Name</div>

                    </div>
                    <div>
                        <input
                            type="text"
                            name="questioncontent"
                            value={questioncontent}
                            className="create_product_input_inner"
                            onChange={(event) => setQuestioncontent(event.target.value)}
                            required
                        ></input>
                    </div>
                </div>

                <div className="create_product_input">
                    <div className="create_product_text_box">
                        <div>Image</div>
                        <div className="create_product_small_text">
                            Add a url photo so buyers can see the product
                        </div>
                    </div>
                    <div>
                        <input
                            type="text"
                            name="questionimage"
                            value={questionimage}
                            className="create_product_input_inner"
                            onChange={(event) => setQuestionimage(event.target.value)}
                        ></input>
                    </div>
                </div>
                {validations.length > 0 ? (
                    <div className="create_product_empty">
                        <div className="create_product_error">
                            {validations.map((error, i) => (
                                <div key={i}>{error}</div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="create_product_empty"></div>
                )}
                <div className="create_product_footer">
                    <div className="create_product_footer2">
                        <div>
                            <button
                                className="create_product_cancel"
                                onClick={(event) => history.push("/home")}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                    <div className="create_product_rightside">
                        <button
                            className="create_product_button"
                            type="submit"
                            disabled={validations.length > 0}
                        >
                            Create Question
                        </button>
                    </div>
                </div>
            </form>

        </div>
    )
}

export default AnswerCreate

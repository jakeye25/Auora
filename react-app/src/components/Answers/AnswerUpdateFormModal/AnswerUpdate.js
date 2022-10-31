import { useEffect, useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { thunkUpdateAnswer } from "../../../store/answer";


function AnswerUpdate({answer, setShowModal}) {
    const history = useHistory();
    const dispatch = useDispatch();

    const answerId = answer?.id
    console.log('answerupdate answereId', answerId)
    const user = useSelector((state) => state.session.user)


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
            id: answerId,
            answercontent,
            answerimage

        }

        let updatedAnswer = await dispatch(thunkUpdateAnswer(payload))

        if (updatedAnswer) {
            history.push('/myanswers');
            setShowModal(false)

        }
        // onClick=()=> setShowModal(false)
    }

    return (
        <div id="createanswer-container">
            <div>{user?.username}</div>
            <div>{answer?.question}</div>
            <form className="create_product_form" onSubmit={onSubmit}>

                <div className="create_product_input">

                    <div>
                        <input
                            type="text"
                            placeholder="Write your answer"
                            name="answercontent"
                            value={answercontent}
                            className="create_product_input_inner"
                            onChange={(event) => setAnswercontent(event.target.value)}
                            required
                        ></input>
                    </div>
                </div>

                <div className="create_product_input">
                    <div className="create_product_text_box">
                        <div>Image</div>
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="Add a url image(optional)"
                            name="answerimage"
                            value={answerimage}
                            className="create_product_input_inner"
                            onChange={(event) => setAnswerimage(event.target.value)}
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
                            Edit Answer
                        </button>
                    </div>
                </div>
            </form>

        </div>
    )

}

export default AnswerUpdate

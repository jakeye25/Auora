import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { thunkCreateQuestion } from "../../../store/question";
import { thunkGetAllTopic } from "../../../store/topic";
import './QuestionCreate.css'

function QuestionCreate({ setShowModal }) {
  const history = useHistory()
  const dispatch = useDispatch()


  const [questioncontent, setQuestioncontent] = useState('')
  const [questionimage, setQuestionimage] = useState('')
  const [topicId, settopicId] = useState('')
  const [validations, setValidations] = useState([])

  const topicsObj = useSelector((state) => state.topic)
  // console.log('questionlisttopic', topicsObj)
  let topicsObjArr = Object.values(topicsObj)
  // console.log('questionlisttopicarr', topicsObjArr)

  useEffect(() => {
    dispatch(thunkGetAllTopic())
  }, [dispatch])

  const currentuser = useSelector((state) => state.session.user)

  useEffect(() => {
    const errors = []
    if (questioncontent.length < 5 || questioncontent.length > 1000) {
      errors.push('Please enter a valid Question')
    }
    if (!topicId) {
      errors.push('Please select a topic')
    }
    if (questionimage &&
      (!questionimage.includes("jpg") &&
        !questionimage.includes("png") &&
        !questionimage.includes("jpeg") &&
        !questionimage.includes("svg"))
    )
      errors.push("Please enter a valid url image");
    setValidations(errors)
  }, [questioncontent, questionimage, topicId])

  const onSubmit = async (event) => {
    event.preventDefault()
    const payload = {
      questioncontent,
      questionimage,
      topicId
    }

    let createdQuestion = await dispatch(thunkCreateQuestion(payload))

    if (createdQuestion) {
      history.push('/home');
      setShowModal(false)

    }
    // onClick=()=> setShowModal(false)
  }
  return (
    <div className="create_question_main">
      <div onClick={() => setShowModal(false)}><i class="fa-solid fa-x"></i></div>
      <div className="create_question_div">
        <h1>Add Question</h1>
        <form className="create_question_form" onSubmit={onSubmit}>

          <div className="create_question_input">

            <div>
              <input
                type="text"
                placeholder="Start your question with 'What', 'How', 'Why', etc."
                name="questioncontent"
                value={questioncontent}
                className="create_question_input_inner"
                onChange={(event) => setQuestioncontent(event.target.value)}
                required
              ></input>
            </div>
          </div>

          <div className="create_question_input">
            <div className="create_question_text_box">
              <div>Topic</div>
            </div>
            <div>
              <select
                required
                name="TopicId"
                value={topicId}
                onChange={(event) => settopicId(event.target.value)}
                className="create_question_input_inner"
              >
                <option value="" disabled>
                  Select a topic
                </option>
                {topicsObjArr?.map((topic) => (
                  <option key={topic?.id} value={topic?.id}>
                    {topic?.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="create_question_input">
            <div className="create_question_text_box">
              <div>Image</div>
            </div>
            <div>
              <input
                type="text"
                placeholder="Add a url image(optional)"
                name="questionimage"
                value={questionimage}
                className="create_question_input_inner"
                onChange={(event) => setQuestionimage(event.target.value)}
              ></input>
            </div>
          </div>
          {validations.length > 0 ? (
            <div className="create_question_empty">
              <div className="create_question_error">
                {validations.map((error, i) => (
                  <div key={i}>{error}</div>
                ))}
              </div>
            </div>
          ) : (
            <div className="create_question_empty"></div>
          )}
          <div className="create_question_footer">
            <div className="create_question_footer2">
              <div>
                <button
                  className="create_question_cancel"
                  onClick={(event) => history.push("/home")}
                >
                  Cancel
                </button>
              </div>
            </div>
            <div className="create_question_rightside">
              <button
                className="create_question_button"
                type="submit"
                disabled={validations.length > 0}
              >
                Create Question
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )



}

export default QuestionCreate;

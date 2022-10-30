import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { thunkCreateQuestion } from "../../store/question";
import { thunkGetAllTopic } from "../../store/topic";


function QuestionCreate () {
    const history = useHistory()
    const dispatch = useDispatch()



    const [questioncontent, setQuestioncontent] = useState('')
    const [questionimage, setQuestionimage] = useState('')
    const [topicId, settopicId] = useState('')
    const [validations, setValidations] = useState([])

    const topicsObj = useSelector((state) => state.topic)
    console.log('questionlisttopic', topicsObj)
    let topicsObjArr = Object.values(topicsObj)
    console.log('questionlisttopicarr', topicsObjArr)

    useEffect(() => {
      dispatch(thunkGetAllTopic())
    },[dispatch])

    const currentuser = useSelector((state) => state.session.user)

    useEffect(() => {
        const errors =[]
        if(questioncontent.length<5 || questioncontent.length>1000) {
            errors.push('Please enter a valid Question')
        }
        if(questionimage &&
            (!questionimage.includes("jpg") &&
            !questionimage.includes("png") &&
            !questionimage.includes("jpeg") &&
            !questionimage.includes("svg"))
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
        <div className="create_product_main">
        <div className="create_product_div">
          <h1>Create a listing</h1>
          <form className="create_product_form" onSubmit={onSubmit}>
            <div className="create_product_detailtext">
              <div>Listing details</div>
              <div className="create_product_small_text">
                Tell the world all about your item and why they'll buy it.
              </div>
            </div>
            <div className="create_product_input">
              <div className="create_product_text_box">
                <div>Name</div>
                <div className="create_product_small_text">
                  Include keywords that would attract buyers
                </div>
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
                <div>Topic</div>
                <div className="create_product_small_text">
                  Type a two word description to get category suggestions that
                  will help buyers find when they want.
                </div>
              </div>
              <div>
                <select
                  required
                  name="TopicId"
                  value={topicId}
                  onChange={(event) => settopicId(event.target.value)}
                  className="create_product_input_inner"
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
      </div>
    )



}

export default QuestionCreate;

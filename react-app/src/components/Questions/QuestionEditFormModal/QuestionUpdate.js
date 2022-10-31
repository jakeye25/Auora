import { useEffect, useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { thunkUpdateQuestion } from "../../../store/question";
import { thunkGetAllTopic } from "../../../store/topic";



function QuestionUpdate({question, setShowModal}) {
    const history = useHistory();
    const dispatch = useDispatch();

    // let question = useSelector(state => Object.values(state.question))
    const questionId = question.id

    // let editQuestion= question.find(ele => ele.id == id)

    const topicsObj = useSelector((state) => state.topic)
    // console.log('questionlisttopic', topicsObj)
    let topicsObjArr = Object.values(topicsObj)

    useEffect(() => {
      dispatch(thunkGetAllTopic())
    },[dispatch])

    const [questioncontent, setQuestioncontent] = useState(question?.questioncontent)
    const [questionimage, setQuestionimage] = useState(question?.questionimage)
    const [topicId, settopicId] = useState(question?.topicId)
    const [validations, setValidations] = useState([])

    useEffect(() => {
        const errors =[]
        if(questioncontent.length<5 || questioncontent.length>1000) {
            errors.push('Please enter a valid Question')
        }
        if(!topicId) {
          errors.push('Please select a topic')
        }
        if(questionimage &&
            (!questionimage.includes("jpg") &&
            !questionimage.includes("png") &&
            !questionimage.includes("jpeg") &&
            !questionimage.includes("svg"))
            )
            errors.push("Please enter a valid url image");
        setValidations(errors)
    }, [questioncontent, questionimage, topicId])

    const onSubmit = async (event) => {
        event.preventDefault();
        // setSubmit(!submit);
        const payload = {
          id: questionId,
          questioncontent,
          questionimage,
          topicId,
        };

         let updatedQuestion =
        await dispatch(thunkUpdateQuestion(payload));

        // console.log(updatedProduct)

        //   await dispatch(thunkGetOneProduct(payload.id))

        if (updatedQuestion) {
        //   history.push(`/products/${updatedProduct.id}`);
          history.push('/home')
          setShowModal(false)
        }
      };

      return(
        <div className="create_product_main">
        <div className="create_product_div">
          <h1>Edit Question</h1>
          <form className="create_product_form" onSubmit={onSubmit}>

            <div className="create_product_input">

              <div>
                <input
                  type="text"
                  placeholder="Start your question with 'What', 'How', 'Why', etc."
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
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Add a url image(optional)"
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
                  Edit Question
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )


}


export default QuestionUpdate

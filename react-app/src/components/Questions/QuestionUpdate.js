import { useEffect, useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { thunkUpdateQuestion } from "../../store/question";

function QuestionUpdate() {
    const history = useHistory();
    const dispatch = useDispatch();

    let question = useSelector(state => Object.values(state.question))
    const {id} = useParams()

    let editQuestion= question.find(ele => ele.id == id)

    const [questioncontent, setQuestioncontent] = useState(editQuestion?.questioncontent)
    const [questionimage, setQuestionimage] = useState(editQuestion?.questionimage)
    const [topicId, settopicId] = useState(editQuestion?.topicId)
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
        event.preventDefault();
        // setSubmit(!submit);
        const payload = {
          id: id,
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
        }
      };

      return(
        <div>
            Update Question
        </div>
      )


}


export default QuestionUpdate

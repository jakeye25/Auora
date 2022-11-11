import {useState, useEffect} from 'react';
import {NavLink} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { thunkGetAllQuestion } from '../../store/question';
import './Search.css'
import { thunkGetAllQuestionAnswer } from '../../store/answer';

function Searchbar() {
    const dispatch = useDispatch();
    const questions = useSelector((state) => state.question)
    const answers = useSelector((state) => state.answer)

    const questionsArr = Object.values(questions)
    const answersArr = Object.values(answers)
    console.log('qquestionarr', questionsArr)
    console.log('aarr', answersArr)
    const [searchWord, setSearchWord] = useState('')
    const [showDropdown, setShowDropdown] = useState(false);
    const[searchResult, setSearchResult] =useState([]);

    const results = (word) =>{
        const str1 =[];

        for (let i =0; i<questionsArr.length; i++){
          let question = questionsArr[i];
          if (question.questioncontent.toLowerCase().includes(word.toLowerCase())
          ){
            str1.push(`Question: ${question?.questioncontent}`)
          }
        }
        // for (let i =0; i<answersArr.length; i++){
        //     let answer = answersArr[i];
        //     if (answer.answercontent.toLowerCase().includes(word.toLowerCase())
        //     ){
        //       str2.push(`answer: ${answer?.answercontent}`)
        //     }
        //   }
        //   let str3 = str1.concat(str2)
        return str1
    }

    useEffect(() => {
        if (searchWord.length) {
            setShowDropdown(true)
            setSearchResult(results(searchWord))
        } else {
            setShowDropdown(false)
            setSearchResult([])
        }
    }, [searchWord])

    useEffect(() => {
        dispatch(thunkGetAllQuestion())
        dispatch(thunkGetAllQuestionAnswer())
    }, [dispatch])

    useEffect(()=>{

    }, [questionsArr, answersArr])

    return(
        <>
            <div className='searchbar'>
                <div className='search_btn'><i className="fa-solid fa-magnifying-glass"></i> &nbsp;</div>
                <input
                type='text'
                className='searchinput'
                placeholder='Search Auora'
                onChange={(e) => setSearchWord(e.target.value)}
                value={searchWord}
                />
            </div>
            {(showDropdown && searchResult.length >0) && (
                <div className='search_dropdown'>
                    { searchResult.map((question) => (
                        <NavLink to={`/question/${question.id}`} onClick={() => setSearchWord("")}>
                            {question}
                        </NavLink>
                    ))

                    }
                </div>
            )}

            {(showDropdown && !searchResult.length) && (
                <div className='search_dropdown'>
                    <div>We couldn't find any results for "{searchWord}"</div>
                </div>
            )}
        </>
    )


}

export default Searchbar

import {useState, useEffect} from 'react';
import {NavLink} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { thunkGetAllQuestion } from '../../store/question';


function Searchbar() {
    const dispatch = useDispatch();
    const questions = useSelector((state) => state.question)
    const answers = useSelector((state) => state.answer)

    const questionsArr = Object.values(questions)
    const answersArr = Object.values(answers)

    const [searchWord, setSearchWord] = useState('')
    const [showDropdown, setShowDropdown] = useState(false);
    const[searchResult, setSearchResult] =useState([]);

    const results = (word) =>{
        const str =[];
        for (let i =0; i<questionsArr.length; i++){
          let question = questionsArr[i];
          if (question.questioncontent.toLowerCase().includes(word.toLowerCase())
          ){
            str.push(question)
          }
        }
        return str
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
    }, [dispatch])

    useEffect(()=>{

    }, [questionsArr])

    return(
        <>
            <div className='searchbar'>
                <div><i className="fa-solid fa-magnifying-glass fa-lg "></i> &nbsp;</div>
                <input
                type='text'
                className='searchinput'
                placeholder='Search Auora'
                onChange={(e) => setSearchWord(e.target.value)}
                value={searchWord}
                ></input>
            </div>
            {(showDropdown && searchResult.length >0) && (
                <div>
                    { searchResult.map((question) => (
                        <NavLink to={`/question/${question.id}`} onClick={() => setSearchWord("")}>
                            question:&nbsp;{question?.questioncontent}
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

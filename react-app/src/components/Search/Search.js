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
        for (let i =0; i<questions.length; i++){
          let question = questions[i];
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

    }, [questions])

    return(
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
    )


}

export default Searchbar

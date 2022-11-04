import {useState, useEffect} from 'react';
import {NavLink} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';


function Searchbar() {
    const questions = useSelector((state) => state.question)
    const answers = useSelector((state) => state.answer)

    const questionsArr = Object.values(questions)
    const answers

    return(
        <div>

        </div>
    )


}

export default Searchbar

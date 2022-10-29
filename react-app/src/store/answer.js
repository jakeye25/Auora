// TYPES

const createAnswer = '/answer/createAnswer'
const getAllQuestionAnswer = '/answer/getAllQuestionAnswer'
const getCurrentAnswer = '/answer/getCurrentAnswer'
const updateAnswer = '/answer/updateAnswer'
const deleteAnswer = '/answer/deleteAnswer'

// ACTION CREATORS

const actionCreateAnswer = (answer) => {
    return {
        type: createAnswer,
        review
    }
}

const actionGetAllQuestionAnswer = (answers) => {
    return {
        type: getAllQuestionAnswer,
        reviews
    }
}

const actionGetCurrentAnswer = (answers) => {
    return {
        type: getCurrentAnswer,
        answers
    }
}

const actionUpdateAnswer = (answer) => {
    return {
        type: updateAnswer,
        answer
    }
}

const actionDeleteAnswer = (id) => {
    return {
        type: deleteAnswer,
        id
    }
}

// THUNKS


export const thunkCreateAnswer = (payload) => async dispatch => {
    const response = await fetch(`/api/answers/questions/${payload.questionId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if(response.ok) {
        const data = await response.json()
        dispatch(actionCreateAnswer(data))
        return data
    }
}


export const thunkGetAllQuestionAnswer = (id) => async dispatch => {
    const response = await fetch(`/api/answers/questions/${id}`, {
      method: "GET",
    });
    // console.log(id)

    if (response.ok) {
        const data = await response.json()
        dispatch(actionGetAllQuestionAnswer(data))
    }
}


export const thunkGetCurrentAnswer = () => async dispatch => {
    const response = await fetch('/api/answers/')

    if (response.ok) {
        const data = await response.json()
        dispatch(actionGetCurrentAnswer(data))
    }
}


export const thunkUpdateAnswer = (payload) => async dispatch => {
    const response = await fetch(`/api/answers/${payload.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });
    // console.log(payload)

    if (response.ok) {
        const data = await response.json()
        dispatch(actionUpdateAnswer(data))
        return data
    }
}


export const thunkDeleteAnswer = (id) => async dispatch => {
    const response = await fetch(`/api/answers/${id}`, {
        method: 'DELETE'
    })
    if (response.ok) {
        dispatch(actionDeleteAnswer(id))
    }
}

const initialState = {}
const answerReducer = (state = initialState, action) => {
    let newState = {...state}
    switch (action.type) {
        case createAnswer:
            newState[action.answer.id] = action.answer
            return newState
        case getAllQuestionAnswer:
            newState = {};
            action.answers.product_answers.forEach((answer) => {
                newState[answer.id] = answer;
            });
            return newState
        case getCurrentAnswer:
            newState = {};
            action.answers.user_answers.forEach((answer) => {
                newState[answer.id] = answer;
            });
            return newState
        case updateAnswer:
            newState[action.answer.id] = action.answer
            return newState
        case deleteAnswer:
            delete newState[action.id]
            return newState
        default:
            return state
    }
}



export default answerReducer

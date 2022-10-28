// TYPES

const createQuestion = '/question/createQuestion'
const getAllQuestion = '/question/getAllQuestion'
const getCurrentQuestion = '/question/getCurrentQuestion'
const getOneQuestion = '/question/getOneQuestion'
const updateQuestion = '/question/updateQuestion'
const deleteQuestion = '/question/deleteQuestion'

// ACTION CREATORS

const actionCreateQustion = (question) => {
    return {
        type: createQuestion,
        question
    }
}

const actionGetAllQuestion = (questions) => {
    return {
        type: getAllQuestion,
        questions
    }
}

const actionGetCurrentQuestion = (questions) => {
    return {
        type: getCurrentQuestion,
        questions
    }
}

const actionGetOneQuestion = (question) => {
    return {
        type: getOneQuestion,
        question
    }
}

const actionUpdateQuestion = (question) => {
    return {
        type: updateQuestion,
        question
    }
}

const actionDeleteQuestion = (id) => {
    return {
        type: deleteQuestion,
        id
    }
}


export const thunkGetAllQuestion = () => async dispatch => {
    const response = await fetch("/api/questions/", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        const data = await response.json()
        dispatch(actionGetAllQuestion(data))

    }
}

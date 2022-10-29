// TYPES

const createAnswer = '/answer/createAnswer'
const getAllProductAnswer = '/answer/getAllProductAnswer'
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

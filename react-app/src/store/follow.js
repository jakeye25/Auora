// TYPES

const updateFollow = '/follow/updateFollow'

// ACTION CREATORS
const actionUpdateFollow = (user) => {
    return {
        type: updateFollow,
        user
    }
}

export const thunkUpdateFollow= (id) => async dispatch => {
    const response = await fetch(`/api/follows/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
        const data = await response.json()
        dispatch(actionUpdateFollow(data))
        return data
    }
}

const initialState = {}

const followReducer = (state = initialState, action) => {
    let newState = { ...state }
    switch (action.type) {
        case updateFollow:
            newState.user.followers.push(action.user);
            return { ...newState };
        default:
            return state;
    }
}

export default followReducer;

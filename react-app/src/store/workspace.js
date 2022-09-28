// Action Types

const GET_ALL_WORKSPACES = "workspace/get-all-workspaces"

// Action Creators

const getAllWorkspaces = payload => {
    return {
        type: GET_ALL_WORKSPACES,
        payload
    }
}
// Thunk Action Creators

const getAllWorkspacesThunk = () => async dispatch => {
    const response = await fetch('api/workspaces')
    const data = response.json()

    if(response.ok) {
        await dispatch(getAllWorkspaces(data))
    }

    return data
}

// Reducer
const initialState = {}

const workspaceReducer = (state = initialState, action) => {
    let newState = {...state}
    switch (action.type) {
        case (GET_ALL_WORKSPACES): {
            return newState
        }
        default: {
            return state
        }
    }
}

export default workspaceReducer
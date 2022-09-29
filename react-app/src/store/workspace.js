// Action Types

const GET_ALL_WORKSPACES = "workspace/get-all-workspaces"
const ADD_BOARD_TO_WORKSPACE= "workspace/add-board-to-workspace"

// Action Creators

const getAllWorkspaces = payload => {
    return {
        type: GET_ALL_WORKSPACES,
        payload
    }
}

const addBoardToWorkspace = payload => {
    return {
        type: ADD_BOARD_TO_WORKSPACE,
        payload
    }
}
// Thunk Action Creators

export const getCurrentUserWorkspacesThunk = () => async dispatch => {
    const response = await fetch('/api/workspaces/current')
    const data = await response.json()

    if(response.ok) {
        await dispatch(getAllWorkspaces(data))
    }

    return data
}

export const createBoardOnWorkspaceThunk = (payload) => async dispatch => {
    const response = await fetch('/api/boards/', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
    const data = await response.json()

    console.log('The return is ', data)

    if (response.ok){
        await dispatch(addBoardToWorkspace(data))
    }
    return data
}

// Reducer
const initialState = {}

const workspaceReducer = (state = initialState, action) => {
    let newState = {...state}
    switch (action.type) {
        case (GET_ALL_WORKSPACES): {
            action.payload.workspaces.forEach(workspace => {
                newState[workspace.id] = {...newState[workspace.id], ...workspace}
            });
            return newState
        }
        case (ADD_BOARD_TO_WORKSPACE): {
            newState[action.payload.workspaceId].boards[action.payload.id] = action.payload
            return newState
        }
        default: {
            return state
        }
    }
}

export default workspaceReducer
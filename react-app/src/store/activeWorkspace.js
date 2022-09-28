// Action Types

const GET_ALL_BOARDS_OF_WORKSPACE = "activeWorkspace/get-all-boards-of-workspace"

// Action Creators

const getAllBoardsOfWorkspace = payload => {
    return {
        type: GET_ALL_BOARDS_OF_WORKSPACE,
        payload
    }
}
// Thunk Action Creators

export const getAllBoardsOfWorkspaceThunk = (id) => async dispatch => {
    const response = await fetch(`api/workspaces/${id}/boards`)
    const data = await response.json()

    if(response.ok) {
        await dispatch(getAllBoardsOfWorkspace(data))
    }

    return data
}

// Reducer
const initialState = {}

const activeWorkspaceReducer = (state = initialState, action) => {
    let newState = {...state}
    switch (action.type) {
        case (GET_ALL_BOARDS_OF_WORKSPACE): {
            newState['workspace'] = action.payload.workspace
            newState.workspace['boards'] = []
            action.payload.boards.forEach(board => {
                newState.workspace.boards.push({...newState[board.id], ...board})
            })
            return newState
        }
        default: {
            return state
        }
    }
}

export default activeWorkspaceReducer
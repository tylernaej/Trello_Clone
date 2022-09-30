// Action Types

const GET_ALL_BOARDS_OF_WORKSPACE = "activeWorkspace/get-all-boards-of-workspace"
const ADD_BOARD_TO_ACTIVE_WORKSPACE= "activeWorkspace/add-board-to-active-workspace"
const ADD_LIST_TO_BOARD = "activeWorkspace/add-list-to-board"
const ADD_CARD_TO_LIST = "activeWorkspace/add-card-to-list"

// Action Creators

const getAllBoardsOfWorkspace = payload => {
    return {
        type: GET_ALL_BOARDS_OF_WORKSPACE,
        payload
    }
}

const addBoardToActiveWorkspace = payload => {
    return {
        type: ADD_BOARD_TO_ACTIVE_WORKSPACE,
        payload
    }
}

const addListToBoard = payload => {
    return {
        type: ADD_LIST_TO_BOARD,
        payload
    }
}

const addCardToList = payload => {
    return {
        type: ADD_CARD_TO_LIST,
        payload
    }
}
// Thunk Action Creators

export const getAllBoardsOfWorkspaceThunk = (workspaceId) => async dispatch => {
    const response = await fetch(`/api/workspaces/${parseInt(workspaceId)}/boards`)
    const data = await response.json()

    console.log('data: ', data)

    if(response.ok) {
        await dispatch(getAllBoardsOfWorkspace(data))
    }

    return data
}

export const createBoardOnActiveWorkspaceThunk = (payload) => async dispatch => {
    const response = await fetch('/api/boards/', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
    const data = await response.json()

    if (response.ok){
        await dispatch(addBoardToActiveWorkspace(data))
    }
    return data
}

export const addListToBoardThunk = (payload) => async dispatch => {
    const response = await fetch('/api/lists/', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
    const data = await response.json()

    if (response.ok){
        await dispatch(addListToBoard(data))
    }
    return data
}

export const addCardToListThunk = (payload) => async dispatch => {
    
    console.log('payload: ', payload)
    const response = await fetch('/api/cards/', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
    const data = await response.json()

    console.log('data: ', data)
    
    if (response.ok){
        await dispatch(addCardToList(data))
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
        case (ADD_BOARD_TO_ACTIVE_WORKSPACE): {
            newState.workspace.boards.push(action.payload)
            console.log(newState)
            return newState
        }
        case (ADD_LIST_TO_BOARD): {
            newState.workspace.boards.find(board => board.id === action.payload.boardId).lists.push(action.payload)
            return newState
        }
        case (ADD_CARD_TO_LIST): {
            newState.workspace.boards.forEach(board => {
                const list = board.lists.find(list => list.id === action.payload.listId)
                if (list) {
                    list.cards ? list.cards.push(action.payload) : list['cards'] = [action.payload]
                }
            })
            return newState
        }
        default: {
            return state
        }
    }
}

export default activeWorkspaceReducer
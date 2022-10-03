// Action Types

const GET_ALL_BOARDS_OF_WORKSPACE = "activeWorkspace/get-all-boards-of-workspace"
const ADD_BOARD_TO_ACTIVE_WORKSPACE= "activeWorkspace/add-board-to-active-workspace"
const ADD_LIST_TO_BOARD = "activeWorkspace/add-list-to-board"
const ADD_CARD_TO_LIST = "activeWorkspace/add-card-to-list"
const EDIT_LIST = "activeWorkspace/edit-list"
const EDIT_CARD = "activeWorkspace/edit-card"
const EDIT_WORKSPACE = 'activeWorkspace/edit-workspace'
const EDIT_BOARD = 'activeWorkspace/edit-board'

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

const editList = payload => {
    return {
        type: EDIT_LIST,
        payload
    }
}

const editCard = payload => {
    return {
        type: EDIT_CARD,
        payload
    }
}

const editWorkspace = payload => {
    return {
        type: EDIT_WORKSPACE,
        payload
    }
}

const editBoard = payload => {
    return {
        type: EDIT_BOARD,
        payload
    }
}
// Thunk Action Creators

export const getAllBoardsOfWorkspaceThunk = (workspaceId) => async dispatch => {
    console.log('wId in thunk', workspaceId)
    const response = await fetch(`/api/workspaces/${parseInt(workspaceId)}/boards`)
    const data = await response.json()

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
    const response = await fetch('/api/cards/', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
    const data = await response.json()

    if (response.ok){
        await dispatch(addCardToList(data))
    }
    return data
}

export const editListThunk = ({listId, payload}) => async dispatch => {
    const response = await fetch(`/api/lists/${listId}`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
    const data = await response.json()

    if (response.ok){
        await dispatch(editList(data))
    }
    return data
}

export const editCardThunk = ({cardId, payload}) => async dispatch => {
    const response = await fetch(`/api/cards/${cardId}`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
    const data = await response.json()

    if (response.ok){
        await dispatch(editCard(data))
    }
    return data
}

export const editWorkspaceThunk = ({workspaceId, payload}) => async dispatch => {
    const response = await fetch(`/api/workspaces/${workspaceId}`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
    const data = await response.json()

    if (response.ok){
        await dispatch(editWorkspace(data))
    }
    return data
}

export const editBoardThunk = ({boardId, payload}) => async dispatch => {
    const response = await fetch(`/api/boards/${boardId}`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
    const data = await response.json()

    if (response.ok){
        await dispatch(editBoard(data))
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
            console.log(newState)
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
        case (EDIT_LIST): {
            let board = newState.workspace.boards.find(board => board.id === action.payload.boardId)
            let list = board.lists.find(list => list.id === action.payload.id)
            let cards = list.cards
            let listIndex = board.lists.findIndex(list => {
                if(list.id === action.payload.id){
                    return true
                }
                return false
            })
            list.title = action.payload.title
            list.isArchived = action.payload.isArchived
            list.cards = cards
            board.lists.splice(listIndex, 1, list)
            return newState
        }
        case (EDIT_CARD): {
            let card = {}
            for (const board of newState.workspace.boards){
                if(board.lists){
                    let list = board.lists.find(list => list.id === action.payload.listId)
                    if(list) {
                        let cardIndex = list.cards.findIndex(card => {
                            if(card.id === action.payload.id){
                                return true
                            }
                            return false
                        })
                        list.cards.splice(cardIndex, 1, action.payload)
                    }
                }
            }
            return newState
        }
        case (EDIT_WORKSPACE): {
            newState.workspace.name = action.payload.name
            newState.workspace.workspaceType = action.payload.workspaceType
            newState.workspace.description = action.payload.description
            return newState
        }
        case (EDIT_BOARD): {
            const boardUpdate = newState.workspace.boards.find(board => board.id === action.payload.id)
            const boardUpdateIndex = newState.workspace.boards.findIndex(board => {
                if(board.id === action.payload.id){
                    return true
                }
                return false
            })
            const boardUpdateLists = newState.workspace.boards.find(board => board.id === action.payload.id).lists
            boardUpdate.title = action.payload.title
            boardUpdate.backgroundColor = action.payload.backgroundColor
            boardUpdate.visibility = action.payload.visibility
            boardUpdate.isArchived = action.payload.isArchived
            boardUpdate.lists = boardUpdateLists
            newState.workspace.boards.splice(boardUpdateIndex, 1, boardUpdate)
            return newState
        }
        default: {
            return state
        }
    }
}

export default activeWorkspaceReducer
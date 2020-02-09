export const Actions = {
    REQUEST: 'REQUEST',
    REMOVE: 'REMOVE',
    SETID: 'SETID'
}

export const addRequest = (item, quantity, isBorrowed, startTime, description) => ({
    type: Actions.REQUEST,
    payload: { item, quantity, isBorrowed, startTime, description }
})

export const removeRequest = (index) => ({
    type: Actions.REMOVE,
    payload: { index }
})

export const setId = (id) => ({
    type: Actions.SETID,
    payload: { id }
})
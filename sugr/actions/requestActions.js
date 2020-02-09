export const Actions = {
    REQUEST: 'REQUEST'
}

export const addRequest = (item, quantity, isBorrowed, startTime, endTime, description) => ({
    type: Actions.REQUEST,
    payload: { item, quantity, isBorrowed, startTime, endTime, description }
})
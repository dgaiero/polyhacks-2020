import { Actions } from '../actions/requestActions'

const initialState = { 
    requests: [],
    item: "",
    quantity: 0,
    isBorrowed: false,
    startTime: new Date(Date.now()),
    endTime: new Date(Date.now()),
    description: ""
 }
 
 export default function (state = initialState, action) {
    switch (action.type) {
        case Actions.REQUEST:
            var request = {
                item: action.payload.item,
                quantity: action.payload.quantity,
                isBorrowed: action.payload.isBorrowed,
                startTime: action.payload.startTime,
                endTime: action.payload.endTime,
                description: action.payload.description
              };
            let requests = state.requests;
            requests.unshift(request);
            return {
                ...state,
                requests: requests
            }
        default:
            return state;
    }
 }
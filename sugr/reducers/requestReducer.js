import { Actions } from '../actions/requestActions'

const initialState = { 
    requests: [],
    id: "",
    user: ""
 }
 
 export default function (state = initialState, action) {
    switch (action.type) {
        case Actions.REQUEST:
            var request = {
                item: action.payload.item,
                quantity: action.payload.quantity,
                isBorrowed: action.payload.isBorrowed,
                startTime: action.payload.startTime,
                description: action.payload.description
              };
            let requests = state.requests;
            requests.unshift(request);
            return {
                ...state,
                requests: requests
            }
        case Actions.REMOVE:
            let updatedList = state.requests;
            updatedList.splice(action.payload.index, 1);
            return  {
                ...state,
                requests: updatedList
            }
        case Actions.SETID:
            return {
                ...state,
                id: action.payload.id
            }
        case Actions.SETUSER:
            return {
                ...state,
               user: action.payload.user
            }
        default:
            return state;
    }
 }
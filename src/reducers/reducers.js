import { selectedPost } from "../actions/actions"

export const initialState = {
   currentUser: {},
   followsPosts: {},
   allPosts: {},
   currentUserData: {},
   selectedPost: {},
   selectedUser: {},
   selectedUserPosts: {}
}

export default function reducer(state = initialState, action) {
   switch (action.type) {
      case 'LOGIN_USER':
         return {...state, currentUser: action.payload}
      case 'LOGOUT_USER':
         return {...state, currentUser: {}}
      case 'FOLLOWS_POSTS':
         return {...state, followsPosts: action.payload}
      case 'ALL_POSTS':
         return {...state, allPosts: action.payload}
      case 'USER_DATA':
         return {...state, currentUserData: action.payload}
      case 'POST':
         return {...state, selectedPost: action.payload}
      case 'SELECT_USER':
         return {...state, selectedUser: action.payload}
      case 'SELECTED_USER_POSTS':
         return {...state, selectedUserPosts: action.payload}
      default:
         return state
   }
}
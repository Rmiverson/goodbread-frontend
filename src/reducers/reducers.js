export const initialState = {
   currentUser: {},
   followsPosts: {},
   allPosts: {}
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
      default:
         return state
   }
}
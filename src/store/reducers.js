export const initialState = {
   currentUser: {},
   followsPosts: {},
   allPosts: {},
   currentUserData: {},
   isLoading: false
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
      case 'LOADING':
         return {...state, isLoading: action.payload}
      default:
         return state
   }
}
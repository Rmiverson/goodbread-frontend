const API = "http://localhost:3000/api/v1"

export const userPostFetch = user => {
   return dispatch => {
      return fetch(API + "/sign_up", {
         method: "POST",
         headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
         },
         body: JSON.stringify({user: user})
      })
      .then(resp => resp.json())
      .then(data => {
         console.log(data)
         if (!!data.message) {
            console.log(data.message)
         } else {
            localStorage.setItem("token", data.token)
            dispatch(loginUser(data.user))
         }
      })
   }
}

export const userLoginFetch = user => {
   return dispatch => {
      return fetch(API + "/login", {
         method: "POST",
         headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
         },
         body: JSON.stringify(user)
      })
      .then(resp => resp.json())
      .then(data => {
         if (data.message) {
            console.log(data.message)
         } else {
            localStorage.setItem("token", data.token)
            dispatch(loginUser(data))
         }
      })
   }
}

export const userPersistFetch = user => {
   return dispatch => {
      const token = localStorage.token
      if (token) {
         return fetch(API + "/persist", {
            method: "GET",
            headers: {
               Authorization: `Bearer ${token}`
            },
         })
         .then(resp => resp.json())
         .then(data => {
            if (data.message) {
               console.log(data.message)
               localStorage.removeItem("token")
            } else {
               dispatch(loginUser(data))
            }
         })   
      }
   }
}

export const allPostsFetch = () => {
   return dispatch => {
      const token = localStorage.token
      if (token) {
         return fetch(API + "/posts", {
            method: "GET",
            headers: {
               Authorization: `Bearer ${token}`
            },
         })
         .then(resp => resp.json())
         .then(data => {
            if (data.message) {
               console.log(data.message)
            } else {
               dispatch(posts(data))
            }
         })
      }
   }
}

export const userFollowPostsFetch = user => {
   return dispatch => {
      const token = localStorage.token
      if (token) {
         return fetch(API + "/followposts/" + user.id, {
            method: "GET",
            headers: {
               Authorization: `Bearer ${token}`
            },
         })
         .then(resp => resp.json())
         .then(data => {
            if (data.message) {
               console.log(data.message)
            } else {
               dispatch(followsPosts(data))
            }
         })
      }
   }
}

export const loginUser = userObj => ({
   type: 'LOGIN_USER',
   payload: userObj
})

export const logoutUser = userObj => ({
   type: 'LOGOUT_USER'
})

export const followsPosts = dataObj => ({
   type: 'FOLLOWS_POSTS',
   payload: dataObj
})

export const posts = dataObj => ({
   type: 'ALL_POSTS',
   payload: dataObj
})
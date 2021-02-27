export const userPostFetch = user => {
   return dispatch => {
      return fetch("http://localhost:3000/users", {
         method: "POST",
         headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
         },
         body: JSON.stringify({user})
      })
      .then(resp => resp.json())
      .then(data => {
         if (data.message) {
            //handle logic if an invalid user is created
            //ie: invalid username or password
         } else {
            localStorage.setItem("token", data.token)
            dispatch(loginUser(data.user))
         }
      })
   }
}

export const userLoginFetch = user => {
   return dispatch => {
      return fetch("http://localhost:3000/login", {
         method: "POST",
         headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
         },
         body: JSON.stringify({user})
      })
      .then(resp => resp.json())
      .then(data => {
         if (data.message) {
            //handle invalid input
         } else {
            localStorage.setItem("token", data.token)
            dispatch(loginUser(data.user))
         }
      })
   }
}

export const getProfileFetch = () => {
   return dispatch => {
      const token = localStorage.token
      if (token) {
         return fetch("http://localhost:3000/profile", {
            method: "GET",
            headers: {
               'Content-Type': 'application/json',
               Accept: 'application/json',
               'Authorization': `Bearer ${token}`
            }
         })
         .then(resp => resp.json())
         .then(data => {
            if (data.message) {
               //handle error resp
               localStorage.removeItem("token")
            } else {
               dispatch(loginUser(data.user))
            }

         })
      }
   }
}

const loginUser = userObj => ({
   type: 'LOGIN_USER',
   payload: userObj
})

export const logoutUser = userObj => ({
   type: 'LOGOUT_USER'
})


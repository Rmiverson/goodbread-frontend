export const userPostFetch = user => {
   return dispatch => {
      return fetch("http://localhost:3000/api/v1/sign_up", {
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
      return fetch("http://localhost:3000/api/v1/login", {
         method: "POST",
         headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
         },
         body: JSON.stringify(user)
      })
      .then(resp => resp.json())
      .then(data => {
         console.log(data)
         if (data.message) {
            console.log(data.message)
         } else {
            localStorage.setItem("token", data.token)
            dispatch(loginUser(data))
         }
      })
   }
}

export const loginUser = userObj => ({
   type: 'LOGIN_USER',
   payload: userObj
})

export const logoutUser = userObj => ({
   type: 'LOGOUT_USER'
})


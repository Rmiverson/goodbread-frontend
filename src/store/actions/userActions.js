const API = "http://localhost:3000/api/v1/"

export const userPostFetch = (user) => {
   return async dispatch => {
      try {
         const resp = await fetch(API + "sign_up", {
            method: "POST",
            headers: {
               'Content-Type': 'application/json',
               Accept: 'application/json'
            },
            body: JSON.stringify({ user: user })
         })
         const data = await resp.json()
         console.log(data)
         localStorage.setItem("token", data.token)
         dispatch(loginUser(data))
      } catch (error) {
         console.error('Error:', error)
      }
   }
}

export const userLoginFetch = (user) => {
   return async dispatch => {
      try {
         const resp = await fetch(API + "login", {
            method: "POST",
            headers: {
               'Content-Type': 'application/json',
               Accept: 'application/json'
            },
            body: JSON.stringify(user)
         })
         const data = await resp.json()
         console.log(data)
         localStorage.setItem("token", data.token)
         dispatch(loginUser(data))
      } catch (error) {
         console.error('Error:', error)
      }
   }
}

export const userPersistFetch = () => {
   return async dispatch => {
      const token = localStorage.token
      if (token) {
         try {
            const resp = await fetch(API + "persist", {
               method: "GET",
               headers: {
                  Authorization: `Bearer ${token}`
               },
            })
            const data = await resp.json()
            // console.log(data)
            dispatch(loginUser(data))
         } catch (error) {
            localStorage.removeItem("token")
            console.error('Error:', error)
         }  
      }
   }
}

export const userFollowPostsFetch = (user) => {
   return async dispatch => {
      const token = localStorage.token
      if (token) {
         try {
            const resp = await fetch(API + "followposts/" + user.id, {
               method: "GET",
               headers: {
                  Authorization: `Bearer ${token}`
               },
            })
            const data = await resp.json()
            dispatch(followsPosts(data))
         } catch (error) {
            console.error('Error:', error)
         }
      }
   }
}

export const updateUserFetch = (id) => {
   return async dispatch => {
      const token = localStorage.token
      if (token) {
         try {
            const resp = await fetch(API + "users/" + id, {
               method: "GET",
               headers: {
                  Authorization: `Bearer ${token}`
               },
            })
            const data = await resp.json()
            console.log(data)
            dispatch(updateUser(data))
         } catch (error) {
            console.error('Error:', error)
         }
      }
   }
}

export const getUserInfoFetch = (id, callback = () => {}) => {
   return async () => {
      const token = localStorage.token
      if (token) {
         try {
            const resp = await fetch(API + "users/" + id, {
               method: "GET",
               headers: {
                  Authorization: `Bearer ${token}`
               },
            })
            const data = await resp.json()
            callback(data)
         } catch (error) {
            console.error('Error:', error)
         }
      }
   }
}

export const deleteUser = (id) => {
   return async dispatch => {
      const token = localStorage.token
      if (token) {
         try {
            const resp = await fetch(API + 'users/' + id, {
               method: 'DELETE',
               headers: {
                  Authorization: `Bearer ${token}`
               }
            })
            await resp.json()
            dispatch(logoutUser())
         } catch (error) {
            console.error('Error:', error)
         }
      }
   }
}

export const loginUser = (userObj) => ({
   type: 'LOGIN_USER',
   payload: userObj
})

export const logoutUser = () => ({
   type: 'LOGOUT_USER'
})

export const updateUser = (userObj) => ({
   type: 'UPDATE_USER',
   payload: userObj
})

export const followsPosts = (dataObj) => ({
   type: 'FOLLOWS_POSTS',
   payload: dataObj
})
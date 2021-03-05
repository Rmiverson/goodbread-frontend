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
            dispatch(posts(data))
         })
         .catch(error => {
            console.error('Error:', error)
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
            dispatch(followsPosts(data))
         })
         .catch(error => {
            console.error('Error:', error)
         })
      }
   }
}

export const userInfoFetch = user => {
   return dispatch => {
      const token = localStorage.token
      if (token) {
         return fetch(API + "/users/" + user.id, {
            method: "GET",
            headers: {
               Authorization: `Bearer ${token}`
            },
         })
         .then(resp => resp.json())
         .then(data => {
            dispatch(currentUserData(data))
         })
         .catch(error => {
            console.error('Error:', error)
         })
      }
   }
}

export const setSelectedPost = (post, callback = () => {}) => {
   return dispatch => {
      dispatch(selectedPost(post))
      callback(post.id)
   }
}

export const getPostFetch = (id, callback = () => {}) => {
   return dispatch => {
      const token = localStorage.token
      if (token) {
         return fetch(API + "/posts/" + id, {
            method: "GET",
            headers: {
               Authorization: `Bearer ${token}`
            },
         })
         .then(resp => resp.json())
         .then(data => {
            dispatch(setSelectedPost(data, callback))
         })
         .catch(error => {
            console.error('Error:', error)
         })
      }
   }   
}

export const setSelectedUser = (user, callback = () => {}) => {
   return dispatch => {
      const token = localStorage.token
      if (token) {
         return fetch(API + "/users/" + user.id, {
            method: "GET",
            headers: {
               Authorization: `Bearer ${token}`
            },
         })
         .then(resp => resp.json())
         .then(data => {
            dispatch(selectedUser(data))
            callback()
         })
         .catch(error => {
            console.error('Error:', error)
         })
      }
   }
}

export const newPostFetch = (post, callback = () => {}) => {
   return dispatch => {
      const token = localStorage.token
      if (token) {
         return fetch(API + "/posts", {
            method: "POST",
            headers: {
               Authorization: `Bearer ${token}`,
               'Content-Type': 'application/json',
               Accept: 'application/json'
            },
            body: JSON.stringify(post)
         })
         .then(resp => resp.json())
         .then(data => {
            dispatch(setSelectedPost(data, callback))
         })
         .catch(error => {
            console.error('Error:', error)
         })
      }
   }
}

export const getUserPosts = (user, callback = () => {}) => {
   return dispatch => {
      const token = localStorage.token
      const userId = user.id
      if (token) {
         return fetch(API + '/userposts/' + userId, {
            method: "GET",
            headers: {
               Authorization: `Bearer ${token}`
            },
         })
         .then(resp => resp.json())
         .then(data => {
            dispatch(selectedUserPosts(data))
            callback()
         })
         .catch(error => {
            console.error('Error:', error)
         })
      }
   }
}

export const updatePostFetch = (post, callback = () => {}) => {
   return dispatch => {
      const token = localStorage.token
      const postId = post.id
      if (token) {
         return fetch(API + '/posts/' + postId, {
            method: 'POST',
            headers: {
               Authorization: `Bearer ${token}`,
               'Content-Type': 'application/json'
            },
            body: JSON.stringify(post)
         })
         .then(resp => resp.json())
         .then(data => {
            callback()
         })
         .catch(error => {
            console.error('Error:', error)
         })
      }
   }
}

export const deletePost = (id, callback = () => {}) => {
   return dispatch => {
      const token = localStorage.token
      if (token) {
         return fetch(API + '/posts/' + id, {
            method: 'DELETE',
            headers: {
               Authorization: `Bearer ${token}`
            }
         })
         .then(resp => resp.json())
         .then(data => {
            callback()
         })
         .catch(error => {
            console.error('Error:', error)
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

export const currentUserData = userObj => ({
   type: 'USER_DATA',
   payload: userObj
})

export const selectedPost = post => ({
   type: 'POST',
   payload: post
})

export const selectedUser = userObj => ({
   type: 'SELECT_USER',
   payload: userObj
})

export const selectedUserPosts = postsObj => ({
   type: 'SELECTED_USER_POSTS',
   payload: postsObj
})
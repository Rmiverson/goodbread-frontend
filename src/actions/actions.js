const API = "http://localhost:3000/api/v1/"

// for now until i rework redux
/* eslint-disable no-unused-vars*/

// user actions
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
         if (data.message) {
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

export const userInfoFetch = (user, callback = () => {}) => {
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
            callback()
         })
         .catch(error => {
            console.error('Error:', error)
         })
      }
   }
}

export const getUserInfoFetch = (id, callback = () => {}) => {
   return dispatch => {
      const token = localStorage.token
      if (token) {
         return fetch(API + "/users/" + id, {
            method: "GET",
            headers: {
               Authorization: `Bearer ${token}`
            },
         })
         .then(resp => resp.json())
         .then(data => {
            callback(data)
         })
         .catch(error => {
            console.error('Error:', error)
         })
      }
   }
}

export const updateUserFetch = (user, callback = () => {}) => {
   return dispatch => {
      const token = localStorage.token
      if (token) {
         return fetch(API + "/users/" + user.id, {
            method: 'POST',
            headers: {
               Authorization: `Bearer ${token}`,
               'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
         })
         .then(resp => resp.json())
         .then(data => {
            dispatch(currentUserData(data))
            callback()
         })
         .catch(error => {
            console.log('Error:', error)
         })
      }
   }
}

export const deleteUser = (id) => {
   return dispatch => {
      const token = localStorage.token
      if (token) {
         return fetch(API + '/users/' + id, {
            method: 'DELETE',
            headers: {
               Authorization: `Bearer ${token}`
            }
         })
         .then(resp => resp.json())
         .then(data => {
            dispatch(logoutUser())
         })
         .catch(error => {
            console.error('Error:', error)
         })
      }
   }
}

// follow actions

export const followUserFetch = (relationship, callback = () => {}) => {
   return dispatch => {
      const token = localStorage.token
      if (token) {
         return fetch('http://localhost:3000/api/v1/relationships', {
            method: "POST",
            headers: {
               Authorization: `Bearer ${token}`,
               'Content-Type': 'application/json',
               Accept: 'application/json'
            },
            body: JSON.stringify(relationship)
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

export const unfollowUserFetch = (relationship, callback = () => {}) => {
   return dispatch => {
      const token = localStorage.token
      if (token) {
         return fetch('http://localhost:3000/api/v1/relationships', {
            method: "DELETE",
            headers: {
               Authorization: `Bearer ${token}`,
               'Content-Type': 'application/json'
            },
            body: JSON.stringify(relationship)
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



// post actions

export const allPostsFetch = (callback = () => {}) => {
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
            callback()
         })
         .catch(error => {
            console.error('Error:', error)
         })
      }
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
            callback(data)
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
            callback(data)
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
            callback(data)
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

// comment actions
export const newCommentFetch = (comment, callback = () => {}) => {
   return dispatch => {
      const token = localStorage.token
      if (token) {
         return fetch(API + '/comments', {
            method: 'POST',
            headers: {
               Authorization: `Bearer ${token}`,
               'Content-Type': 'application/json'
            },
            body: JSON.stringify(comment)
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

export const getCommentFetch = (id, callback = () => {}) => {
   return dispatch => {
      const token = localStorage.token
      if (token) {
         return fetch(API + "/comments/" + id, {
            method: "GET",
            headers: {
               Authorization: `Bearer ${token}`
            },
         })
         .then(resp => resp.json())
         .then(data => {
            callback(data)
         })
         .catch(error => {
            console.error('Error:', error)
         })
      }
   }   
}

export const editCommentFetch = (comment, callback = () => {}) => {
   return dispatch => {
      const token = localStorage.token
      if (token) {
         return fetch(API + "/comments/" + comment.id, {
            method: "POST",
            headers: {
               Authorization: `Bearer ${token}`,
               'Content-Type': 'application/json'
            },
            body: JSON.stringify(comment)
         })
         .then(resp => resp.json())
         .then(data => {
            callback(data)
         })
         .catch(error => {
            console.error('Error:', error)
         })
      }
   }   
}

export const deleteCommentFetch = (id, callback = () => {}) => {
   return dispatch => {
      const token = localStorage.token
      if (token) {
         return fetch(API + '/comments/' + id, {
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

// post likes actions
export const postLikeFetch = (likeObj, callback = () => {}) => {
   return dispatch => {
      const token = localStorage.token
      if (token) {
         return fetch(API + '/postlikes', {
            method: 'POST',
            headers: {
               Authorization: `Bearer ${token}`,
               'Content-Type': 'application/json'
            },
            body: JSON.stringify(likeObj)
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

export const postUnlikeFetch = (id, callback = () => {}) => {
   return dispatch => {
      const token = localStorage.token
      if (token) {
         return fetch(API + '/postlikes/' + id, {
            method: 'DELETE',
            headers: {
               Authorization: `Bearer ${token}`,
               'Content-Type': 'application/json'
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

// comment like actions
export const commentLikeFetch = (likeObj, callback = () => {}) => {
   return dispatch => {
      const token = localStorage.token
      if (token) {
         return fetch(API + '/commentlikes', {
            method: 'POST',
            headers: {
               Authorization: `Bearer ${token}`,
               'Content-Type': 'application/json'
            },
            body: JSON.stringify(likeObj)
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

export const commentUnlikeFetch = (id, callback = () => {}) => {
   return dispatch => {
      const token = localStorage.token
      if (token) {
         return fetch(API + '/commentlikes/' + id, {
            method: 'DELETE',
            headers: {
               Authorization: `Bearer ${token}`,
               'Content-Type': 'application/json'
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

/* eslint-enable no-unused-vars*/
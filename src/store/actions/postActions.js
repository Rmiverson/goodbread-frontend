const API = "http://localhost:3000/api/v1"

export const allPostsFetch = (callback = () => {}) => {
   return async dispatch => {
      const token = localStorage.token
      if (token) {
         try {
            const resp = await fetch(API + "/posts", {
               method: "GET",
               headers: {
                  Authorization: `Bearer ${token}`
               },
            })
            const data = await resp.json()
            dispatch(posts(data))
            callback()
         } catch (error) {
            console.error('Error:', error)
         }
      }
   }
}

export const getPostFetch = (id, callback = () => {}) => {
   return async () => {
      const token = localStorage.token
      if (token) {
         try {
            const resp = await fetch(API + "/posts/" + id, {
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

export const newPostFetch = (post, callback = () => {}) => {
   return async () => {
      const token = localStorage.token
      if (token) {
         try {
            const resp = await fetch(API + "/posts", {
               method: "POST",
               headers: {
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'application/json',
                  Accept: 'application/json'
               },
               body: JSON.stringify(post)
            })
            const data = await resp.json()
            callback(data)
         } catch (error) {
            console.error('Error:', error)
         }
      }
   }
}

export const getUserPosts = (user, callback = () => {}) => {
   return async () => {
      const token = localStorage.token
      const userId = user.id
      if (token) {
         try {
            const resp = await fetch(API + '/userposts/' + userId, {
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

export const updatePostFetch = (post, callback = () => {}) => {
   return async () => {
      const token = localStorage.token
      const postId = post.id
      if (token) {
         try {
            const resp = await fetch(API + '/posts/' + postId, {
               method: 'POST',
               headers: {
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'application/json'
               },
               body: JSON.stringify(post)
            })
            await resp.json()
            callback()
         } catch (error) {
            console.error('Error:', error)
         }
      }
   }
}

export const deletePost = (id, callback = () => {}) => {
   return async () => {
      const token = localStorage.token
      if (token) {
         try {
            const resp = await fetch(API + '/posts/' + id, {
               method: 'DELETE',
               headers: {
                  Authorization: `Bearer ${token}`
               }
            })
            await resp.json()
            callback()
         } catch (error) {
            console.error('Error:', error)
         }
      }
   }
}

export const postLikeFetch = (likeObj, callback = () => {}) => {
   return async () => {
      const token = localStorage.token
      if (token) {
         try {
            const resp = await fetch(API + '/postlikes', {
               method: 'POST',
               headers: {
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'application/json'
               },
               body: JSON.stringify(likeObj)
            })
            await resp.json()
            callback()
         } catch (error) {
            console.error('Error:', error)
         }
      }
   }
}

export const postUnlikeFetch = (id, callback = () => {}) => {
   return async () => {
      const token = localStorage.token
      if (token) {
         try {
            const resp = await fetch(API + '/postlikes/' + id, {
               method: 'DELETE',
               headers: {
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'application/json'
               }
            })
            await resp.json()
            callback()
         } catch (error) {
            console.error('Error:', error)
         }
      }
   }
}

export const posts = dataObj => ({
   type: 'ALL_POSTS',
   payload: dataObj
})
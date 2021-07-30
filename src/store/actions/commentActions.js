const API = "http://localhost:3000/api/v1/"

export const newCommentFetch = (comment, callback = () => {}) => {
   return async () => {
      const token = localStorage.token
      if (token) {
         try {
            const resp = await fetch(API + '/comments', {
               method: 'POST',
               headers: {
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'application/json'
               },
               body: JSON.stringify(comment)
            })
            await resp.json()
            callback()
         } catch (error) {
            console.error('Error:', error)
         }
      }
   }
}

export const getCommentFetch = (id, callback = () => {}) => {
   return async () => {
      const token = localStorage.token
      if (token) {
         try {
            const resp = await fetch(API + "/comments/" + id, {
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

export const editCommentFetch = (comment, callback = () => {}) => {
   return async () => {
      const token = localStorage.token
      if (token) {
         try {
            const resp = await fetch(API + "/comments/" + comment.id, {
               method: "POST",
               headers: {
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'application/json'
               },
               body: JSON.stringify(comment)
            })
            const data = await resp.json()
            callback(data)
         } catch (error) {
            console.error('Error:', error)
         }
      }
   }   
}

export const deleteCommentFetch = (id, callback = () => {}) => {
   return async () => {
      const token = localStorage.token
      if (token) {
         try {
            const resp = await fetch(API + '/comments/' + id, {
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

export const commentLikeFetch = (likeObj, callback = () => {}) => {
   return async () => {
      const token = localStorage.token
      if (token) {
         try {
            const resp = await fetch(API + '/commentlikes', {
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

export const commentUnlikeFetch = (id, callback = () => {}) => {
   return async () => {
      const token = localStorage.token
      if (token) {
         try {
            const resp = await fetch(API + '/commentlikes/' + id, {
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
const API = "http://localhost:3000/api/v1/"

export const followUserFetch = (relationship, callback = () => {}) => {
   return async () => {
      const token = localStorage.token
      if (token) {
         try {
            const resp = await fetch(API + 'relationships', {
               method: "POST",
               headers: {
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'application/json',
                  Accept: 'application/json'
               },
               body: JSON.stringify(relationship)
            })
            await resp.json()
            callback()
         } catch (error) {
            console.error('Error:', error)
         }
      }      
   }
}

export const unfollowUserFetch = (relationship, callback = () => {}) => {
   return async () => {
      const token = localStorage.token
      if (token) {
         try {
            const resp = await fetch(API + 'relationships', {
               method: "DELETE",
               headers: {
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'application/json'
               },
               body: JSON.stringify(relationship)
            })
            await resp.json()
            callback()
         } catch (error) {
            console.error('Error:', error)
         }
      }      
   }
}
import React, { createRef, useEffect } from 'react'

const Loading = () => {
   const loadingRef = createRef()

   useEffect(() => {
      loadingRef.current.focus()
   },[])

   return (
      <div className='loading'>
         <span ref={loadingRef} tabIndex='0'>Loading...</span>
      </div>
   )
}

export default Loading
import React, { createRef, useEffect } from 'react'

const Loading = (props) => {
   const loadingRef = createRef()

   useEffect(() => {
      loadingRef.current.focus()
   },[])

   console.log('hit', props.sequence)
   return (
      <div className='loading'>
         <span ref={loadingRef} tabIndex='0'>Loading...</span>
      </div>
   )
}

export default Loading
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
// import { Redirect } from 'react-router-dom'
// import { newPostFetch } from '../store/actions/postActions'

const NewPost = () => {
   // const [submitted, setSubmitted] = useState(false)
   // const [postId, setPostId] = useState('')


   const [ingredients, setIngredients] = useState([])
   // const [title, setTitle] = useState('')
   // const [intro, setsetInro] = useState('')

   const currentUser = useSelector((state) => state.currentUser)
   // const dispatch = useDispatch()

   // const updateIdCallback = useCallback(
   //    (post) => {
   //       setPostId(post.id)
   //       setSubmitted(true)
   //    }
   // )

   const handleSubmit = (e) => {
      e.preventDefault()

      let newPostObj = {
         user_id: currentUser.id,
         title: sanitize(e.target.title.value),
         introduction: sanitize(e.target.introduction.value)
      }
      console.log(ingredients)
      console.log(newPostObj)
      // dispatch(newPostFetch(newPostObj, updateIdCallback))
   }

   const sanitize = (text) => {
      let sanitized = text.replace("<script>", "")
      sanitized = sanitized.replace("</script>", "")
      return sanitized
   }

   const renderReRoute = () => {
      // return (submitted && <Redirect to={`/post/${postId}`} />)
   }

   const renderIngredients = () => {
      return ingredients.map(ingredient => {
         return {ingredient}
      })
   }

   const addIngredient = (e) => {
      e.preventDefault()


   }

   return (
      <div className='new-post-page'>
         <h2>New Recipe Post</h2>
         <form className='new-post-form' onSubmit={handleSubmit}>
            <label>Title</label>
            <input required type='text' name='title' id='new-post-title' defaultValue=''/>

            <label>Introduction</label>
            <textarea required name='introduction' rows='10' cols='30' id='new-post-introduction' defaultValue=''/>

            <label>Ingredients</label>
            <ul>
               {renderIngredients()}
            </ul>
            <input type='text' name='ingredient' defaultValue='' />
            <input type='button' value='Add Ingredient' onClick={addIngredient}/>

            <input type='submit' value='Submit' className='submit-btn'/>
         </form>
         {/* {renderReRoute()} */}
      </div>
   )
}

export default NewPost
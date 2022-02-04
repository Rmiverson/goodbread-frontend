import React, { useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { newPostFetch } from '../store/actions/postActions'

const NewPost = () => {
   const [submitted, setSubmitted] = useState(false)
   const [postId, setPostId] = useState('')
   const [data, setData] = useState({
      contents: [{heading: '', text: ''}],
      ingredients: [{name: '', amount: 0}],
      instructions: [''],
      tags: ['']
   })

   const currentUser = useSelector((state) => state.currentUser)
   const dispatch = useDispatch()

   const updateIdCallback = useCallback(
      (post) => {
         setPostId(post.id)
         setSubmitted(true)
      }
   )    
   
   // ingredients
    const handleIngredientNameChange = (index) => (e) => {
        const newIngredients = data.ingredients.map((ingredient, sIndex) => {
            if (index !== sIndex) return ingredient
            return {...ingredient, name: e.target.value}
        })
        setData({...data, ingredients: newIngredients})
    }

    const handleIngredientAmountChange = (index) => (e) => {
        const newIngredients = data.ingredients.map((ingredient, sIndex) => {
            if (index !== sIndex) return ingredient
            return {...ingredient, amount: e.target.value}
        })
        setData({...data, ingredients: newIngredients})
    }

    const handleAddIngredient = () => {
        setData({...data, ingredients: [...data.ingredients, {name: '', amount: 0}]})
    }

    const handleRemoveIngredient = (index) => () => {
        setData({...data, ingredients: data.ingredients.filter((s, sIndex) => index !== sIndex)})
    }

    // instructions
    const handleInstructionChange = (index) => (e) => {
        const newInstructions = data.instructions.map((instruction, sIndex) => {
            if (index !== sIndex) return instruction
            return e.target.value
        })
        setData({...data, instructions: newInstructions})
    }

    const handleAddInstruction = () => {
        setData({...data, instructions: [...data.instructions, '']})
    }

    const handleRemoveInstruction = (index) => () => {
        setData({...data, instructions: data.instructions.filter((s, sIndex) => index !== sIndex)})
    }

    // tags
    const handleTagChange = (index) => (e) => {
        const newTags = data.tags.map((tag, sIndex) => {
            if (index !== sIndex) return tag
            return e.target.value            
        })
        setData({...data, tags: newTags})
    }

    const handleAddTag = () => {
        setData({...data, tags: [...data.tags, '']})
    }

    const handleRemoveTag = (index) => () => {
        setData({...data, tags: data.tags.filter((s, sIndex) => index !== sIndex)})
    }

    // content
    const handleContentsHeadingChange = (index) => (e) => {
        const newContents = data.contents.map((content, sIndex) => {
            if (index !== sIndex) return content
            return {...content, heading: e.target.value}
        })
        setData({...data, contents: newContents})
    }

    const handleContentsTextChange = (index) => (e) => {
        const newContents = data.contents.map((content, sIndex) => {
            if (index !== sIndex) return content
            return {...content, text: e.target.value}
        })
        setData({...data, contents: newContents})
    }

    const handleAddContent = () => {
        setData({...data, contents: [...data.contents, {heading: '', text: ''}]})
    }

    const handleRemoveContent = (index) => () => {
        setData({...data, contents: data.contents.filter((s, sIndex) => index !== sIndex)})
    }

    const renderReRoute = () => {
      return (submitted && <Redirect to={`/post/${postId}`} />)
   }

    const submitPost = (e) => {
        e.preventDefault()

        let postData = {
            user_id: currentUser.id,
            title: e.target.title.value,
            contents: data.contents,
            ingredients: data.ingredients,
            instructions: data.instructions,
            tags: data.tags
        }

      //   console.log(postData)
        dispatch(newPostFetch(postData, updateIdCallback))
    }

    return (
        <div className='new-post-page'>
            <form id='new-post-form' onSubmit={submitPost}>
                <label>Title</label>
                <input required type='text' name='title' defaultValue=''  />

                {/* content */}
                <label>Text Content</label>
                {data.contents.map((content, index) => (
                    <div key={index} className='content'>
                        <input 
                            type='text'
                            placeholder='heading'
                            value={content.heading}
                            onChange={handleContentsHeadingChange(index)}
                        />
                        <input 
                            type='text'
                            placeholder={'text'}
                            value={content.text}
                            onChange={handleContentsTextChange(index)}
                        />
                        <button
                            type='button'
                            onClick={handleRemoveContent(index)}
                        >
                            -
                        </button>
                    </div>
                ))}
                <button
                    type='button'
                    onClick={handleAddContent}
                >
                    Add Text Content
                </button>

                {/* ingredients */}
                <label>Ingredients</label>
                {data.ingredients.map((ingredient, index) => (
                    <div key={index} className='ingredient'>
                        <input
                            type='text'
                            placeholder={`Ingredient #${index + 1}`}
                            value={ingredient.name}
                            onChange={handleIngredientNameChange(index)}
                        />
                        <input
                            type='number'
                            placeholder={0}
                            value={ingredient.amount}
                            onChange={handleIngredientAmountChange(index)}
                        />
                        <button
                            type='button'
                            onClick={handleRemoveIngredient(index)}
                        >
                            -
                        </button>
                    </div>
                ))}
                <button
                    type='button'
                    onClick={handleAddIngredient}
                >
                    Add Ingredient
                </button>

                {/*  Instructions  */}
                <label>instructions</label>
                {data.instructions.map((instruction, index) => (
                    <div key={index} className='instruction'>
                        <input
                            type='text'
                            placeholder={`Instruction #${index + 1}`}
                            value={instruction}
                            onChange={handleInstructionChange(index)}
                        />
                        <button
                            type='button'
                            onClick={handleRemoveInstruction(index)}
                        >
                            -
                        </button>
                    </div>
                ))}
                <button
                    type='button'
                    onClick={handleAddInstruction}
                >
                    Add Instruction
                </button>

                {/* Tags */}
                <label>Tags</label>
                {data.tags.map((tag, index) => (
                    <div key={index} className='tags'> 
                        <input
                            type='text'
                            placeholder={`Tag #${index + 1}`}
                            value={tag}
                            onChange={handleTagChange(index)}
                        />
                        <button
                            type='button'
                            onClick={handleRemoveTag(index)}
                        >
                            -
                        </button>
                    </div>
                ))}
                <button
                    type='button'
                    onClick={handleAddTag}
                >
                    Add Tag
                </button>
            </form>   
            
            <input form='new-post-form' type='submit' value='Submit Recipe' />
            {renderReRoute()}
        </div>
    )
}

export default NewPost
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const NewPost = () => {6
    const [ingredients, setIngredients] = useState([])
    const [instructions, setInstructions] = useState([])
    const [tags, setTags] = useState([])

    const currentUser = useSelector((state) => state.currentUser)

    const handleIngredientSubmit = (e) => {
        e.preventDefault()
        setIngredients([...ingredients, e.target.ingredient.value])
    }

    const handleInstructionSubmit = (e) => {
        e.preventDefault()
        setInstructions([...instructions, e.target.instruction.value])
    }

    const handleTagSubmit = (e) => {
        e.preventDefault()
        setTags([...tags, e.target.tag.value])
    }

    const submitPost = (e) => {
        e.preventDefault()

        let postData = {
            user_id: currentUser.id,
            title: e.target.title.value,
            introduction: e.target.introduction.value,
            conclusion: e.target.conclusion.value,
            ingredients: ingredients,
            instructions: instructions,
            tags: tags
        }

        if (postData.instructions.length <= 0 || postData.ingredients <= 0) {
            window.alert('Your ingredients or instructions cannot be empty.')
        } else if (postData.tags <= 0) {
            window.alert('You must have at least one tag.')
        }

        console.log(postData)
    }

    const renderList = (input) => {
        if (input.length <= 0) {
            return <li>Empty!</li>
        } else {
            return input.map((element, index) => {
                return <li key={index}>{element}</li>
            })            
        }
    }

    return (
        <div className='new-post-page'>
            <form id='new-post-form' onSubmit={submitPost}>
                <label>Title</label>
                <input required type='text' name='title' defaultValue=''  />

                <label>Introduction</label>
                <input required type='text' name='introduction' defaultValue='' />

                <label>Conclusion (optional)</label>
                <input type='text' name='conclusion' defaultValue='' />

            </form>

            <h4>Ingredients</h4>
            <ul id='ingredient-list'>
                {renderList(ingredients)}
            </ul>
            
            <form id='ingredient-form' onSubmit={handleIngredientSubmit}>
                <label>Add ingredient with the amount</label>
                <input required type='text' name='ingredient' defaultValue='' />
                
                <input type='submit' value='Add' />
            </form>

            <h4>Instructions</h4>
            <ol id='instructions-list'>
                {renderList(instructions)}
            </ol>

            <form id='instruction-form' onSubmit={handleInstructionSubmit}>
                <label>Add an instruction</label>
                <input required type='text' name='instruction' defaultValue='' />

                <input type='submit' value='Add' />
            </form>

            <h4>Tags</h4>
            <ul id='tag-list'>
                {renderList(tags)}
            </ul>

            <form id='tag-form' onSubmit={handleTagSubmit}>
                <label>Add a tag (Pizza, Italian, Dinner, Etc...)</label>
                <input required type='text' name='tag' defaultValue='' />
                <input type='submit' value='add' />
            </form>
            
            <input form='new-post-form' type='submit' value='Submit Recipe' />
        </div>
    )
}

export default NewPost
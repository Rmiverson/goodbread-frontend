import React, { useState } from 'react'
// import { useSelector } from 'react-redux'

const NewPost = () => {
    // const [ingredients, setIngredients] = useState([])
    // const [instructions, setInstructions] = useState([])
    // const [tags, setTags] = useState([])

    const [data, setData] = useState({
        title: '',
        introduction: '',
        conclusion: '',
        ingredients: [{name: '', amount: 0}],
        instructions: [],
        tags: []
    })
    console.log(data)
    // const currentUser = useSelector((state) => state.currentUser)

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
    // const handleInstructionSubmit = (e) => {
    //     e.preventDefault()

    //     setInstructions([...instructions, e.target.instruction.value])
    // }

    // const handleTagSubmit = (e) => {
    //     e.preventDefault()
    //     setTags([...tags, e.target.tag.value])
    // }

    const submitPost = (e) => {
        e.preventDefault()

        // let postData = {
        //     user_id: currentUser.id,
        //     title: e.target.title.value,
        //     introduction: e.target.introduction.value,
        //     conclusion: e.target.conclusion.value,
        //     ingredients: ingredients,
        //     instructions: instructions,
        //     tags: tags
        // }

        // if (postData.instructions.length <= 0 || postData.ingredients <= 0) {
        //     window.alert('Your ingredients or instructions cannot be empty.')
        // } else if (postData.tags <= 0) {
        //     window.alert('You must have at least one tag.')
        // }

        console.log(data)
    }

    // const renderList = (input) => {
    //     if (input.length <= 0) {
    //         return <li>Empty!</li>
    //     } else {
    //         return input.map((element, index) => {
    //             return <li key={index}>{element}</li>
    //         })            
    //     }
    // }

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

            {/* <h4>Ingredients</h4>
            <ul id='ingredient-list'>
                {renderList(ingredients)}
            </ul> */}
            
            <form id='ingredient-form'> 
                <h4>ingredients</h4>
                {data.ingredients.map((ingredient, index) => (
                    <div key={index} className='ingredient'>
                        <input
                            type='text'
                            placeholder={`Ingredient #${index + 1} name`}
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
            </form>

            {/* <h4>Instructions</h4>
            <ol id='instructions-list'>
                {renderList(instructions)}
            </ol> */}

            {/* <form id='instruction-form' onSubmit={handleInstructionSubmit}>
                <label>Add an instruction</label>
                <input required type='text' name='instruction' defaultValue='' />

                <input type='submit' value='Add' />
            </form> */}
{/* 
            <h4>Tags</h4>
            <ul id='tag-list'>
                {renderList(tags)}
            </ul> */}

            {/* <form id='tag-form' onSubmit={handleTagSubmit}>
                <label>Add a tag (Pizza, Italian, Dinner, Etc...)</label>
                <input required type='text' name='tag' defaultValue='' />
                <input type='submit' value='add' />
            </form> */}
            
            <input form='new-post-form' type='submit' value='Submit Recipe' />
        </div>
    )
}

export default NewPost
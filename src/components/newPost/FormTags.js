import React, { useState } from 'react'

const FormTags = (props) => {
    const [tags, setTags] = useState([''])

    const handleTagChange = (index) => (e) => {
        const newTags = tags.map((tag, sIndex) => {
            if (index !== sIndex) return tag
            return e.target.value            
        })
        setTags(newTags)
    }

    const handleAddTag = () => {
        setTags([...tags, ''])
    }

    const handleRemoveTag = (index) => () => {
        setTags(tags.filter((s, sIndex) => index !== sIndex))
    }

    return (
        <div className='tags-input'>
            <h3>Tags</h3>
            {tags.map((tag, index) => (
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
        </div>
    )
}

export default FormTags
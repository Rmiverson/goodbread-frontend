import React, { useState } from 'react'

const FormText = () => {
    const [subHeading, setSubHeading] = useState('')
    const [text, setText] = useState('')

    const handleSubHeadingChange = (e) => {
        setSubHeading(e.target.value)
    }
    
    const handleTextContentChange = (e) => {
        setText(e.target.value)
    }

    return (
        <div className='text-content-inputs'>
            <input 
                type='text'
                placeholder='Sub-Heading'
                value={subHeading}
                onChange={handleSubHeadingChange}
            />
            <input 
                type='text'
                placeholder='Content'
                value={text}
                onChange={handleTextContentChange}
            />
        </div>
    )
}

export default FormText
import React, { useState } from 'react'

const FormText = (props) => {
    const [subHeading, setSubHeading] = useState('')
    const [text, setText] = useState('')

    const handleSubHeadingChange = (e) => {
        setSubHeading(e.target.value)
    }
    
    const handleTextContentChange = (e) => {
        setText(e.target.value)
    }

    return (
        <div className='text-input-box' >
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

            <button
                type='button'
                onClick={props.selfDestruct(props.index)}
            >Remove text box</button>
        </div>
    )
}

export default FormText
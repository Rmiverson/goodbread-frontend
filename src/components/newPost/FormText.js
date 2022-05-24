import React, { useState, useEffect } from 'react'

const FormText = (props) => {
    const [subHeading, setSubHeading] = useState('')
    const [text, setText] = useState('')

    useEffect(() => {
        props.inputData.subHeading = subHeading
        props.inputData.text = text
    }, [subHeading, text])

    const handleSubHeadingChange = (e) => {
        setSubHeading(e.target.value)
    }
    
    const handleTextContentChange = (e) => {
        setText(e.target.value)
    }

    return (
        <div className='text-input-box' >
            <h4>Text Input</h4>
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
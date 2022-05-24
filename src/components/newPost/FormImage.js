import React, { useState, useEffect } from 'react'

const FormImage = (props) => {
    const [description, setDescription] = useState('')
    const [image, setImage] = useState(null)
    const [imageURL, setImageURL] = useState(null)

    console.log(props.data)

    useEffect(() => {
        props.inputData.description = description
        props.inputData.image = image
    }, [description, image]);

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value)
    }

    const onImageChange = (e) => {
        setImage(e.target.files[0])
        setImageURL(URL.createObjectURL(e.target.files[0]))
    }
    
    return(
        <div className='image-input-box'>
            <h4>Image Input</h4>
            <input
                type='text'
                placeholder='Image Description'
                value={description}
                onChange={handleDescriptionChange}
            />
            <input type='file' name='content-photo' accept='image/png, image/jpeg' onChange={onImageChange}/>

            <h5>Image Preview</h5>
            <img width={300} src={imageURL} />

            <button
                type='button'
                onClick={props.selfDestruct(props.index)}
            >Remove image</button>
        </div>
    )
}

export default FormImage
import React, { useState } from 'react'

const FormUl = (props) => {
    const [id] = useState(props.id)
    const [listContents, setListContent] = useState([''])

    console.log(listContents)

    const handleAddListItem = () => {
        setListContent([...listContents, ''])
    }

    const handleUlItemChange = (index) => (e) => {
        const newUlItems = listContents.map((content, sIndex) => {
            if (index !== sIndex) return content  
            return e.target.value
        })
        setListContent(newUlItems)
    }

    const handleRemoveUlItem = (index) => () => {
        setListContent(listContents.filter((s, sIndex) => index !== sIndex))
    }

    return(
        <ul key={id}>
            {listContents.map((listItem, index) => (
                <li key={index} className='list-item'>
                    <input 
                        type='text'
                        placeholder={`Item #${index + 1}`}
                        value={listItem}
                        onChange={handleUlItemChange(index)}
                    />
                    <button 
                        type='button'
                        onClick={handleRemoveUlItem(index)}
                    >-</button>
                </li>
            ))}
            <button
                type='button'
                onClick={handleAddListItem}
            >Add Item</button>
        </ul>  
    )
}

export default FormUl
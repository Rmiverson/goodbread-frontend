import React, { useState } from 'react'

const FormOl = (props) => {
    const [listHeader, setListHeader] = useState('')
    const [listContents, setListContent] = useState([''])

    const handleHeaderChange = (e) => {
        setListHeader(e.target.value)
    }

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
        <div className='ol-input-box' >
            <input
                type='text'
                placeholder='List Header'
                value={listHeader}
                onChange={handleHeaderChange}
            />
            <ol className='ol-inputs'>
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
            </ol>
            <button
                type='button'
                onClick={props.selfDestruct(props.index)}
            >Remove List</button>            
        </div>
    )
}

export default FormOl
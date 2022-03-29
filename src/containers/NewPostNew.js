import React, { useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { newPostFetch } from '../store/actions/postActions'

const NewPost = () => {
    const [submitted, setSubmitted] = useState(false)
    const [postId, setPostId] = useState('')
    const [data, setData] = useState({
        mainContent: {title: '', description: '', photo: ''},
        contents: [],
        tags: ['']
     })

    const currentUser = useSelector((state) => state.currentUser)
    const dispatch = useDispatch()

    //  text
    const textOnClick = () => { 
        setData({...data, contents: [...data.contents, {id: data.contents.length + 1, type: 'text', subHeading: '', text: ''}]})
    }

    const ulOnClick = () => { 
        setData({...data, contents: [...data.contents, {id: data.contents.length + 1, type: 'ul', listContent: ['']}]})
    }

    const olOnClick = () => { 
        setData({...data, contents: [...data.contents, {id: data.contents.length + 1, type: 'ol', listContent: ['']}]})
    }

    const contentImageOnClick = () => { 
        setData({...data, contents: [...data.contents, {id: data.contents.length + 1, type: 'image', imageContent: ''}]})
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

    const renderReRoute = () => {
        return (submitted && <Redirect to={`/post/${postId}`} />)
     }

    return (
        <div className='new-post-page'>
            <form>
                <div className='header-content'>
                    <label>Main Content Box</label> {/* temporary label */}
                    <input required type='text' name='title' defaultValue='' placeholder='Title' />   
                    <input type='text' name='shortDescription' defaultValue='' placeholder='Description' />
                    <input type='image' name='headerPhoto' width={48} height={48} /> 

                    <div className='content-ribbon'>
                        <label>Add Components</label>{/* temporary label */}
                        <button type='button' onClick={textOnClick}>Text Box</button>
                        <button type='button' onClick={ulOnClick}>Bullet List</button>
                        <button type='button' onClick={olOnClick}>Number List</button>
                        <button type='button' onClick={contentImageOnClick}>Image</button>
                    </div>      
                </div>

                <div className='main-content'>
                    {data.content.map((content, index) => {
                        if (content.type === 'text') {
                            return (
                                <div key={index} className='text-content-box'>
                                    
                                </div>                                 
                            )
                        } else if (content.type === 'ul') {
                            return (
                                <div key={index} className='ul-content-box'>

                                </div>                                 
                            )
                        } else if (content.type === 'ol') {
                            return (
                                <div key={index} className='ol-content-box'>

                                </div>                                 
                            )
                        } else if (content.type === 'image') {
                            return (
                                <div key={index} className='image-content-box'>

                                </div>                                 
                            )
                        } else {
                            console.error('bad content data type when mapping')
                        }
                    })}
                </div>

                <div className='tags'>
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
                </div>
            </form>

            <input form='new-post-form' type='submit' value='Submit Recipe' />
            {renderReRoute()}
        </div>
    )
}

export default NewPost
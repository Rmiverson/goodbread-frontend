import React, { useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import DraftTextBox from '../components/DraftTextBox'
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

    // contents set functions
    const textOnClick = () => {
        console.log('text')
        setData({...data, contents: [...data.contents, {id: data.contents.length + 1, type: 'text', subHeading: '', text: ''}]})
    }

    const ulOnClick = () => {
        console.log('ul')
        setData({...data, contents: [...data.contents, {id: data.contents.length + 1, type: 'ul', listContent: ['']}]})
    }

    const olOnClick = () => {
        console.log('ol')
        setData({...data, contents: [...data.contents, {id: data.contents.length + 1, type: 'ol', listContent: ['']}]})
    }

    const contentImageOnClick = () => {
        console.log('image')
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
    
    //renders
    const renderReRoute = () => {
        return (submitted && <Redirect to={`/post/${postId}`} />)
    }
    
    const renderTextForm = () => {
        return DraftTextBox()
    }

    return (
        <div className='new-post-page'>
            <form>
                <div className='header-content'>
                    <label>Main Header</label> {/* temporary label */}
                    <input required type='text' name='title' defaultValue='' placeholder='Title' />   
                    <input type='text' name='shortDescription' defaultValue='' placeholder='Description' />
                    <input type='file' name='headerPhoto' accept='image/png, image/jpeg'/> 

                    <div className='content-ribbon'>
                        <label>Add Components</label>{/* temporary label */}
                        <button type='button' onClick={textOnClick}>Text Box</button>
                        <button type='button' onClick={ulOnClick}>Bullet List</button>
                        <button type='button' onClick={olOnClick}>Number List</button>
                        <button type='button' onClick={contentImageOnClick}>Image</button>
                    </div>      
                </div>

                <div className='main-content'>
                    <label>Main Content</label>
                    {data.contents.map((content, index) => {
                        switch (content.type) {
                            case 'text':
                                return (
                                    <div key={index} className='text-content-box'>
                                        <DraftTextBox /> 
                                        {/* left off here working on draft text box */}
                                    </div>                                 
                                )
                            case 'ul':
                                return (
                                    <div key={index} className='ul-content-box'>
                                        <p>ul</p>
                                    </div>                                 
                                )
                            case 'ol':
                                return (
                                    <div key={index} className='ol-content-box'>
                                        <p>ol</p>
                                    </div>                                 
                                )
                            case 'image':
                                return (
                                    <div key={index} className='image-content-box'>
                                        <p>image</p>
                                    </div>                                 
                                )
                            default:
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
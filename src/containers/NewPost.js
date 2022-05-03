import React, { useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import FormImage from '../components/newPost/FormImage'
import FormOl from '../components/newPost/FormOl'
import FormTags from '../components/newPost/FormTags'
import FormText from '../components/newPost/FormText'
import FormUl from '../components/newPost/FormUl'
import { newPostFetch } from '../store/actions/postActions'

const NewPost = () => {
    const [submitted, setSubmitted] = useState(false)
    const [postId, setPostId] = useState('')
    const [idCounter, setIdCounter] = useState(0)
    const [data, setData] = useState({
        mainContent: {title: '', description: '', photo: ''},
        contents: []
    })

    const currentUser = useSelector((state) => state.currentUser)
    const dispatch = useDispatch()
    
    console.log(data)

    // contents set functions
    const textOnClick = () => {
        setIdCounter(idCounter + 1)
        setData({...data, contents: [...data.contents, {id: idCounter, type: 'text'}]})
    }

    const ulOnClick = () => {
        setIdCounter(idCounter + 1)
        setData({...data, contents: [...data.contents, {id: idCounter, type: 'ul'}]})
    }

    const olOnClick = () => {
        setIdCounter(idCounter + 1)
        setData({...data, contents: [...data.contents, {id: idCounter, type: 'ol', listContent: ['']}]})
    }

    const contentImageOnClick = () => {
        setIdCounter(idCounter + 1)
        setData({...data, contents: [...data.contents, {id: idCounter, type: 'image', imageContent: ''}]})
    }

    const handleRemove = (index) => () => {
        setData({...data, contents: data.contents.filter((s, sIndex) => index !== sIndex)})
    }

    //renders
    const renderReRoute = () => {
        return (submitted && <Redirect to={`/post/${postId}`} />)
    }
    

    return (
        <div className='new-post-page'>
            <form>
                <div className='header-content'>
                    <h3>Main Header</h3>
                    <input required type='text' name='title' defaultValue='' placeholder='Title' />   
                    <input type='text' name='shortDescription' defaultValue='' placeholder='Description' />
                    <input type='file' name='headerPhoto' accept='image/png, image/jpeg'/> 

                    <div className='content-ribbon'>
                        <h3>Add Components</h3>
                        <button type='button' onClick={textOnClick}>Text Box</button>
                        <button type='button' onClick={ulOnClick}>Bullet List</button>
                        <button type='button' onClick={olOnClick}>Number List</button>
                        <button type='button' onClick={contentImageOnClick}>Image</button>
                    </div>      
                </div>

                <div className='main-content'>
                    <h3>Main Content Inputs</h3>
                    {data.contents.map((content, index) => {
                        switch (content.type) {
                            case 'text':
                                return <FormText key={content.id} id={content.id} index={index} selfDestruct={handleRemove}/>
                            case 'ul':
                                return <FormUl key={content.id} id={content.id} index={index} selfDestruct={handleRemove}/>
                            case 'ol':
                                return <FormOl key={content.id} id={content.id} index={index} selfDestruct={handleRemove}/>
                            case 'image':
                                return <FormImage key={content.id} id={content.id} index={index} selfDestruct={handleRemove}/>
                            default:
                                console.error('bad content data type when mapping')
                        }
                    })}
                </div>

                <FormTags />

            </form>

            <input form='new-post-form' type='submit' value='Submit Recipe' />
            {renderReRoute()}
        </div>
    )
}

export default NewPost
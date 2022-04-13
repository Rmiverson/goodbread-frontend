import React from 'react'
// import ReactDOM from 'react-dom'
import {Editor, EditorState, RichUtils} from 'draft-js'
import 'draft-js/dist/Draft.css'

const DraftTextBox = () => {
    const [editorState, setEditorState] = React.useState(
        () => EditorState.createEmpty(),
    )

    const onChange = (editorState) => {
        setEditorState(editorState)
    }

    const handleKeyCommand = (command) => {
        const newState = RichUtils.handleKeyCommand(editorState, command)

        if (newState) {
            onChange(newState)
            return 'handled'
        }
        return 'not-handled'
    }

    return (
        <div className='editor-container'>

            <div className='editors'>
                <Editor 
                    editorState={editorState} 
                    handleKeyCommand={handleKeyCommand} 
                    onChange={onChange}
                />
            </div>
        </div>
    )
}

export default DraftTextBox
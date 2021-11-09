import React, { useEffect, useState } from 'react'
import '../assets/CreateBlog.css'
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';

import FroalaEditorComponent from '../../node_modules/react-froala-wysiwyg';
import { collection, addDoc } from "firebase/firestore"; 
import {db} from '../firebase'

// Include special components if required.
// import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';
// import FroalaEditorA from 'react-froala-wysiwyg/FroalaEditorA';
// import FroalaEditorButton from 'react-froala-wysiwyg/FroalaEditorButton';
// import FroalaEditorImg from 'react-froala-wysiwyg/FroalaEditorImg';
// import FroalaEditorInput from 'react-froala-wysiwyg/FroalaEditorInput';

// import CSVReader from 'react-csv-reader'



const config={
    placeholderText: 'Edit Your Content Here!',
    charCounterCount: true,
    toolbarButtons:{

        'moreText': {
      
          'buttons': ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'fontFamily', 'fontSize', 'textColor', 'backgroundColor', 'inlineClass', 'inlineStyle', 'clearFormatting']
      
        },
      
        'moreParagraph': {
      
          'buttons': ['alignLeft', 'alignCenter', 'formatOLSimple', 'alignRight', 'alignJustify', 'formatOL', 'formatUL', 'paragraphFormat', 'paragraphStyle', 'lineHeight', 'outdent', 'indent', 'quote']
      
        },
      
        'moreRich': {
      
          'buttons': ['insertLink', 'insertImage', 'insertVideo', 'insertTable', 'emoticons', 'fontAwesome', 'specialCharacters', 'embedly', 'insertFile', 'insertHR']
      
        },
      
        'moreMisc': {
      
          'buttons': ['undo', 'redo', 'fullscreen', 'print', 'getPDF', 'spellChecker', 'selectAll', 'html', 'help'],
      
          'align': 'right',
      
          'buttonsVisible': 6
      
        }
      
      }
  }

function CreateBlog() {
    if(window.localStorage.getItem('user')===null){
        window.location = '../login'
    }
    const currentuser = JSON.parse(window.localStorage.getItem('user'));
    const [model, setModel] = useState('')
    const [title, setTitle] = useState('')
    const [tags, setTags] = useState('')

    const handleModelChange = (model) =>{
        setModel(model)
    }


    const postBlog = () =>{
        if(window.localStorage.getItem('user')===null){
            window.location = '../login'
        }
        // console.log(title,tags,model);
        addDoc(collection(db, "blogs"), {
            title:title,
            tags:tags,
            content:model,
            user:currentuser.uid,
            timestamp:new Date()
        }).then((doc)=>{
            setTitle('')
            setModel('')
            setTags('')
            window.location = `../user/${currentuser.uid}`
        })
        .catch((error)=>{var e = error});
    }


    useEffect(() => {
        setInterval(() => {
            document.querySelector('.fr-element')?.previousElementSibling?.remove();
            document.querySelector('.fr-placeholder')?.remove();
        }, 100);
    })

    // const uploadposts = (data) =>{
    //     for(var i = 21000; i<data.length; i++){
    //         var time = new Date()
    //         if(data[i][8]&&data[i][7]&&data[i][2]&&data[i][0]){
    //             addDoc(collection(db, "blogs"), {
    //                 title:data[i][8],
    //                 tags:data[i][7],
    //                 content:data[i][2],
    //                 timestamp:time.getTime(),
    //                 author:data[i][0]
    //             }).then((doc)=>{
    //                 console.log(data[i],'uploaded');
    //             })
    //             .catch((error)=>console.log(error));
    //         }
    //     }
    // }

    return (
        <div className='createblog'>
            <div className='createblog_title'>
                <label htmlFor="title">Title -</label>
                <input onInput={(e)=>setTitle(e.target.value)} value={title} type="text" name='title' placeholder='Enter your title . . . ' />
            </div>
            <div className='createblog_title'>
                <label htmlFor="title">Tags -</label>
                <input onInput={(e)=>setTags(e.target.value)} value={tags} type="text" name='title' placeholder='Tags . . . ' />
            </div>
            <div className='editor'>
                <FroalaEditorComponent 
                    tag='textarea'
                    model={model}
			        onModelChange={handleModelChange}
                    config={config}
                    />
            </div>
            <div className='createblog_post' onClick={()=>postBlog()}>Post!</div>
            {/* <CSVReader onFileLoaded={(data, fileInfo, originalFile) => uploadposts(data)} /> */}
        </div>
    )
}

export default CreateBlog

import React, { useEffect, useRef } from 'react'
import { Editor } from '@tinymce/tinymce-react';
import * as Yup from 'yup';
import { withFormik } from 'formik';
import { connect, useSelector, useDispatch } from 'react-redux'
import { GET_ALL_PROJECT_CATEGORY_SAGA } from '../../../redux/constants/CyberBugs/CyberBugs';

function CreateProject(props) {

    const arrProjectCategory = useSelector(state => state.ProjectCategoryReducer.arrProjectCategory);

    const dispatch = useDispatch();

    const editorRef = useRef();

    const handleEditorChange = (content,edior) =>{
        setFieldValue('description', content)
    }

    const {
        handleChange,
        handleSubmit,
        setFieldValue
    } = props;

    useEffect(() => {
        dispatch({ type: GET_ALL_PROJECT_CATEGORY_SAGA })
    },);


    return (
        <div className='container m-5'>
            <h3>CreateProject</h3>
            <form onSubmit={handleSubmit} className='container'>
                <div className='form-group'>
                    <p>Name</p>
                    <input onChange={handleChange} className='form-control' name='projectName' />
                </div>
                <div className='form-group'>
                    <p>Description</p>
                    <Editor
                        onEditorChange={handleEditorChange}
                        tagName='description'
                        apiKey='your-api-key'
                        onInit={(evt, editor) => editorRef.current = editor}
                        init={{
                            height: 500,
                            menubar: false,
                            plugins: [
                                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                            ],
                            toolbar: 'undo redo | blocks | ' +
                                'bold italic forecolor | alignleft aligncenter ' +
                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                'removeformat | help',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                        }}
                    />
                </div>
                <div className='form-group'>
                    <select onChange={handleChange} name='categoryId' className='form-control'>
                        {arrProjectCategory.map((item, index) => {
                            return <option value={item.id} key={index}>{item.projectCategoryName}</option>
                        })}
                    </select>
                </div>
                <button className='btn btn-outline-primary' type='submit'>Create Project</button>
            </form>
        </div>
    )
}

const createProjectForm = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        return {
            projectName: '',
            description: '',
            categoryId: props.arrProjectCategory[0]?.id,
        }
    },
    validationSchema: Yup.object().shape({

    }),
    handleSubmit: (values, { props, setSubmitting }) => {
        props.dispatch({
            type: 'CREATE_PROJECT_SAGA',
            newProject: values
        })
    },
    displayName: 'CreateProjectFormik'
})(CreateProject);

const mapStateToProps = (state) => ({
    arrProjectCategory: state.ProjectCategoryReducer.arrProjectCategory
})

export default connect(mapStateToProps)(createProjectForm)
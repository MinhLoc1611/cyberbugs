import React,{useEffect, useRef} from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { useDispatch, connect, useSelector } from 'react-redux';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { GET_ALL_PROJECT_CATEGORY_SAGA, SET_SUBMIT_EDIT } from '../../../redux/constants/CyberBugs/CyberBugs';

function FormEditProject(props) {

    const dispatch = useDispatch();

    const arrProjectCategory = useSelector(state => state.ProjectCategoryReducer.arrProjectCategory);

    const {
        handleChange,
        values,
        handleSubmit,
        setFieldValue
    } = props;

    const handleEditorChange = (content,edior) =>{
        setFieldValue('description', content)
    }

    useEffect(()=>{

        dispatch({ type: GET_ALL_PROJECT_CATEGORY_SAGA })
        
        dispatch({
            type:SET_SUBMIT_EDIT,
            submitFunction:handleSubmit
        })
    })

    const editorRef = useRef();

  return (
    <form className='container-fluid' onSubmit={handleSubmit}>
        <div className='row'>
            <div className='col-2'>
                <div className='form-group'>
                    <p className='font-weight-bold'>ID</p>
                    <input value={values.id} disabled className='form-control' name='id'/>
                </div>
            </div>
            <div className='col-5'>
                <div className='form-group'>
                    <p className='font-weight-bold'>Project Name</p>
                    <input value={values.projectName} onChange={handleChange} className='form-control' name='projectName'/>
                </div>
            </div>
            <div className='col-5'>
                <div className='form-group'>
                <p className='font-weight-bold'>Category ID</p>
                <select value={values.categoryId} name='categoryId' className='form-control'>
                        {arrProjectCategory.map((item, index) => {
                            return <option value={item.id} key={index}>{item.projectCategoryName}</option>
                        })}
                    </select>
                </div>
            </div>
            <div className='col-12'>
                <div className='form-group'>
                <p className='font-weight-bold'>Description</p>
                <Editor
                        onEditorChange={handleEditorChange}
                        tagName='description'
                        apiKey='your-api-key'
                        onInit={(evt, editor) => editorRef.current = editor}
                        initialValue={values.description}
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
            </div>
        </div>
    </form>
  )
}

const editProjectForm = withFormik({
    enableReinitialize:true,
    mapPropsToValues: (props) => {
        const {projectEdit} = props
        return {
            id:projectEdit?.id,
            projectName:projectEdit.projectName,
            description:projectEdit.description,
            categoryId:projectEdit.categoryId
        }
    },
    validationSchema: Yup.object().shape({

    }),
    handleSubmit: (values, { props, setSubmitting }) => {
       const action = {
        type:'UPDATE_PROJECT_SAGA',
        projectUpdate:values
       }
       props.dispatch(action)
    },
    displayName: 'EditProjectForm'
})(FormEditProject);

const mapStateToProps = (state) =>({
    projectEdit:state.ProjectReducer.projectEdit
})

export default connect(mapStateToProps)(editProjectForm)
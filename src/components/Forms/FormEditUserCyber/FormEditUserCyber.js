import React, { useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { SET_SUBMIT_EDIT } from '../../../redux/constants/CyberBugs/CyberBugs';
import { EDIT_USER_CYBER_API } from '../../../redux/constants/CyberBugs/UserConstants';


function FormEditUserCyber(props) {

    const {
        errors,
        handleChange,
        values,
        handleSubmit
    } = props;

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch({
            type:SET_SUBMIT_EDIT,
            submitFunction:handleSubmit
        })
    },[])

    return (
        <form onSubmit={handleSubmit} className='container-fluid'>
            <div className='form-group row'>
                <label htmlFor='userId' className='col-2 col-form-label font-weight-bold'>User ID</label>
                <div className='col-10'>
                    <input value={values.id} readOnly name='id' className="form-control" id="userId" />
                </div>
            </div>
            <div className='form-group row'>
                <label htmlFor='userEmail' className='col-2 col-form-label font-weight-bold'>Email</label>
                <div className='col-10'>
                    <input onChange={handleChange} value={values.email} name='email' className="form-control" id="userEmail" />
                </div>
                <div className='text-danger'>{errors.email}</div>
            </div>
            <div className='form-group row'>
                <label htmlFor='userPassword' className='col-2 col-form-label font-weight-bold'>Password</label>
                <div className='col-10'>
                    <input onChange={handleChange} value={values.passWord} type='password' name='passWord' className="form-control" id="userPassword" />
                </div>
                <div className='text-danger'>{errors.passWord}</div>
            </div>
            <div className='form-group row'>
                <label htmlFor='userName' className='col-2 col-form-label font-weight-bold'>Name</label>
                <div className='col-10'>
                    <input onChange={handleChange} value={values.name} name='name' className="form-control" id="userName" />
                </div>
                <div className='text-danger'>{errors.name}</div>
            </div>
            <div className='form-group row'>
                <label htmlFor='phoneNumber' className='col-2 col-form-label font-weight-bold'>Phone</label>
                <div className='col-10'>
                    <input onChange={handleChange} value={values.phoneNumber} type='tel' name='phoneNumber' className="form-control" id="phoneNumber" />
                </div>
                <div className='text-danger'>{errors.phoneNumber}</div>
            </div>
        </form>
    )
}

const editUserForm = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        const { userEdit } = props
        return {
            id: userEdit.userId,
            email: userEdit.email,
            passWord:'',
            name: userEdit.name,
            phoneNumber: userEdit.phoneNumber
        }
    },
    validationSchema: Yup.object().shape({
        email: Yup.string().required('Email is required!').email('email is invalid!'),
        passWord: Yup.string().min(6, 'password must have min 6 characters').max(32, 'password have max 32 characters'),
        name:Yup.string().required('name is required!').max(32, 'name have max 32 characters'),
        phoneNumber:Yup.string().min(10, 'phoneNumber must have min 10 characters').max(11, 'phoneNumber have max 11 characters'),
    }),
    handleSubmit: (values, { props, setSubmitting }) => {
        const action = {
            type:EDIT_USER_CYBER_API,
            userEdit:values
           }
           props.dispatch(action)
    },
    displayName: 'Edit User Cyber'
})(FormEditUserCyber);

const mapStateToProps = (state) => ({
    userEdit: state.UserCyberBugReducer.userEdit
})

export default connect(mapStateToProps)(editUserForm)
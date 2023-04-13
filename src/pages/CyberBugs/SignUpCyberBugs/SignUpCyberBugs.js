import React from 'react'
import { Input, Button } from 'antd';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux'
import { UserOutlined, LockOutlined, PhoneOutlined, SmileOutlined } from '@ant-design/icons';
import { signUpCyberBugsAction } from '../../../redux/actions/CyberBugsActions';

function SignUpCyberBugs(props) {
 
    const {
        errors,
        handleChange,
        handleSubmit,
    } = props;

    return (
        <form onSubmit={handleSubmit} className='container' style={{ height: window.innerHeight }}>
            <div className='d-flex justify-content-center flex-column align-items-center' style={{ height: window.innerHeight }}>
                <h3 className='text-center'>Register Cyber Bugs</h3>
                <div className='d-flex mt-3'>
                    <Input onChange={handleChange} style={{ minWidth: 300 }} name="email" size="large" placeholder="email" prefix={<UserOutlined />} />
                </div>
                <div className='text-danger'>{errors.email}</div>
                <div className='d-flex mt-3'>
                    <Input onChange={handleChange} style={{ minWidth: 300 }} type='password' name="password" size="large" placeholder="password" prefix={<LockOutlined />} />
                </div>
                <div className='text-danger'>{errors.password}</div>
                <div className='d-flex mt-3'>
                    <Input onChange={handleChange} style={{ minWidth: 300 }} type='name' name="name" size="large" placeholder="name" prefix={<SmileOutlined />} />
                </div>
                <div className='text-danger'>{errors.name}</div>
                <div className='d-flex mt-3'>
                    <Input onChange={handleChange} style={{ minWidth: 300 }} type='number' name="phoneNumber" size="large" placeholder="phoneNumber" prefix={<PhoneOutlined />} />
                </div>
                <div className='text-danger'>{errors.phoneNumber}</div>
                <Button htmlType='submit' style={{ minWidth: 300 }} size='large' className='mt-4 btn-info'>Register</Button>
            </div>
        </form>
    )
}


const SignUpCyberBugsWithFormik = withFormik({
    mapPropsToValues: () => ({
        email: '',
        password: '',
        name:'',
        phoneNumber:''
    }),
    validationSchema: Yup.object().shape({
        email: Yup.string().required('Email is required!').email('email is invalid!'),
        password: Yup.string().min(6, 'password must have min 6 characters').max(32, 'password have max 32 characters'),
        name:Yup.string().required('name is required!').max(32, 'name have max 32 characters'),
        phoneNumber:Yup.string().min(10, 'phoneNumber must have min 10 characters').max(11, 'phoneNumber have max 11 characters'),
    }),

    handleSubmit: ({ email, password, name, phoneNumber }, { props, setSubmitting }) => {
        setSubmitting(true)
        props.dispatch(signUpCyberBugsAction(email,password,name,phoneNumber))
    },

    displayName: 'Sign Up CyberBugs',
})(SignUpCyberBugs);

export default connect()(SignUpCyberBugsWithFormik);


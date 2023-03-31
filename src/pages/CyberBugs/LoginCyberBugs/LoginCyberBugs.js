import React from 'react'
import { UserOutlined, LockOutlined, TwitterOutlined } from '@ant-design/icons';
import { Input, Button } from 'antd';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux'
import {siginCyberBugsAction} from "../../../redux/actions/CyberBugsActions.js"


function LoginCyberBugs(props) {



    const {
        errors,
        handleChange,
        handleSubmit,
    } = props;

    return (
        <form onSubmit={handleSubmit} className='container' style={{ height: window.innerHeight }}>
            <div className='d-flex justify-content-center flex-column align-items-center' style={{ height: window.innerHeight }}>
                <h3 className='text-center'>Login Cyber Bugs</h3>
                <div className='d-flex mt-3'>
                    <Input onChange={handleChange} style={{ minWidth: 300 }} name="email" size="large" placeholder="email" prefix={<UserOutlined />} />
                </div>
                <div className='text-danger'>{errors.email}</div>
                <div className='d-flex mt-3'>
                    <Input onChange={handleChange} style={{ minWidth: 300 }} type='password' name="password" size="large" placeholder="password" prefix={<LockOutlined />} />
                </div>
                <div className='text-danger'>{errors.password}</div>
                <Button htmlType='submit' style={{ minWidth: 300 }} size='large' className='mt-4 btn-info'>Login</Button>
                <div className='social mt-3 d-flex'>
                    <Button type="primary" shape="circle"><span className='font-weight-bold'>F</span></Button>
                    <Button type="primary ml-3" shape="circle" icon={<TwitterOutlined />}></Button>
                </div>
            </div>
        </form>
    )
}


const LoginCyberBugsWithFormik = withFormik({
    mapPropsToValues: () => ({
        email: '',
        password: ''
    }),
    validationSchema: Yup.object().shape({
        email: Yup.string().required('Email is required!').email('email is invalid!'),
        password: Yup.string().min(6, 'password must have min 32 characters').max(16, 'password have max 32 characters')
    }),

    handleSubmit: ({ email, password }, { props, setSubmitting }) => {

        setSubmitting(true)
        props.dispatch(siginCyberBugsAction(email,password))
    },

    displayName: 'Login CyberBugs',
})(LoginCyberBugs);

export default connect()(LoginCyberBugsWithFormik);
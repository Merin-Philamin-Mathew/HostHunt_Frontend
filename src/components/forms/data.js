
import * as Yup from 'yup'

let LogForm_Data = {
    INITIAL_VALUES : {
        email: '',
        password: ''
      },

    VALIDATION_SCHEMA: 
            Yup.object({
                email: Yup.string()
                .email('Invalid email address')
                .required('Required'),
                password: Yup.string()
                .min(6, 'Password must be at least 6 characters')
                .required('Required')
            })
}

let RegForm_Data = {
    INITIAL_VALUES : {
      full_name: '',
      dob: '',
      email: '',
      password: '',
      confirmPassword: ''
    },

    VALIDATION_SCHEMA: 
        Yup.object({
        name: Yup.string()
            .required('Name is required'),
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters long')
            .required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm password is required')
        })
    
}
let OTP_Form_Data = {
    INITIAL_VALUES : {
        otp: ['', '', '', '', '', ''],
      },

    VALIDATION_SCHEMA: 
    Yup.object({
        otp: Yup.array().of(
          Yup.string()
            .matches(/^[0-9]$/, 'Must be a number')
            .required('OTP is required')
        ),
      })
    
}

export {LogForm_Data,RegForm_Data ,OTP_Form_Data}
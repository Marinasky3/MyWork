import { StyledLink } from '../../components/Link/StyledLink';
import {Link} from 'react-router-dom'
import Tooltip from '@material-ui/core/Tooltip';
import React from 'react';
import { useState } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, InputAdornment, IconButton, OutlinedInput } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { Formik, ErrorMessage  } from 'formik';
import * as yup from 'yup';
import styles from './NewPassword.module.scss'
import classNames from 'classnames';
import { ToolTipAlert } from '../../components/ToolTipAlert/ToolTipAlert';
import { withStyles } from '@material-ui/core';
import { Redirect } from 'react-router'
import { CircleLoader} from '../../components/Loader/CircleLoader'
const useStyles = makeStyles({
    button:{
        marginTop: '24px',
        width: `84px`,
        height: `41px`,
        background: 'linear-gradient(285.98deg, #0E7CAA -57.07%, #0CE2E2 199.89%)',
        fontFamily: `Barlow`,
        fontStyle: 'normal',
        fontWeight: `normal`,
        fontSize: `14px`,
        lineHeight: `17px`,
    },
    customWidth: {
        width: '304px',
        fontFamily: `Barlow`,
        fontStyle: `normal`,
        fontWeight: `normal`,
        fontSize: `14px`,
        lineHeight: `17px`,
        background: 'rgba(34, 53, 64, 1)'
      },
    tooltipHeader:{
        fontFamily: 'Barlow',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '16px',
        lineHeight: '140%',
        color:' #E9F7FF',
    },
    tooltipBody:{
        marginLeft: '-12px',
        fontFamily: 'Barlow',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '14px',
        lineHeight: '17px',
        textAlign: 'left',
        color: '#7CB3BF',
    },
    tooltipFooter:{
        fontFamily: 'Barlow',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '14px',
        lineHeight: '17px',
        color: 'rgba(227, 24, 99, 1)',
    },
    root: {
        width: '325px',
        height: `56px`,
       
        fontFamily: 'Barlow',
        fontStyle: `normal`,
        fontWeight: `normal`,
        lineHeight: `140%`,
        backgroundColor: `rgba(36, 33, 34, 1)`,
      "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
        borderColor: "rgba(32, 64, 74, 1)",
        fontSize: '16px !important'
         
      },
      "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
        borderColor:  `rgba(13, 185, 204, 1)`,
    
      },
      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "rgba(13, 185, 204, 1)",
       
      },
      "&   .MuiInputLabel-outlined": {
        fontSize: '16px !important'
       
      },
      "& .MuiOutlinedInput-input": {
        color: "rgba(124, 179, 191, 1) ",
        fontSize: '16px !important',
      },
      "&:hover .MuiOutlinedInput-input": {
        color: "rgba(124, 179, 191, 1)"
      },
      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
        color: "white",
       
      },
      "& .MuiInputLabel-outlined": {
        color: "rgba(124, 179, 191, 1)"
      },
      "&:hover .MuiInputLabel-outlined": {
        color: "rgba(124, 179, 191, 1)"
      },
      "& .MuiInputLabel-outlined.Mui-focused": {
        color: "rgba(13, 185, 204, 1)"
      },
      "& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline": {
        borderColor: "rgba(227, 24, 99, 1)"
      },
      "& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-input": {
        color: "white"
      },
      "& .MuiInputLabel-outlined.Mui-error": {
        color: "rgba(227, 24, 99, 1)"
      },
    }
  });

  export default function NewPassword({ setIsAuthenticated }) {
    const myPassRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,255}$/
    const validationSchema = yup.object().shape({
        password: yup.string().matches(myPassRegex, 6).required('default'),   
        confirmPassword: yup.string().oneOf([yup.ref('password'), null], 5).required(5),
    }) 
    // yup.string()
    const [showLoader, setShowLoader] = useState(false)
    const [redirect, setRedirect] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);
    
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    const handleClickShowPasswordConfirm = () => setShowPasswordConfirm(!showPasswordConfirm);
    const handleMouseDownPasswordConfirm = () => setShowPasswordConfirm(!showPasswordConfirm);

    const [showPasswordToolTip, setShowPasswordToolTip] = useState(false);
    const handleShowPasswordToolTip = () => setShowPasswordToolTip(!showPasswordToolTip);
    
    const [showConfirmPasswordToolTip, setShowConfirmPasswordToolTip] = useState(false);
    const handleShowConfirmPasswordToolTip = () => setShowConfirmPasswordToolTip(!showConfirmPasswordToolTip);

    async function sendToDb(data, url){
      setShowLoader(true)
        try {
            let token = query().get('token');
            let email = query().get('email');

            let req = await fetch(`${url}?email=${email}&token=${token}`, {
                method: 'POST', // или 'PUT'
                body: JSON.stringify(data), // данные могут быть 'строкой' или {объектом}!
                headers: {
                'Content-Type': 'application/json',
                'credentials': "include",
                }
            }).then(async (res) => await res.json()).then((json) =>{
              //  console.log(json.message)
              switch (json.message) {
                case 'Recover success':
                  // localStorage.setItem('login', true);
                  setShowLoader(false)
                  setRedirect(true)
                  // alert('Success login')
                    break;
                case 'User doesn`t exists':
                      // localStorage.setItem('login', true);
                      setShowLoader(false)
                      // setRedirect(true)
                      // alert('Success login')
                        break;
                
                default:
                  alert('Some error occured, please try again later.')
                  break;
              }
            })
            // localStorage.setItem('login', 'true');
            // const json = await response.json();
            // console.log('Успех:', JSON.stringify(response));
            
            } catch (error) {
              console.error('Ошибка:', error);
            }
    } 

    function query() {
        return new URLSearchParams(window.location.search);
    }
    
    const classes = useStyles();
    return (
      <>
      {redirect && <Redirect to='/'/>}
      { showLoader && < CircleLoader type={'dashBoard'} /> }

        <div className={classNames(styles.signIn)}>
            <div className={classNames(styles.signUpContainer)}>

                <Formik
                initialValues={{
                    password: '',
                    confirmPassword: ''
                }}
                // validateOnBlur
                validateOnChange
                // validateOnMount
                handleOnChange 
                validationSchema={validationSchema}
                onSubmit={(values) => {  
                    const url = '/api/auth/recover';
                    const data = {
                        
                            password: values.password,
                        }
                    ;
                    console.log(data)
                        sendToDb(data, url)
                }}
               
                >
    
                    {({values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, setFieldValue, dirty, props}) => (
                    <div>
                            <div className={classNames(styles.logo)}></div>
                            <div className={classNames(styles.registerText)}>Login to your account</div>
                            <div className={classNames(styles.registerUnderText)}>Please create new password</div>

                        <Tooltip open={showPasswordToolTip} placement="right" classes={{ tooltip: classes.customWidth }} 
                    title={(errors.password !== undefined ? <ToolTipAlert alertType={errors.password}/>   : '')  
                    }
                    > 
                        <TextField
                            variant="outlined"
                            margin="normal"
                            name="password"
                            label="Password"
                            type={showPassword ? "text" : "password"} // <- magic
                            id="password"
                            autoComplete="current-password"
                            onFocus={handleShowPasswordToolTip}
                            onChange={handleChange}
                            onBlur={handleBlur, handleShowPasswordToolTip}
                            value={values.password}
                            error={touched.password && errors.password }
                            className={classes.root}
                            InputProps={{ // <-- This is where the toggle button is added.
                                endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    >
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                                )
                            }}
                            />
                            </Tooltip>
                            
                        <Tooltip   open={showConfirmPasswordToolTip} placement="right" classes={{ tooltip: classes.customWidth }} 
                            
                            title={(errors.confirmPassword !== undefined ? <ToolTipAlert alertType={errors.confirmPassword}/> : '')}
                            > 
                                    <TextField
                                    variant="outlined"
                                    margin="normal"
                                    autoComplete="current-password"
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    type={showPasswordConfirm ? "text" : "password"} // <- magic
                                    id="confirmPassword"
                                    onFocus={handleShowConfirmPasswordToolTip}
                                    onChange={handleChange}
                                    onBlur={handleBlur, handleShowConfirmPasswordToolTip}
                                    value={values.confirmPassword}
                                    className={classes.root}
                                    error={touched.confirmPassword && errors.confirmPassword }
                                    InputProps={{ // <-- This is where the toggle button is added.
                                        endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPasswordConfirm}
                                            onMouseDown={handleMouseDownPasswordConfirm}
                                            >
                                            {showPasswordConfirm ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                        )
                                    }}
                                    />    
                    </Tooltip>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={handleChange, handleSubmit}
                        >
                        Login
                        </Button>
                        
 
                        </div>
                    ) }

                </Formik>


            </div>


        </div>
        </>
    );
  }






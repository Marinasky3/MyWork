import {Link} from 'react-router-dom'
import React from 'react';
import { useState } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, InputAdornment, IconButton } from "@material-ui/core";
import { Formik } from 'formik';
import * as yup from 'yup';
import styles from './RecoverPass.module.scss'
import classNames from 'classnames';
import { useTheme } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import { ToolTipAlert } from '../../components/ToolTipAlert/ToolTipAlert';

// testemail@test.gg
// qwer1234!

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
      maxWidth: 304,
      fontFamily: `Barlow`,
      fontStyle: `normal`,
      fontWeight: `normal`,
      fontSize: `14px`,
      lineHeight: `17px`,
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
 

  
  export default function RecoverPass() {
    const validationSchema = yup.object().shape({
        email: yup.string().email(2).max(255).required(2),
    })
    const [emailValue, setEmailValue] = useState('');
    const handleSetEmailValue = val => setEmailValue(val);

    const [showEmailToolTip, setShowEmailToolTip] = useState(false);
    const handleShowEmailToolTip = () => setShowEmailToolTip(!showEmailToolTip);

    const [showSuccessPage, setShowSuccessPage] = useState(false);
    const handleShowSuccessPage = () => setShowSuccessPage(true);

    let [showServerErrorToolTip, setShowServerErrorToolTip] = useState(false);
    let handleShowServerErrorToolTip = (val) => {setShowServerErrorToolTip(showServerErrorToolTip = val); setTimeout(() => {
      setShowServerErrorToolTip(undefined)
    }, 3000);};

    const theme = useTheme()
    async function sendToDb(url){
        
        try {
            const response = await fetch(url, {
                method: 'GET',  
                // body: JSON.stringify(data), 
                credentials: "include",  
                headers: {
                'Content-Type': 'application/json'
                }
            });
            const json = await response.json();
            console.log(json);
            switch (json.message) {
              case 'User doesn`t exists':
                handleShowServerErrorToolTip(3)
                  break;
              case 'Success login':
                 
                alert('Success login')
                  break;
              
              default:
                handleShowSuccessPage()
                // alert('Some error occured, please try again later.')
                break;
            }
            } catch (error) {
            console.error('Ошибка:', error);
            }
    }

    const classes = useStyles();
    return (
        showSuccessPage === false ?
        <div className={classNames(styles.signIn)}>

            <Formik
            initialValues={{
                email: '',
            }}
            validateOnBlur
            onSubmit={(values) => {
                const url = `/api/auth/sendRecover?email=${values.email}`;
                // const data = {
                //     user: {
                //         email: values.email,
                //     } 
                // };
                sendToDb( url)
            }}
            validationSchema={validationSchema}
            >
 
                {({values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty}) => (
                 <div className={classNames(styles.signInContainer)}>
                        <div className={classNames(styles.logo)}></div>
                        <div className={classNames(styles.loginText)}>Recover Password</div>
                        <div className={classNames(styles.loginUnderText)}>A confirmation will be sent to your registered email</div>
                        <div className={classNames(styles.inputForm)}>

                     
                      <Tooltip open={showServerErrorToolTip} placement="right" classes={{ tooltip: classes.customWidth }} 
                      title={(showServerErrorToolTip !== undefined ? <ToolTipAlert alertType={showServerErrorToolTip}/>   : '') }> 
                              <Tooltip open={showEmailToolTip} placement="right" classes={{ tooltip: classes.customWidth }} 
                    title={(errors.email !== undefined ? <ToolTipAlert alertType={errors.email}/>   : '')
                        
                    }
                    > 
                                    <TextField

                                        variant="outlined"
                                        margin="normal"
                                        className={classes.root}
                                        id="email"
                                        color="primary"
                                        label="Email Address"
                                        name="email"
                                        onFocus={handleShowEmailToolTip}
                                        onChange={handleChange}
                                        onBlur={handleBlur, handleShowEmailToolTip, handleSetEmailValue(values.email)}
                                        value={values.email}
                                        error={touched.email && errors.email}
                                        
                                    />
                            </Tooltip>
                      </Tooltip>
                 
                            
            

                            {/* <div className={classNames(styles.forgot)}>Recover Password?</div> */}
                 
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                disableRipple={true}
                                // disabled={!isValid&& !dirty}
                                onClick={handleSubmit}
                                type={'submit'}
                                >
                                Send
                                </Button>

                                <div>
                                    <div className={styles.noAccount}>Remember Password? <Link className={styles.link} as={Link} to='/'>Login</Link></div>
                                </div>
                            </div>
                        </div>
                        
                 ) }

            </Formik>
                     



        </div>
    :
    <div className={classNames(styles.signIn)}>
    <Formik
   
    >

        {({values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty}) => (
         <div className={classNames(styles.signInContainer)}>
                <div className={classNames(styles.logo)}></div>
                <div className={classNames(styles.loginText)}>The confirmation has been sent.</div>
                <div className={classNames(styles.loginUnderText)}>Please, check your email.</div>
                <div className={classNames(styles.inputForm)}>

             
                            <TextField
                                disabled={true}
                                variant="outlined"
                                margin="normal"
                                className={classes.root}
                                id="email"
                                color="primary"
                                label="Email Address"
                                name="email"
                                value={emailValue}

                            />

                    </div>
                </div>
                
         ) }

    </Formik>
             



</div>           
    
    );
  }

















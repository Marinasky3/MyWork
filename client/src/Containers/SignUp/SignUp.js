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
import styles from './SignUp.module.scss'
import classNames from 'classnames';
import { ToolTipAlert } from '../../components/ToolTipAlert/ToolTipAlert';
import { withStyles } from '@material-ui/core';
import 'yup-phone';
import MuiPhoneNumber  from 'material-ui-phone-number'
import { CircleLoader } from '../../components/Loader/CircleLoader';
import { Redirect } from 'react-router'

const useStyles = makeStyles({
    dropdown:{
    '&::-webkit-scrollbar':{
        width: '0 !important',
    },
      '& .MuiList-root':{
        color: 'rgba(233, 247, 255, 1)',
        backgroundColor: '#20404A !important',
        
        '& .MuiListItem-button':{
          fontSize: '16px !important',
          '& :hover': {
            backgroundColor: 'rgba(32, 64, 74, 1)'
          }
        }

      },
      '& .MuiPaper-rounded': {
        overflowY:'scroll !important',
        height: '314px',
        borderRadius: '8px',
          '&::-webkit-scrollbar':{
            width: '8px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(32, 64, 74, 1)',
            borderRadius: '8px',
          
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'rgba(36, 33, 34, 1)',
            borderRadius: '8px',
          }
        }
    },
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
        color: "#E9F7FF",
       
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
        color: "#E9F7FF"
      },
      "& .MuiInputLabel-outlined.Mui-error": {
        color: "rgba(227, 24, 99, 1)"
      },
    }
  });

  export default function SignUp({setIsAuthenticated}) {
    const myPassRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,255}$/
    const validationSchema = yup.object().shape({
        email: yup.string().email(2).max(255).required(2),
        institution: yup.string().trim().min(2, 8).required(8),
        password: yup.string().matches(myPassRegex, 6).required('default'),
        phoneNumber: yup.string().phone('', true, 'invalidPhone').required('invalidPhone'),
        confirmPassword: yup.string().oneOf([yup.ref('password'), null], 5).required(5),
    }) 

    const [redirect, setRedirect] = useState(false);

    // yup.string()
    const [showLoader, setShowLoader] = useState(false)
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);
    
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    const handleClickShowPasswordConfirm = () => setShowPasswordConfirm(!showPasswordConfirm);
    const handleMouseDownPasswordConfirm = () => setShowPasswordConfirm(!showPasswordConfirm);
    
    const [showEmailToolTip, setShowEmailToolTip] = useState(false);
    const handleShowEmailToolTip = () => setShowEmailToolTip(!showEmailToolTip);
    
    const [showInstitutionToolTip, setShowInstitutionToolTip] = useState(false);
    const handleShowInstitutionToolTip = () => setShowInstitutionToolTip(!showInstitutionToolTip);

    const [showPasswordToolTip, setShowPasswordToolTip] = useState(false);
    const handleShowPasswordToolTip = () => setShowPasswordToolTip(!showPasswordToolTip);
    
    const [showConfirmPasswordToolTip, setShowConfirmPasswordToolTip] = useState(false);
    const handleShowConfirmPasswordToolTip = () => setShowConfirmPasswordToolTip(!showConfirmPasswordToolTip);

    const [showPhoneNumberToolTip, setShowPhoneNumberToolTip] = useState(false);
    const handleShowPhoneNumberToolTip = () => setShowPhoneNumberToolTip(!showPhoneNumberToolTip);

 

    async function sendToDb(data, url){
      setShowLoader(true)
        try {
            let req = await fetch(url, {
                method: 'POST', // или 'PUT'
                body: JSON.stringify(data), // данные могут быть 'строкой' или {объектом}!
                headers: {
                'Content-Type': 'application/json',
                'credentials': "include",
                }
            }).then(async (res) => await res.json()).then((json) =>{
              console.log(json.message)
              
             switch (json.message) {
               case 'Register success':
                //  localStorage.setItem('login', true);
                //  setIsAuthenticated(true)
                setShowLoader(false)
                setRedirect(true)

                 
                //  alert('Success login')
                   break;
               default:
                setShowLoader(false)
                 alert('The user with current email is already exists.')
                 break;
             }
           })
            
            } catch (error) {
              setShowLoader(false)
              console.error('Ошибка:', error);
            }
    } 
    
    const classes = useStyles();
    return (
      <>
       { showLoader && < CircleLoader type={'dashBoard'} /> }
       {redirect && <Redirect to='/'/>}
        <div className={classNames(styles.signIn)}>
            <div className={classNames(styles.signUpContainer)}>

                <Formik
                initialValues={{
                    email: '',
                    institution: '',
                    phoneNumber: '',
                    password: '',
                    confirmPassword: ''
                }}
                // validateOnBlur
                validateOnChange
                // validateOnMount
                handleOnChange 
                validationSchema={validationSchema}
                onSubmit={(values) => {  
                    const url = '/api/auth/signup';
                    const data = {
                        user: {
                            email: values.email,
                            password: values.password,
                            phone: values.phoneNumber,
                            institution: values.institution
                        } 
                    };
                    console.log(data)
                        sendToDb(data, url)
                }}
               
                
                >
    
                    {({values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, setFieldValue, dirty, props}) => (
                    <div
                      onKeyDown={(e) => {if (e.key === 'Enter') {handleSubmit();}}}
                    >
                            <div className={classNames(styles.logo)}></div>
                            <div className={classNames(styles.registerText)}>Register</div>
                            <div className={classNames(styles.registerUnderText)}>Create new account</div>
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
                                        onBlur={handleBlur, handleShowEmailToolTip}
                                        value={values.email}
                                        error={touched.email && errors.email}
                                        
                                    />
                            </Tooltip>

                            <Tooltip open={showInstitutionToolTip} placement="right" classes={{ tooltip: classes.customWidth }} 
                    title={(errors.institution !== undefined ? <ToolTipAlert alertType={errors.institution}/>   : '')
                    
                    }
                    > 
                            <TextField
                                variant="outlined"
                                margin="normal"
                       
                                className={classes.root}
                                id="institution"
                                color="primary"
                                label="Institution"
                                name="institution"
                                onFocus={handleShowInstitutionToolTip}
                                onChange={handleChange}
                                onBlur={handleBlur, handleShowInstitutionToolTip}
                                value={values.institution}
                                error={touched.institution && errors.institution}
                            />
                            </Tooltip>

                            <Tooltip open={showPhoneNumberToolTip} placement="right" classes={{ tooltip: classes.customWidth }} 
                    title={(errors.phoneNumber !== undefined ? <ToolTipAlert alertType={errors.phoneNumber}/>   : '')
                    }
                    >
                             <MuiPhoneNumber 
                       
                                defaultCountry='dk'
                                variant='outlined' 
                                className={classes.root}
                                margin="normal"
                                id="phoneNumber"
                                color="primary"
                                label="Phone Number"
                                name={'phoneNumber'}
                                dropdownClass={classes.dropdown}
                                onFocus={handleShowPhoneNumberToolTip}
                                onChange={handleChange, (e) => {values.phoneNumber = e; setFieldValue('phoneNumber', e)}}
                                onBlur={handleBlur, handleShowPhoneNumberToolTip}
                                error={touched.phoneNumber && errors.phoneNumber}
                                value={values.phoneNumber}
                              
                            />
                            </Tooltip>
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
                        // disabled={!isValid && !dirty}
                        className={classes.button}
                        onClick={handleChange, handleSubmit
                          // (errors.email ? handleShowEmailToolTip : null) ||
                          // (errors.institution ? handleShowInstitutionToolTip : null)||
                          // // (errors.phoneNumber ? handleShowPhoneNumberToolTip : null)||
                          // (errors.password ? handleShowPasswordToolTip : null)||
                          // (errors.confirmPassword ? handleShowConfirmPasswordToolTip : null)

                        }
                        >
                        Register
                        </Button>
                        
                        {/* { ((touched.email && errors.email)   || 
                        (touched.institution && errors.institution)  ||
                        (touched.phoneNumber && errors.phoneNumber)   ||
                        (touched.password && errors.password)   ||
                        (touched.confirmPassword && errors.confirmPassword)) &&  <h1>{JSON.stringify(errors)}</h1> 
                    } */}
                        </div>
                    ) }

                </Formik>
                {/* <div>
                    <div>Don’t have an account? </div>
                    <StyledLink as={Link} to='/SingIn' > 
                        Register
                    </StyledLink>
                </div>         */}
   

                <div className={classNames(styles.login)}>
                    
                    <div>Already have an account? <Link className={styles.link} as={Link} to='/'>Login</Link></div>
                
                </div> 
            </div>


        </div>
        </>
    );
  }



















  
//   const useStyles = makeStyles((theme) => ({
//     paper: {
//       marginTop: theme.spacing(8),
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: 'center',
//     },
//     avatar: {
//       margin: theme.spacing(1),
//       backgroundColor: theme.palette.secondary.main,
//     },
//     form: {
//       width: '100%', // Fix IE 11 issue.
//       marginTop: theme.spacing(1),
//     },
//     submit: {
//       margin: theme.spacing(3, 0, 2),
//     },
//   }));
  
//   export default function SignIn() {
//     const classes = useStyles();
//     const [showPassword, setShowPassword] = useState(false);
//     const handleClickShowPassword = () => setShowPassword(!showPassword);
//     const handleMouseDownPassword = () => setShowPassword(!showPassword);
//     return (
//       <Container component="main" maxWidth="xs">
//         <CssBaseline />
//         <div className={classes.paper}>
          
//           <Typography component="h1" variant="h5">
//             Sign in
//           </Typography>
//           <Typography component="h3" variant="h8">
//           To your account
//           </Typography>
//           <form className={classes.form} >
//             <TextField
//               variant="outlined"
//               margin="normal"
//               required
//               fullWidth
//               id="email"
//               label="Email Address"
//               name="email"
//               autoComplete="email"
//               autoFocus
//             />
           
//             <TextField
//               variant="outlined"
//               margin="normal"
//               required
//               fullWidth
//               name="password"
//               label="Password"
//               type={showPassword ? "text" : "password"} // <- magic
//               id="password"
//               autoComplete="current-password"
//               InputProps={{ // <-- This is where the toggle button is added.
//                 endAdornment: (
//                 <InputAdornment position="end">
//                     <IconButton
//                     aria-label="toggle password visibility"
//                     onClick={handleClickShowPassword}
//                     onMouseDown={handleMouseDownPassword}
//                     >
//                     {showPassword ? <Visibility /> : <VisibilityOff />}
//                     </IconButton>
//                 </InputAdornment>
//                 )
//             }}
//             />
//             <FormControlLabel
//               control={<Checkbox value="remember" color="primary" />}
//               label="Remember me"
//             />
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               color="primary"
//               className={classes.submit}
//             >
//               Sign In
//             </Button>
//             <Grid container>
//               <Grid item xs>
//                 <Link href="#" variant="body2">
//                   Forgot password?
//                 </Link>
//               </Grid>
//               <Grid item>
//                 <Link href="#" variant="body2">
//                   {"Don't have an account? Sign Up"}
//                 </Link>
//               </Grid>
//             </Grid>
//           </form>
//         </div>
//         <Box mt={8}>
          
//         </Box>
//       </Container>
//     );
//   }


  ///             ^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$
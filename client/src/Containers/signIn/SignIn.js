import { StyledLink } from '../../components/Link/StyledLink';
import {Link} from 'react-router-dom'
import React from 'react';
import { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
// import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
// import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, InputAdornment, IconButton } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { Formik } from 'formik';
import * as yup from 'yup';
import styles from './SignIn.module.scss'
import classNames from 'classnames';
import { useTheme } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import { ToolTipAlert } from '../../components/ToolTipAlert/ToolTipAlert';
import { CircleLoader } from '../../components/Loader/CircleLoader';

// import { browserHistory } from 'react-router'
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
 

  
  export const SignIn = ({ setIsAuthenticated }) => {
    const validationSchema = yup.object().shape({
        email: yup.string().email(2).max(255).required(2),
        password: yup.string().max(255).required(7)
    })
  
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    const [showEmailToolTip, setShowEmailToolTip] = useState(false);
    const handleShowEmailToolTip = () => setShowEmailToolTip(!showEmailToolTip);
    
    // const [showPasswordToolTip, setShowPasswordToolTip] = useState(false);
    // const handleShowPasswordToolTip = () => setShowPasswordToolTip(!showPasswordToolTip);
    const [showLoader, setShowLoader] = useState(false)
    let [showServerErrorToolTip, setShowServerErrorToolTip] = useState(false);
    let handleShowServerErrorToolTip = (val) => {setShowServerErrorToolTip(showServerErrorToolTip = val); setTimeout(() => {
      setShowServerErrorToolTip(undefined)
    }, 3000);};

    const theme = useTheme()
    async function sendToDb(data, url){

        setShowLoader(true)
        try {
            const response = await fetch(url, {
                method: 'POST',  
                body: JSON.stringify(data), 
                credentials: "include",  
                headers: {
                'Content-Type': 'application/json'
                }
            });
            const json = await response.json();
            console.log('21211212', json);
  
            switch (json.message) {
              case 'User doesn`t exists':
                setShowLoader(false)
                handleShowServerErrorToolTip(3)
                  break;
              case 'Incorrect password':
                setShowLoader(false)
                handleShowServerErrorToolTip(7)
                  break;
                case 'No user data provided':
                  setShowLoader(false)
                  handleShowServerErrorToolTip('noUserDataProvided')
                  break;
              case 'Success login':
                // alert('Success login')
                setShowLoader(false)
                localStorage.setItem('login', "true");
                console.log(setIsAuthenticated)
                setIsAuthenticated(true)
                
                // localStorage.setItem('login', 'true');
                // alert('Success login')

                  break;
              
              default:
                setShowLoader(false)
                alert('Some error occured, please try again later.')
                break;
            }
            } catch (error) {
            console.error('Ошибка:', error);
            }
    }

    const classes = useStyles();
    const handleKeyPressEnter = (e) => {
      if(e.which == '13'){
        sendToDb()
        

      }
    }

    return (
      <>
        { showLoader && < CircleLoader type={'dashBoard'} /> }
        <div className={classNames(styles.signIn)} onKeyPress={(e)=> {handleKeyPressEnter(e)}}>
            <Formik
            initialValues={{
                email: '',
                password: '',
            }}
            validateOnBlur
            onSubmit={(values) => {
                const url = '/api/auth/signin';
                const data = {
                    user: {
                        email: values.email,
                        password: values.password,
                    } 
                };
                sendToDb(data, url)
            }}
            validationSchema={validationSchema}
            >
                
                {({values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty}) => (
                 <div className={classNames(styles.signInContainer)}
                    onKeyDown={(e) => {if (e.key === 'Enter') {handleSubmit();}}}
                 >

                        <div className={classNames(styles.logo)}></div>
                        <div className={classNames(styles.loginText)}>Login</div>
                        <div className={classNames(styles.loginUnderText)}>To your account</div>
                        <div className={classNames(styles.inputForm)}>

                    <Tooltip open={showEmailToolTip } placement="right" classes={{ tooltip: classes.customWidth }} 
                    title={(showServerErrorToolTip || errors.email !== undefined ? <ToolTipAlert alertType={errors.email || showServerErrorToolTip}/>   : '')
                        
                    }
                    > 
                      <Tooltip open={showServerErrorToolTip} placement="right" classes={{ tooltip: classes.customWidth }} 
                      title={(showServerErrorToolTip !== undefined ? <ToolTipAlert alertType={showServerErrorToolTip}/>   : '') }> 
                              <TextField
                                  variant="outlined"
                                  margin="normal"
                         
                             
                                  error={touched.email && errors.email}
                                  className={classNames(classes.root, touched.email && errors.email ? classes.pharmaNav : classes.root )}
                                  id="email"
                                  color='secondary'
                                  label="Email Address"
                                  name="email"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.email}
                              />
                      </Tooltip>
                    </Tooltip>
                            {/* <Tooltip open={showPasswordToolTip} placement="right" classes={{ tooltip: classes.customWidth }} 
                    title={(errors.password !== undefined ? <ToolTipAlert alertType={errors.password}/>   : '') } >  */}
                            <TextField
                                variant="outlined"
                                margin="normal"
                                error={touched.password && errors.password}
                                className={classes.root}
                                name="password"
                                label="Password"
                                color='secondary'
                                type={showPassword ? "text" : "password"} // <- magic
                                id="password"
                                autoComplete="current-password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                                InputProps={{ // <-- This is where the toggle button is added.
                                    classes: {
                                        input: classes.notchedOutline,
                                    },
                                    endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        >
                                        {showPassword ? <Visibility style={{ color: 'rgba(124, 179, 191, 1)' }}  /> : <VisibilityOff  style={{ color: 'rgba(124, 179, 191, 1)' }}/>}
                                        </IconButton>
                                    </InputAdornment>
                                    )
                                }}
                                />
                              {/* </Tooltip> */}

                            <div className={classNames(styles.forgot)}><Link className={styles.link} as={Link} to='/RecoverPass'>Recover Password?</Link></div>
                 
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
                                Login
                                </Button>

                                <div>
                                    <div className={styles.noAccount}>Don’t have an account?<Link className={styles.link} as={Link} to='/SingUp'>Register</Link></div>
                                </div>
                            </div>
                        </div>
                        
                 ) }

            </Formik>
                     



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
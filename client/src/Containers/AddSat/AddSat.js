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
import Container from '@material-ui/core/Container';
import { TextField, InputAdornment, IconButton } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { Formik } from 'formik';
import * as yup from 'yup';
import styles from './AddSat.module.scss'
import { divide } from 'lodash';
import { red } from '@material-ui/core/colors';
import classNames from 'classnames';
import StepperAddSat from '../../components/StepperAddSat/StepperAddSat';



export default function AddSat({ onclose, type, handleLoadDataFromBack }) {
    // const validationSchema = yup.object().shape({
    //     email: yup.string().email('Must be a valid email').max(255).required('Email is required'),
    //     password: yup.string().max(255).required('Password requireed')
    // })

    // const [showPassword, setShowPassword] = useState(false);
    // const handleClickShowPassword = () => setShowPassword(!showPassword);
    // const handleMouseDownPassword = () => setShowPassword(!showPassword);


    // async function sendToDb(data, url){

    // }

    // const classes = useStyles();
    return (
        <div className={classNames(styles.addSat)}>
           <StepperAddSat onclose={onclose} type={type} handleLoadDataFromBack={handleLoadDataFromBack} />

        </div>
    );
  }
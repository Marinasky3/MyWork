import { useState } from 'react';
import {
  useForm,
  Controller,
  FormProvider,
  useFormContext
} from "react-hook-form";

import { TextField, InputAdornment, IconButton, OutlinedInput } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import { makeStyles } from '@material-ui/core/styles';
// import TextField from '@material-ui/core/TextField';
import CloseIcon from '@material-ui/icons/Close';
import CancelIcon from '@material-ui/icons/Cancel';
import { TooltipForAddSatellite } from '../TooltipForAddSatellite/TooltipForAddSatellite';
import { CircleLoader } from '../Loader/CircleLoader';
import './EditProfileModal';

import MuiPhoneNumber  from 'material-ui-phone-number'

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
    root: {
        width: '325px',
        backgroundColor: `rgba(36, 33, 34, 1)`,
      "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
        borderColor: "rgba(32, 64, 74, 1)",
        fontSize: `16px`,
      },
      "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
        borderColor:  `rgba(13, 185, 204, 1)`,
        fontSize: `16px`,
      },
      "& .MuiSvgIcon-root " : {
        fill: '#7CB3BF!important'
      },
      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "rgba(13, 185, 204, 1)",
        fontSize: `16px`,
      },
      "& .MuiOutlinedInput-input": {
        color: "rgba(124, 179, 191, 1) ",
        fontSize: `16px`,
      },
      "&:hover .MuiOutlinedInput-input": {
        color: "rgba(124, 179, 191, 1)",
        fontSize: `16px`,
      },
      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
        color: "white",
        fontSize: `16px`,
      },
      "& .MuiInputLabel-outlined": {
        color: "rgba(124, 179, 191, 1)",
        fontSize: `16px`,
      },
      "&:hover .MuiInputLabel-outlined": {
        color: "rgba(124, 179, 191, 1)",
        fontSize: `16px`,
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

export const EditProfileModal = ({onclose, userInfo, handleRestartHeader}) => {

    const [showLoader, setShowLoader] = useState(false)

    const [ incorrectPasswordError, setIncorrectPasswordError ] = useState(false)
    const [ internalError, setInternalError ] = useState(false)
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    const [showPasswordConfirmRepeat, setShowPasswordConfirmRepeat] = useState(false);
    const [showTooltipForDifferentPass, setShowTooltipForDifferentPass] = useState(false)

    const handleClickShowPasswordConfirmRepeat = () => setShowPasswordConfirmRepeat(!showPasswordConfirmRepeat);
    const handleMouseDownPasswordConfirmRepeat = () => setShowPasswordConfirmRepeat(!showPasswordConfirmRepeat);

    const handleClickShowPasswordConfirm = () => setShowPasswordConfirm(!showPasswordConfirm);
    const handleMouseDownPasswordConfirm = () => setShowPasswordConfirm(!showPasswordConfirm);
    
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    const [showPhoneNumberToolTip, setShowPhoneNumberToolTip] = useState(false);
    const handleShowPhoneNumberToolTip = () => setShowPhoneNumberToolTip(!showPhoneNumberToolTip);
    
    const handleSendEditSatellite = async (data) => {
        console.log('data.phone', data ) 
        setIncorrectPasswordError(false)
        // if((data.newPassword && !data.confirmNewPassword) || (data.confirmNewPassword && !data.newPassword)){
        //   console.log('--------------------------------')
        // }

        if(data.newPassword===data.confirmNewPassword){
            setShowTooltipForDifferentPass(false) 
            setShowLoader(true)
            console.log('edit data from FRONT to BACK', {...data})
    
            const url = '';
            const dataToServer = { 
                institution: data.institution ? data.institution : userInfo.institution,
                phone: data.phoneNum ? data.phoneNum : userInfo.phone,
                currentPassword: data.oldPassword,
                newPassword: data.newPassword
            };
    
            // try {
    
    
            const response = await fetch( `/api/dashboard/editInfo`, {
    
                method: 'POST', 
                body: JSON.stringify(dataToServer), 
                credentials: "include", 
                headers: {
                'Content-Type': 'application/json'
                }
            });
            if(response.status === 200 ){
            const json = await response.json();
            console.log('Успех:', JSON.stringify(json));
            setShowLoader(false)
            onclose()
            handleRestartHeader()
            }
                if(response.status === 500 ){  setInternalError(true) }
                if(response.status === 400 ){  setIncorrectPasswordError(true) }
                setShowLoader(false)
            // console.error('Ошибка:', error);
            // }
        }else{ setShowTooltipForDifferentPass(true) }

  
      }
    const { handleSubmit, control, formState: { errors}} = useForm();
   
    const classes = useStyles();
    return(
        <>
        {showLoader && <CircleLoader type='dashboard' /> }
        <div className="editSatellite_wrapper">
            <div className="editSatellite_headerWrapper">
                <span>Edit Profile Info</span>
                <CloseIcon onClick={onclose}/>
            </div>
            <div className="editSatellite_nameWrapper">
                <span>Email: </span> {userInfo.email}
            </div>
            { internalError && <div className="editSatellite_errorWrapper">Some error occured, please try again later</div> }

            <form onSubmit={handleSubmit(data => handleSendEditSatellite(data))}>
                <Controller
                  control={control}
                  name="institution"
                  rules={{minLength: 3 }}
                  // pattern: /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/g 
                  render={({ field }) => (
                    <TextField 
                        autoComplete="off"
                        type="text"
                        variant="outlined"
                        margin="normal"
                        className={classes.root}
                        label='Institution'
                        defaultValue={userInfo.institution} 
                        name="institution"
                        // onChange = { (e) => {handleOnchangeMassInput(e)} }
                        {...field}
                        error={Boolean(errors?.institution)}
                        // helperText={errors.institution?.message}
                    />
                  )}
                  />
                   {errors.institution && <TooltipForAddSatellite type={'institution'} />}

                {/* <Controller
                  control={control}
                  name="phoneNum"
                  rules={{ pattern: /^([+]\d{2})?\d{10}$/}}
                  // pattern: /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/g 
                  render={({ field }) => (
                    <TextField 
                        autoComplete="off"
                        type="text"
                        variant="outlined"
                        margin="normal"
                        className={classes.root}
                        label='Phone Number'
                        defaultValue={userInfo.phone} 
                        // defaultValue='{userInfo.phone}' 
                        name="phoneNum"
                        // onChange = { (e) => {handleOnchangeMassInput(e)} }
                        {...field}
                        error={Boolean(errors?.phoneNum)}
                        helperText={errors.phoneNum?.message}
                    />
                  )}
                  /> */}
                <Controller
                  control={control}
                  name="phoneNum"
                  rules={{ 
                      minLength:10
                    }}
                  // pattern: /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/g 
                  render={({  field}) => (

                  <MuiPhoneNumber 
                       

                       variant='outlined' 
                       className={classes.root}
                       margin="normal"
                       id="phoneNumber"
                       color="primary"
                       label="Phone Number"
                       name={'phoneNumber'}
                       dropdownClass={classes.dropdown}

                       {...field}

                        value={userInfo.phone}
                       error={Boolean(errors?.phoneNumber)}
                       helperText={errors.phoneNum?.message}

                     
                   />
                   )}
                   />

                   {errors.phoneNum && <TooltipForAddSatellite type={'phoneNum'}/>}
                   { incorrectPasswordError && <TooltipForAddSatellite type={'incorrectPassword'}/> }

                   <Controller
                  control={control}
                  name="oldPassword"
                  rules={{ pattern: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,255}$/ }}
                  // pattern: /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/g 
                  render={({ field }) => (  
                    <TextField 
                    autoComplete="new-password"
                        // type="number"
                        variant="outlined"
                        margin="normal"
                        className={classes.root}
                        label="Current Password"
                        // defaultValue={additionalDataToSatellite.crossSection}
                        name="oldPassword" 
                        // onChange = { (e) => {handleOnchangeCrossSectionInput(e)} }
                        {...field}
                        error={Boolean(errors?.oldPassword)}
                        helperText={errors.oldPassword?.message}
                        // defaultValue={}
                        type={showPassword ? "text" : "password"}
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
                            )}}
                    />

                  )}
                  />
                   {errors.oldPassword && <TooltipForAddSatellite type={'oldPassword'}/>}

                   <Controller
                  control={control}
                  name="newPassword"
                  rules={{ pattern: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,255}$/ }}
                  render={({ field }) => (
                    <TextField 
                        autoComplete="off"
                        // type="number"
                        variant="outlined"
                        margin="normal"
                        className={classes.root}
                        label='New Password'
                        // defaultValue={additionalDataToSatellite.mass} 
                        name="newPassword"
                        // onChange = { (e) => {handleOnchangeMassInput(e)} }
                        {...field}
                        error={Boolean(errors?.newPassword)}
                        helperText={errors.newPassword?.message}
                        type={showPasswordConfirm ? "text" : "password"}
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
                            )}}
                    
                    />
                  )}
                  />
                   {errors.newPassword && <TooltipForAddSatellite type={'oldPassword'} />}

                   <Controller
                  control={control}
                  name="confirmNewPassword"
                  rules={{  pattern: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,255}$/ }}
                // rules={}
                  render={({ field }) => (
                    <TextField 
                        autoComplete="off"
                        // type="number"
                        variant="outlined"
                        margin="normal"
                        className={classes.root}
                        label='Confirm New Password'
                        // defaultValue={additionalDataToSatellite.mass} 
                        name="confirmNewPassword"
                        // onChange = { (e) => {handleOnchangeMassInput(e)} }
                        {...field}
                        error={Boolean(errors?.confirmNewPassword)}
                        helperText={errors.confirmNewPassword?.message}
                        type={showPasswordConfirmRepeat ? "text" : "password"}
                        InputProps={{ // <-- This is where the toggle button is added.
                            endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPasswordConfirmRepeat}
                                onMouseDown={handleMouseDownPasswordConfirmRepeat}
                                >
                                {showPasswordConfirmRepeat ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                            )}}
                    
                    />
                  )}
                  />
                   {errors.confirmNewPassword && <TooltipForAddSatellite type={'oldPassword'} />}
                    { showTooltipForDifferentPass && <TooltipForAddSatellite type={'differentPass'} /> }

            <div className="editSatellite_footerWrapper">
                    <button type='button' className='editSatellite_cancelButton' onClick={onclose}> 
                        Cancel
                    </button>
                  
                      {/* <form onSubmit={editValues.handleSubmit(handleSendEitValues)}> */}
                        <button 
                            // onClick = {handleEditSatellite}
                            type='submit' 
                            className='editSatellite_submitButton'> 
                            Save Changes
                        </button>
                      {/* </form> */}
                  
            </div>
          </form>

        </div>
        </>

    )
}
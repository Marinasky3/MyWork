import { Link } from "react-router-dom";
import Popover from '@material-ui/core/Popover';
// import Mailto from 'react-mailto';
import CloseIcon from '@material-ui/icons/Close';
import HelpIcon from '@material-ui/icons/Help';
import classNames from 'classnames';
import styles from './StepperAddSat.module.scss'
import { PopOver } from './PopOver';
import { DeleteSatelliteSvg } from '../../svg_elements/deleteSatelliteSvg'; 
import CheckBoxTwoToneIcon from '@material-ui/icons/CheckBoxTwoTone';
import CheckBoxOutlineBlankTwoToneIcon from '@material-ui/icons/CheckBoxOutlineBlankTwoTone';
import React, { useState, useEffect} from "react";
import {
  Typography,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  useForm,
  Controller,
  FormProvider,
  useFormContext,
} from "react-hook-form";
import { blue, red, yellow } from '@material-ui/core/colors';
import { StyledStepper } from './StyledStepper';
import { TooltipForAddSatellite } from '../TooltipForAddSatellite/TooltipForAddSatellite';
import {NoSuchNordIdModal} from '../NoSuchNordIdModal/NoSuchNordIdModal'
import { CircleLoader } from '../Loader/CircleLoader';

const useStyles = makeStyles((theme) => ({
  root: {
    // marginLeft: '30px',
    width: '325px',
    // background: `background: rgba(36, 33, 34, 1)`,
    textAlign: 'center',
    fontFamily: 'Barlow',
    ".MuiPaper-root " : {
      backgroundColor: 'none!important'
    },
    "& .MuiButtonBase-root.Mui-disabled" : {
      background: '#262628!important',
      color: '#20454A!important'
    },
    "& .MuiFormControl-marginNormal " : {
      marginTop:' 9.45px',
      marginBottom: '6px',
      fontFamily: 'Barlow',
    },
    "& .MuiStepLabel-label.MuiStepLabel-alternativeLabel": {
        display: 'none',
        fontFamily: 'Barlow',
      },
      "& .MuiOutlinedInput-notchedOutline   " : {
        fontSize: '1.6rem'
      },
      "& .MuiStepIcon-root.MuiStepIcon-active": {
        border: '1px solid #0E7CAA ',
        background: 'none',
        height: '22px',
        fontSize: '2.2rem !important',
        fontFamily: 'Barlow',
      },
      "& .MuiStepIcon-root.MuiStepIcon-active " : {
        color: '#242122',
        fontFamily: 'Barlow',
      },
      "& .MuiStepIcon-text " : {
        fontSize : '1.4rem',
        color: '#0E7CAA ',
        fill: '#0E7CAA',
        display: 'inline-block',
        marginTop: '5px',
        fontFamily: 'Barlow',
        fontWeight: '700'
      },
      "& .MuiStepConnector-lineHorizontal" : {
        // border: '1px solid #20454A',
        // width: '113px'

      },
      "& .MuiStepConnector-line " : {
        borderColor : '#20454A'
      },
      "& .makeStyles-stepIcon-37" : {
        border: '1px solid #20454A'
      },
      "& .makeStyles-stepIcon-7 " : {
        height: '22px',
        with: '22px'
      },
      "& .MuiStepIcon-root " : {
        height: '22px',
        width: '22px',
        color: 'rgba(0, 0, 0, 0.00)'
      },
      "& .MuiStepper-root" : {
        width: '325px', 
        fontFamily: 'Barlow',
      },
      "& .MuiStepper-root " : {
        paddingRight : '0px',
        paddingLeft : '0px',
      },
      "& .MuiStep-horizontal" : {
        paddingRight : '0px',
        paddingLeft : '0px',
      },
      "& MuiStepIcon-text" : {
        color: '#20454'
      },
      "& .MuiStepIcon-root.MuiStepIcon-completed": {
        color: '#0E7CAA !important',
        border: '1px solid #0E7CAA'
      },
      "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline:hover": {
        borderColor: "rgba(13, 185, 204, 1)",
        fontSize: `16px`,
      },
      "& .MuiOutlinedInput-notchedOutline" : {
        borderColor: "rgba(32, 64, 74, 1)"
      },
      "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
        borderColor:  `rgba(13, 185, 204, 1)`,
        fontSize: `16px`,
      },
      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "rgba(13, 185, 204, 1)",
        fontSize: `16px`,
      },
      "& .MuiOutlinedInput-input": {
        color: "rgba(124, 179, 191, 1) ",
        fontSize: `16px`,
        width: '295px'
      },
      // "&:hover .MuiOutlinedInput-input": {
      //   color: "rgba(124, 179, 191, 1)",
      //   fontSize: `16px`,
      // },
      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
        color: "white",
        fontSize: `16px`,
      },
      "& .MuiInputLabel-outlined": {
        color: "rgba(124, 179, 191, 1)",
        fontSize: `16px`,
      },
      // "&:hover .MuiInputLabel-outlined": {
      //   color: "rgba(124, 179, 191, 1)",
      //   fontSize: `16px`,
      // },
      "& .MuiInputLabel-outlined.Mui-focused": {
        color: "rgba(13, 185, 204, 1)"
      },
      "& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline": {
        borderColor: "rgba(227, 24, 99, 1)",
        fontSize: '1.4rem'
      },
      "& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-input": {
        color: "white"
      },
      "& .MuiInputLabel-outlined.Mui-error": {
        color: "rgba(227, 24, 99, 1)"
      },
      "& .makeStyles-root-1 .MuiOutlinedInput-input " : {
        width: '295px'
      },
      "& .Mui-error": {
        color: "rgba(227, 24, 99, 1)!important",
        border: '1px solid rgba(0,0,0,0)!important',
        fontSize: '1.4rem'
      },
      "& .MuiTypography-alignCenter" : {
        display: 'none!important'
      }
      
     
       
  },
  stepIcon: {
    border: '1px solid #20454A',
    // color: '#20454A',
    backgroundColor: 'rgba(36, 33, 34, 1)',
    borderRadius: '50%',
  },
  stepper:{
    background: `rgba(36, 33, 34, 1)`,
    // color: 'white',
    iconColor: 'green'
 
  },
  backButton: {
    marginRight: theme.spacing(1),
    background: `white`
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    color: 'white',
  },
 
}));
 


function getSteps() {
  return ['Select master blaster campaign settings', 'Create an ad group', 'Create an ad'];
}
const FirstTab = () => {
  return (
  <div className={classNames(styles.firstContWrap)} style={{color: 'white'}}> 
         <div  className={styles.tip}>1. Do you have a Space-Track account?</div>
         <div className={styles.advise}>Create an account at <a className='anchor_undelined' href="https://www.space-track.org/" target="_blank">space-track.org</a></div>
         <div className={styles.tip}> 2. Do you have a NORAD ID?</div>
         <div className={styles.advise} >
            <Link
              to='#'
              onClick={(e) => { window.location = "mailto:spacetrack@spaceguard.ai"; e.preventDefault();}}
                >
                  Contact us, and we will help you
            </Link>

            </div>
         <div className={styles.additional}>*skip this step if you already have a Space-track  account and NORAD ID</div>
      </div>
 
  )
}

const SecondTab = () => {
      const {
        control,
        formState: { errors },
      } = useFormContext();
      const [anchorEl, setAnchorEl] = useState(null);
      const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
      const handleClose = () => {
        setAnchorEl(null);
      };
      const open = Boolean(anchorEl);
      const id = open ? 'simple-popover' : undefined;
      // const [firstTexFieldError, setFirstTexFieldError] = useState(false);
      let firstTexFieldError = false
      if( errors.noradId ) {
        // setFirstTexFieldError(prevState => !prevState)
        firstTexFieldError = true
      }

      // useEffect( () => {
      //   return ()=>{console.log('component will unmount')}
      //   //  return ()=>{ errors = {}}

      // }, []);
     
      return (
        <>
          <StyledStepper firstTexFieldError={firstTexFieldError} >
          <div className={classNames(styles.secondContWrap)} style={{color: 'red'}}> 
            <div className={styles.details}>
                Satellite details
            </div>
            <div>
           
                <HelpIcon aria-describedby={id} onClick={handleClick} style={{color: yellow}}/> 
            
            <Controller
              control={control}
              name="noradId"
              rules={{ required: true, pattern: /^[0-9]{1,7}$/g }}
              render={({ field }) => (
                <TextField
                                variant="outlined"
                                margin="normal"
                       
                                id="noradId"
                                color="primary"
                                label="NORAD ID "
                                name="noradId"
                                // autoFocus
                                autoComplete="off"
                                // type="number"
                                {...field}
                                error={Boolean(errors?.noradId)}
                                helperText={errors.noradId?.message}
                            />

            )}
          />
          
          <Popover
                            id={id}
                            open={open}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            anchorOrigin={{
                              vertical: 'bottom',
                              horizontal: 'right',
                            }}
                            transformOrigin={{
                              vertical: 'top',
                              horizontal: 'right',
                            }}
                          >
                            < PopOver 
                              type={1}
                              />
                          </Popover>

          <Controller
            control={control}
            name="mass"
            rules={{ required: true , pattern: /^(0|[1-9]\d*)?(\.\d+)?(?<=\d)$/g }}
            // pattern: /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/g 
            render={({ field }) => (

              <TextField
                                variant="outlined"
                                margin="normal"
                                // required
                                id="mass"
                                color="primary"
                                label="Mass in kg"
                                name="mass"
                                autoComplete="off"
                                // type="number"
                                {...field}
                                error={Boolean(errors?.mass)}
                                helperText={errors.mass?.message}
                            />
            
            )}
          />
          

          <Controller
            control={control}
            name="crossSection"
            rules={{ required: true , pattern: /^(0|[1-9]\d*)?(\.\d+)?(?<=\d)$/g }}
            render={({ field }) => (
              <TextField
                                variant="outlined"
                                margin="normal"
                                // className
                                // required
                                
                                id="crossSection"
                                color="primary"
                                label="Cross Section in square meters"
                                name="crossSection"
                                
                                // autoFocus
                                // onChange={handleChange}
                                // onBlur={handleBlur}
                                // value={values.crossSection}
                                autoComplete="off"
                                // type="number"
                                {...field}
                                error={Boolean(errors?.crossSection)}
                                helperText={errors.crossSection?.message}
                            />
            )}
          />
          
          <div className="disabledTextField">
              <Controller
                control={control}
                name="collisionProbability"
                rules={{ required: true , pattern: /^(0|[1-9]\d*)?(\.\d+)?(?<=\d)$/g}}
                render={({ field }) => (

                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    // required
                                    
                                    id="collisionProbability"
                                    color="primary"
                                    label="Accepted Collision Probability in decimal"
                                    name="collisionProbability"
                                    autoComplete="collisionProbability"
                                    // autoFocus
                                    // onChange={handleChange}
                                    // defaultValue='0.00001'
                                    // disabled
                                    autocomplete="off"
                                    // type="number"
                                    {...field}
                                    error={Boolean(errors?.collisionProbability)}
                                    helperText={errors.collisionProbability?.message}

                                />
                  
                )}
              />
          </div>
          
            {errors.noradId && <TooltipForAddSatellite type={'noradId'}/>}
              {errors.mass && <TooltipForAddSatellite type={'mass'}/>}
              {errors.crossSection && <TooltipForAddSatellite type={'crossSection'}/>}
              {errors.collisionProbability && <TooltipForAddSatellite type={'collisionProbability'}/>}
              {errors.minimumDistance && <TooltipForAddSatellite type={'minimumDistance'}/>}

          <div className="disabledTextField">
              <Controller
                control={control}
                name="minimumDistance"
                rules={{ required: true  , pattern: /^(0|[1-9]\d*)?(\.\d+)?(?<=\d)$/gs}}
                render={({ field }) => (
                    <TextField
                        variant="outlined"
                        margin="normal"
                        // required
                        name="minimumDistance"
                        label="Accepted Minimum Distance"
                        
                        id="minimumDistance"
                        autoComplete="minimumDistance"

                        // disabled
                        autocomplete="off"
                        {...field}
                        error={Boolean(errors?.minimumDistance)}
                        helperText={errors.minimumDistance?.message}

                    />
                )}
                />
          </div>
              
          
            </div>
            </div>
            </StyledStepper>
        </>
      );
    };

const ThirdTab= () => {
      // const { control } = useFormContext();
      const {
        control,
        formState: { errors },
      } = useFormContext();
      const [anchorEl, setAnchorEl] = useState(null);
      const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
      const handleClose = () => {
        setAnchorEl(null);
      };
    
      const open = Boolean(anchorEl);
      const id = open ? 'simple-popover' : undefined;
      return (
        <>
        <div className={classNames(styles.thirdContWrap)} style={{color: 'red'}}>
          <StyledStepper>
            <div className={styles.details}>
                  Space-Track account details
                  <HelpIcon aria-describedby={id} onClick={handleClick}/>
                  <Popover
                                  id={id}
                                  open={open}
                                  anchorEl={anchorEl}
                                  onClose={handleClose}
                                  anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'center',
                                  }}
                                  transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'center',
                                  }}
                                >
                                  < PopOver 
                                    type={2}
                                    />
                                </Popover>

              </div>
              <Controller
                control={control}
                name="companyName"
                rules={{ required: true, minLength: 4 }}
                render={({ field }) => (
        
                    <TextField
                        autoComplete="off"
                        variant="outlined"
                        margin="normal"
                        // required
                        // autoFocus
                        id="companyName"
                        color="primary"
                        label="Company Name"
                        name="companyName"
                        error={Boolean(errors?.companyName)}
                        helperText={errors.companyName?.message}
                        {...field}
              />
        
                )}
                />
                {errors.companyName && <TooltipForAddSatellite type={'companyName'}/>}
              <Controller
                control={control}
                name="pocName"
                rules={{ required: true, minLength: 4 }}
                render={({ field }) => (
                    <TextField
                        autoComplete="off"
                        variant="outlined"
                        margin="normal"
                        // required
                        
                        id="pocName"
                        color="primary"
                        label="POC Name"
                        name="pocName"
                        {...field}
                        error={Boolean(errors?.pocName)}
                        helperText={errors.pocName?.message}
                    />
                
                )}
              />
                {errors.pocName && <TooltipForAddSatellite type={'pocName'}/>}
              <Controller
                control={control}
                name="PocEmail"
                // rules={{ required: "this field is required." }}
                rules={{ required: true, pattern: /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/g  }}
                render={({ field }) => (
                    <TextField
                              autoComplete="current-password"
                              variant="outlined"
                              margin="normal"
                              // required
                              type="text"
                              id="PocEmail"
                              color="primary"
                              label="POC E-mail"
                              name="PocEmail"
                              {...field}
                              error={Boolean(errors?.PocEmail)}
                              helperText={errors.PocEmail?.message}
          
                  />
                )}
                />
                
                {errors.PocEmail&& <TooltipForAddSatellite />}
        
              <Controller
                control={control}
                name="spaceTrackUsername"
                rules={{ required: true, minLength: 4 }}
                render={({ field }) => (
                      <TextField
                          autoComplete="off"
                          variant="outlined"
                          margin="normal"
                          // required
                          name="spaceTrackUsername"
                          label="Space-Track Username"
                          
                          id="spaceTrackUsername"
                          error={Boolean(errors?.spaceTrackUsername)}
                          helperText={errors.spaceTrackUsername?.message}
                          {...field}    
                      />
                )}
              />

              {errors.spaceTrackUsername && <TooltipForAddSatellite type={'spaceTrackUsername'}/>}
        </StyledStepper>
        </div>
        </>
      );
    };

// const secondCase = showModal 


export default function HorizontalLabelPositionBelowStepper({onclose, type, handleLoadDataFromBack}) {

  const classes = useStyles();

 
 
  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0: return <FirstTab />;
      case 1: return  (  <SecondTab  />   );
      case 2: return ( <ThirdTab />    );
      default: return 'Unknown stepIndex';
    }
  }
 
    // const classes = useStyles();
    const methods = useForm({
      defaultValues: {
        noradId: "",
        mass: "",
        crossSection: "",
        collisionProbability: 0.00001,
        minimumDistance: 1000,
  
        companyName: "",
        pocName: "",
        PocEmail: "",
        spaceTrackUsername:"",
        propulsionSystem: false
      },
    });
    const [activeStep, setActiveStep] = useState(0);
    const [skippedSteps, setSkippedSteps] = useState([]);
    const [showModal, setShowModal] =  useState(false);
    const [modalType, setModalType] = useState();
    const [showLoading, setShowLoading] = useState(false);
    
    const [ checkBox, setCheckBox ] = useState(false)

    const steps = getSteps();
    const isStepOptional = (step) => {
      return step === 1 || step === 2;
    };
    const isStepFalied = () => {
      return Boolean(Object.keys(methods.formState.errors).length);
    };
    const isStepSkipped = (step) => {
      return skippedSteps.includes(step);
    };
  
    const handleNext = async (inputValues) =>  {
      console.log(inputValues, checkBox);
      inputValues.propulsionSystem=checkBox;
      if (activeStep === steps.length - 1) {
              setShowLoading(true)
              const response = await fetch( 'api/dashboard/addNewSatellite', {
              method: 'POST', 
              body: JSON.stringify(inputValues), 
              credentials: "include", 
                 headers: {
                   'Content-Type': 'application/json'
                 }
               }).then( async (res)=> {
              const json = await res.json();
              setShowLoading(false)
              if (res.status === 400) {
                setShowModal(true); setModalType(1); return
              };
              if (res.status === 409) {
                setShowModal(true); setModalType(2); return
              };
              setActiveStep(activeStep + 1);
              // if(type==='noSat'){
                handleLoadDataFromBack()
              // }
              // console.log('Успех:', JSON.stringify(json));
              // const json = await response.json();
              // console.log('21211212', json);
            }).catch (error => {
              console.error('Ошибка:', error);
              // alert('smth went wrong :( ')
            }) 
      } else {
        setActiveStep(activeStep + 1);
        setSkippedSteps(
          skippedSteps.filter((skipItem) => skipItem !== activeStep)
        );
      }
    };
    const handleBack = () => {
      setActiveStep(activeStep - 1);
    };


  return (
    <>
      <div className={styles.addNewSatellite_header} >
        Add New Satellite
        <CloseIcon onClick={onclose} className={styles.closeIcon}/> 
      </div>
      {/* <StyledStepper > */}
      <div className={classes.root}>
        <div className={styles.modalWrapper}>
          { showModal && <NoSuchNordIdModal modalType={modalType}/> }
          { showLoading && < CircleLoader /> }
        </div>
       
        <Stepper alternativeLabel activeStep={activeStep} className={classes.stepper}>
          
        {steps.map((step, index) => {
          const labelProps = {};
          const stepProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography
                variant="caption"
                align="center"
                style={{ display: "block" }}
              >
                optional
              </Typography>
            );
          }
          if (isStepFalied() && activeStep == index) {
            labelProps.error = true;
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step {...stepProps} key={index} className={classes.stepper}> 
              <StepLabel {...labelProps}
                StepIconProps={{
                  classes: { root: classes.stepIcon }
                }}
                >{step}
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div>
      
      {activeStep === steps.length ? (
        <div className={styles.satelliteAddedTab}>
        <Typography className={classes.instructions}>
          <div className={styles.lastTab}>
            <div className={styles.satelliteWrapper}>
              <DeleteSatelliteSvg  forAdd={true}/>
            </div>
            <div className={styles.congratulationsWrapper}>
              <div className="">Congratulations!</div>
              <div className="">New satellite has been successfully added</div>
            </div>
          </div>
        </Typography>
        <Button variant="contained" color="primary" onClick={onclose}>Ok, thanks</Button>
      </div>
      ) : (
        <>
        
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(handleNext)}>
              {getStepContent(activeStep, showModal)}
              {activeStep === 2 ?
            <div style={{backgroundColor: checkBox?'#223540':null}} className={styles.checkbox_wrapper} onClick={()=>{setCheckBox((prevState)=>!prevState)}}>
              {
                !checkBox ? <CheckBoxOutlineBlankTwoToneIcon onClick={()=>{console.log('kee')}} /> : <CheckBoxTwoToneIcon onClick={()=>{console.log('lee')}}/>
              }
              The satellite has a “Propulsion system”
            </div>
        : null}
              <div className={styles.buttonsWrapper}>
                 
                 {activeStep === 0 ? 
                  <Button
                    className={classes.button}
                    // disabled={activeStep === 0}
                    onClick={onclose}
                  >
                    Cancel
                  </Button>
                  :
                  <Button
                    className={classes.button}
                    // disabled={activeStep === 0}
                    onClick={ () => {handleBack(); setShowModal(false)}}
                  >
                    Back
                  </Button>

                }
             
              <Button
                className={classes.button }
                variant="contained"
                color="primary"
                // onClick={handleNext}
                disabled={showModal === true}
                type="submit"
              >
                {activeStep === steps.length - 1 ? "Finish" : "Next Step"}
              </Button>
              </div> 
            </form>
          </FormProvider>
        </>

      )}
       </div>
          
      </div> 
      {/* </StyledStepper> */}
    </>
  );
}










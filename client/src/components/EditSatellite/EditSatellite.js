import { useState, useEffect } from 'react';
import {
  useForm,
  Controller,
  FormProvider,
  useFormContext
} from "react-hook-form";

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import CloseIcon from '@material-ui/icons/Close';
import CancelIcon from '@material-ui/icons/Cancel';
import { TooltipForAddSatellite } from '../TooltipForAddSatellite/TooltipForAddSatellite';
import './EditSatellite.scss'
import { CircleLoader } from '../Loader/CircleLoader';
const useStyles = makeStyles({

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

  const additionalDataToSatellite = {
      mass: 25,
      crossSection: 456,
      acceptedCollisionProbability: 0.00001,
      acceptedMinimumDistance: 1000
  }

  const defaultValues = {
    mass: '',
    crossSec: '' 
}

export const EditSatellite = ({satellite, onclose, onOpenDeleteModal, openDeleteModal, setIsAuthenticated}) => {

  const [ showLoader, setShowLoader ] = useState(false)
  const [ satelliteData, setSatelliteData ] = useState()
  const loadSatelliteInfo = async() => {
    setShowLoader(true)
    const response = await  fetch(`api/dashboard/getSatelliteInfo?sat=${satellite.id}`, {
      method: 'GET',
      headers: {
      'Content-Type': 'application/json',
      'cache-control': 'no-cache',
      'credentials': "include",
      }

  });
  // console.log('satelliteData' , response)
      if(response.status === 200 ){
        const json = await response.json();
        if (json.data ){ setSatelliteData(json.data)
            console.log('satelliteData 11111111' , json.data)
            setShowLoader(false)
        
        }
      }
      if(response.status === 401 ){
        setShowLoader(false)
        localStorage.setItem('login', "false");
        setIsAuthenticated(false)   
      }
  }

    useEffect( () => {
      loadSatelliteInfo()

      
  
  }, []);

    const handleSendEditSatellite = async (data) => {
      console.log('edit data from FRONT to BACK', {...data, ...satellite})
      // satelliteData
      if(!data.mass){ data.mass= satelliteData.mass}
      if(!data.crossSection){ data.crossSection= satelliteData.crossSection}
      if(!data.collisionProbability){ data.collisionProbability= satelliteData.collisionProbability}
      if(!data.minimumDistance ){ data.minimumDistance= satelliteData.minimumDistance}
      const url = '';
      const dataToServer = { ...data, satellite };
      console.log('data', data)

      try {


        const response = await fetch( `/api/dashboard/editSatellite?sat=${satellite.id}`, {

          method: 'POST', 
          body: JSON.stringify(dataToServer), 
          credentials: "include", 
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if(response.status === 401 ){

          localStorage.setItem('login', "false");
          setIsAuthenticated(false)
 
    }
        const json = await response.json();
        console.log('Успех:', JSON.stringify(json));
        onclose()
      } catch (error) {
        console.error('Ошибка:', error);
      }

    }



    const classes = useStyles();

    const { handleSubmit, control, formState: { errors}} = useForm();
    // const {
    //   formState: { errors },
    // } = useFormContext();
    
    return(
        <div className="editSatellite_wrapper">
            <div className="editSatellite_headerWrapper">
                <span>Edit Satellite</span>
                <CloseIcon onClick={onclose}/>
            </div>
            <div className="editSatellite_nameWrapper">
                Satellite "{satellite.name}" details
            </div>
            {/* <CircleLoader type='dashBoard'/> */}
            {  showLoader && <CircleLoader type='dashBoard' /> }
        {satelliteData &&
            <form onSubmit={handleSubmit(data => handleSendEditSatellite(data))}>
                <Controller
                  control={control}
                  name="mass"
                  rules={{  pattern: /^(0|[1-9]\d*)?(\.\d+)?(?<=\d)$/g }}
                  // pattern: /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/g 
                  render={({ field }) => (
                    <TextField 
                        autoComplete="off"
                        type="number"
                        variant="outlined"
                        margin="normal"
                        className={classes.root}
                        label='Mass in kg'
                        defaultValue={satelliteData.mass} 
                        name="mass"
                        // onChange = { (e) => {handleOnchangeMassInput(e)} }
                        {...field}
                        error={Boolean(errors?.mass)}
                        helperText={errors.mass?.message}
                    />
                  )}
                  />
                   {errors.mass && <TooltipForAddSatellite type={'editMass'} />}
               <Controller
                  control={control}
                  name="crossSection"
                  rules={{  pattern: /^(0|[1-9]\d*)?(\.\d+)?(?<=\d)$/g }}
                  // pattern: /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/g 
                  render={({ field }) => (  
                    <TextField 
                    autoComplete="off"
                        type="number"
                        variant="outlined"
                        margin="normal"
                        className={classes.root}
                        label="Cross Section in square meters"
                        defaultValue={satelliteData.crossSection} 
                        name="crossSection" 
                        // onChange = { (e) => {handleOnchangeCrossSectionInput(e)} }
                        {...field}
                        error={Boolean(errors?.crossSection)}
                        helperText={errors.crossSection?.message}
                    />

                  )}
                  />
                   {errors.crossSection && <TooltipForAddSatellite type={'editCrossSection'}/>}

                   <Controller
                  control={control}
                  name="collisionProbability"
                  rules={{  pattern: /^(0|[1-9]\d*)?(\.\d+)?(?<=\d)$/g }}
                  // pattern: /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/g 
                  render={({ field }) => (  
                    <TextField 
                        // disabled
                        variant="outlined"
                        autoComplete="off"
                        margin="normal"
                        className={classes.root}
                        label="Accepted Collision Probability in decimal"
                        defaultValue={satelliteData.collisionProbability} 
                        name="collisionProbability"
                        {...field}
                        error={Boolean(errors?.collisionProbability)}
                        helperText={errors.collisionProbability?.message}

                    />)}
                    />
                    {errors.collisionProbability && <TooltipForAddSatellite type={'editCollisionProbability'}/>}
              
              <Controller
                  control={control}
                  name="minimumDistance"
                  rules={{  pattern: /^(0|[1-9]\d*)?(\.\d+)?(?<=\d)$/g }}
                  // pattern: /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/g 
                  render={({ field }) => ( 
                    <TextField 
                        // disabled
                        variant="outlined"
                        autoComplete="off"
                        margin="normal"
                        className={classes.root}
                        label="Accepted Minimum Distance"
                        defaultValue={satelliteData.minimumDistance} 
                        name="minimumDistance"
                        {...field}
                        error={Boolean(errors?.minimumDistance)}
                        helperText={errors.minimumDistance?.message}

                    />)}
                    />
                    {errors.minimumDistance && <TooltipForAddSatellite type={'editMinimumDistance'}/>}
             

            <button type='button' className='editSatellite_deleteButton' onClick={onOpenDeleteModal}>
                < CancelIcon />
                Remove Satellite
            </button>

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
      }
        </div>


    )
}
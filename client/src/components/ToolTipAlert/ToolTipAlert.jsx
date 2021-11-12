import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import WarningRoundedIcon from '@material-ui/icons/WarningRounded';
import Divider from '@material-ui/core/Divider';


const useStyles = makeStyles({
    alert:{
        display: 'flex',
        flexBasis: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '4px',
        
    },
    icon: {
        color: '#E31863',
        fontSize: '18px',
        marginRight: '6px',
     
    },
    headerText:{
        fontFamily: 'Barlow',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '16px',
        lineHeight: '140%',
        color: '#E31863',
    },
    divider: {
        backgroundColor: '#E31863'
    },
    tooltipHeader:{
        fontFamily: 'Barlow',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '16px',
        lineHeight: '140%',
        color:' #E9F7FF',
        textAlign: 'center',
        marginBottom: '-10px',
        marginTop: '4px',
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
  });



export const ToolTipAlert = ({alertType}) => {
    const classes = useStyles();
    let alertHeaderText = '';
    let alertBodyText = '';

    switch (alertType) {
        case 1:
            alertHeaderText = <div className={classes.headerText}>Incorrect Password</div>;
            alertBodyText = <>
                    <div className={classes.tooltipHeader}>Password requirements:</div>       
                        <ul className={classes.tooltipBody}>
                            <li> At least 8 characters</li>
                            <li> A mixture of both uppercase and lowercase letters</li>
                            <li> A mixture of letters and numbers.</li>
                            <li> Inclusion of at least one special character, e.g., ! @ # ? ]</li>
                        </ul>
                    <div className={classes.tooltipFooter}>Note: do not use {'<'}   or {'>'} in your password, as both can cause problems in Web browsers.</div>
                </>
            break;
        case 2:
            alertHeaderText = <div className={classes.headerText}>Incorrect Email</div>;
            alertBodyText = <>
                    <div className={classes.tooltipHeader}>Email requirements:</div>       
                        <ul className={classes.tooltipBody}>
                            <li>use format xxxxx@xxxx.xxx</li>
                        </ul>               
                </>
            break;
        case 3:
            alertHeaderText = <div className={classes.headerText}>Non Registered Email</div>;
            alertBodyText = <>
                    <div className={classes.tooltipHeader}>Please check your email or register new user</div>   
                    <br/>    
                </>
            break;
        case 4:
            alertHeaderText = <div className={classes.headerText}>This Email is already registered</div>;
            alertBodyText = <>
                    <div className={classes.tooltipHeader}>The email address you entered is already registered with SpaceGuard. Please choose another email address or log in to proceed.</div>   
                    <br/>    
                </>
            break;
        case 5:
            alertHeaderText = <div className={classes.headerText}>Check Password</div>;
            alertBodyText = <>
                    <div className={classes.tooltipHeader}>This password does not match that entered in the password field, please try again.</div>   
                    <br/>    
                </>
            break;
        case 6:
        alertHeaderText = <div className={classes.headerText}>Password is too weak</div>;
        alertBodyText = <>
                    <div className={classes.tooltipHeader}>Password requirements:</div>       
                        <ul className={classes.tooltipBody}>
                            <li> At least 8 characters</li>
                            <li> A mixture of both uppercase and lowercase letters</li>
                            <li> A mixture of letters and numbers.</li>
                            <li> Inclusion of at least one special character, e.g., ! @ # ? ]</li>
                        </ul>
                    <div className={classes.tooltipFooter}>Note: do not use {'<'}   or {'>'} in your password, as both can cause problems in Web browsers.</div>
                </>
        break;
        case 7:
            alertHeaderText = <div className={classes.headerText}>Wrong password</div>;
            alertBodyText = <>
                    <div className={classes.tooltipHeader}>Please try again.</div>   
                    <br/>    
                </>
            break;
        case 8:
            alertHeaderText = <div className={classes.headerText}>Institution is required</div>;
            alertBodyText = <>
                    <div className={classes.tooltipHeader}>Please try again.</div>   
                    <br/>    
                </>
            break;
        case "invalidPhone":
            alertHeaderText = <div className={classes.headerText}>Phone number is required</div>;
            alertBodyText = <>
                    <div className={classes.tooltipHeader}>Phone number is not valid</div>   
                    <br/>    
                </>
                break;
                //// login
        case "noUserDataProvided":
            alertHeaderText = <div className={classes.headerText}>No user data provided</div>;
            alertBodyText = <>
                    <div className={classes.tooltipHeader}>No user data provided, please try again.</div>   
                    <br/>    
                </>
                break;
        // case "invalidPhone":
        //     alertHeaderText = <div className={classes.headerText}>Phone number is required</div>;
        //     alertBodyText = <>
        //             <div className={classes.tooltipHeader}>Phone number is not valid</div>   
        //             <br/>    
        //         </>
        //         break;

        default:
            console.log(alertType)
            
            break;
    }
    return (
        (alertType === undefined ? null :
            (alertType === 'default' ? 
            
            <div>
                <div className={classes.tooltipHeader}>Password should be:</div>
            
                <ul className={classes.tooltipBody}>
                    <li> At least 8 characters</li>
                    <li> A mixture of both uppercase and lowercase letters</li>
                    <li> A mixture of letters and numbers.</li>
                    <li> Inclusion of at least one special character, e.g., ! @ # ? ]</li>
                </ul>
                
                <div className={classes.tooltipFooter}>Note: do not use {'<'}   or {'>'} in your password, as both can cause problems in Web browsers.</div>
        
            
            </div> 
            
            
                : 
            
                <div>
                    <div className={classes.alert}>
                        <WarningRoundedIcon className={classes.icon}  />
                        {alertHeaderText} 
                    </div>
                    
                    <Divider className={classes.divider}/>

                    {alertBodyText}

                </div>
            )
        )
    )
}
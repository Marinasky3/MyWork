
import Popover from '@material-ui/core/Popover';

import {StyledTooltipForAddSatellite} from './StyledTooltipForAddSatellite.js'

const email = 'email'
export const TooltipForAddSatellite = ( { type = email } ) => {

    const scripts = [
        { 
            type: 'email',
            header: ' Email ',
            text : 'Email requirements:',
            span: 'use format xxxxx@xxxx.xxx'
        },
        {
            type: 'spaceTrackUsername',
            header: ' Space-Track Username ',
            text : 'Space-Track Username requirements:',
            span: 'Field should contain at least 4 characters '
        },
        {
            type: 'pocName',
            header: ' POC Name ',
            text : 'POC Name requirements:',
            span: 'Field should contain at least 4 characters '
        },
        { 
            type: 'companyName',
            header: ' Company Name ',
            text : 'Company Name requirements:',
            span: 'Field should contain at least 4 characters '
        },
        { 
            type: 'noradId',
            header: ' NORAD ID',
            text : 'NORAD ID requirements:',
            span: 'Field is required and should contain a number '
        },
        { 
            type: 'mass',
            header: ' Mass in kg',
            // text : 'Mass in kg requirements:',
            span: 'Field should contain valid number '
        },
        { 
            type: 'crossSection',
            header: ' Cross Section ',
            text : 'Cross Section in square meters requirements:',
            span: 'Field should contain valid number'
        },{
            type: 'editCrossSection',
            header: ' Cross Section ',
            text : 'Cross Section in square meters requirements:',
            span: 'Field should contain valid number'
        },{
            type: 'passWord',
            header: ' Password ',
            text : 'Password requirements:',
            span: 'Password is required'
        },
        {
            type: 'institution',
            header: ' Institution ',
            text : 'Password requirements:',
            span: 'Field is required '
        },
        {
            type: 'phoneNumber',
            header: ' Phone Number ',
            text : 'Phone Number requirements:',
            span: 'Please, enter valid phone number '
        },{
            type: 'differentPass',
            header: ' Confirm Password ',
            text : 'Confirm Password  requirements:',
            span: 'When confirming a password, you must enter the same password. '
        },{
            type: 'incorrectPassword',
            header: ' Password ',
            text : 'Confirm Password  requirements:',
            span: ' You entered an incorrect password '
        },{
            type: 'collisionProbability',
            header: ' Collision Probability ',
            text : 'Field Requirements:',
            span: 'Field should contain valid number '
        },{
            type: 'minimumDistance',
            header: 'Minimum Distance',
            text : 'Field Requirements:',
            span: 'Field should contain valid number '
        },{
            type: 'editMinimumDistance',
            header: 'Minimum Distance',
            text : 'Field Requirements:',
            span: 'Field should contain valid number '
        },
       



    ]
   
    const text = type === 'email' ? scripts[0] : 
                 type === 'spaceTrackUsername' ? scripts[1] : 
                 type === 'pocName' ? scripts[2] : 
                 type === 'companyName' ? scripts[3]: 
                 type === 'noradId' ? scripts[4] :
                 type === 'mass' ? scripts[5] :
                 type === 'crossSection' ? scripts[6] : 
                 type === 'editMass' ? scripts[5] :
                 type === 'editCrossSection' ? scripts[6] : 
                 type === 'oldPassword' ? scripts[8] : 
                 type === 'institution' ? scripts[9] :
                 type === 'phoneNum' ? scripts[10] : 
                 type === 'differentPass' ? scripts[11]: 
                 type === 'incorrectPassword' ? scripts[12]: 
                 type === 'collisionProbability' ? scripts[13]:
                 type === 'minimumDistance'? scripts[14] : 
                 type === 'editMinimumDistance' ? scripts[15] :  
                 type === 'editCollisionProbability' ? scripts[13] : scripts[0]  ;

               
    return (
        <StyledTooltipForAddSatellite  type={type}>
            <div className="tooltipForAddSatellite_header">
                <div className="">
                    <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.903 14.72C17.903 15.136 17.7563 15.4533 17.463 15.672C17.1696 15.8907 16.8096 16 16.383 16H1.61497C1.1883 16 0.828304 15.888 0.534971 15.664C0.241637 15.44 0.0949707 15.1253 0.0949707 14.72C0.0949707 14.4 0.190971 14.0747 0.382971 13.744L7.75897 0.88C8.11097 0.293333 8.52697 0 9.00697 0C9.48697 0 9.8923 0.293333 10.223 0.88L17.615 13.76C17.807 14.1013 17.903 14.4213 17.903 14.72ZM10.111 6.544V4.208H7.88697V6.544C7.88697 6.69333 7.89764 6.83467 7.91897 6.968C7.9403 7.10133 7.96964 7.25067 8.00697 7.416C8.0443 7.58133 8.07364 7.72267 8.09497 7.84L8.51097 10.432H9.45497L9.88697 7.84C9.9083 7.73333 9.9403 7.59467 9.98297 7.424C10.0256 7.25333 10.0576 7.10133 10.079 6.968C10.1003 6.83467 10.111 6.69333 10.111 6.544ZM10.111 12.736C10.111 12.4267 10.0016 12.1653 9.78297 11.952C9.5643 11.7387 9.3003 11.632 8.99097 11.632C8.6923 11.632 8.43364 11.7387 8.21497 11.952C7.9963 12.1653 7.88697 12.4267 7.88697 12.736C7.88697 13.0453 7.9963 13.3093 8.21497 13.528C8.43364 13.7467 8.6923 13.856 8.99097 13.856C9.3003 13.856 9.5643 13.7467 9.78297 13.528C10.0016 13.3093 10.111 13.0453 10.111 12.736Z" fill="#E31863"/>
                    </svg>
                </div>
                <div className="">
                    Incorrect {text.header}
                </div>
            </div>
            <div className="tooltipForAddSatellite_main">
                
                {text.span} 
                
            </div>

            {type === 'oldPassword' && 
            <div className="tooltipPAssword_wrapper">
                <div className="">Password requirements:</div>
                    <ul>
                        <li>At least 8 characters</li>
                        <li>A mixture of both uppercase and lowercase letters</li>
                        <li>A mixture of letters and numbers.</li>
                        <li>Inclusion of at least one special character, e.g., ! @ # ? ] </li>
                    </ul>
                    <div className="">
                        Note: do not use  &lt; or &gt; in your password, as both can cause problems in Web browsers.
                    </div>
                </div>
            }
 

        </StyledTooltipForAddSatellite >
    )
}


import styled from 'styled-components/macro';

// import StyledTableRow from '../TableRow/StyledTableRow';

// props {checkBox, columns}
export const StyledTooltipForAddSatellite = styled.div`
    min-height: 64px;
    width: 309px;
    position: absolute;
    background-color: #223540;
    border-radius: 8px;
    top: ${ props => props.type === 'email' ? '182px' : 
                     props.type === 'spaceTrackUsername' ? '255px' :
                     props.type === 'pocName' ? '110px' : 
                     props.type === 'companyName' ? '38px' :  
                     props.type === 'noradId' ? '0px' : 
                     props.type === 'mass' ? '73px' :
                     props.type === 'crossSection' ? '148px' :
                     props.type === 'editMass' ? '9px' : 
                     props.type === 'editCrossSection' ? '88px' :
                     props.type === 'oldPassword' ? '177px' : 
                     props.type === 'institution' ? '9px' : 
                     props.type === 'phoneNum' ? '87px'  :
                     props.type ==='differentPass' ? '323px'  :
                     props.type === 'incorrectPassword' ? '170px' : 
                     props.type === 'collisionProbability' ? '220px' :
                     props.type === 'minimumDistance'? '293px' : 
                     props.type === 'editMinimumDistance' ? '250px' :
                     props.type === 'editCollisionProbability' ? '170px' : null };

    left: 350px;
    font-family: Barlow;
    padding: 12px;
    padding-top: 8px;
    padding-bottom: 8px;
    box-sizing: border-box;
    .tooltipForAddSatellite_header{
        color: #E31863;
        font-size: 1.6rem;
        display: flex;
        justify-content: center;
        border-bottom: 1px solid  #E31863;
        padding-bottom: 8px;
        box-sizing: border-box;
        
        &>div:first-child{
            margin-right: 6px;
            width: 20px;
            /* background-color: red; */
            svg{
                position: static;
            }
        }
       
    }
    .tooltipForAddSatellite_main{
        margin-top:6px;
        color: #E9F7FF;
        font-size: 1.4rem;
    }

    .tooltipPAssword_wrapper{
        div:first-child{
            color: #E9F7FF;
            font-size: 14px;

        }
        ul{
            padding: 0;
            padding-left:13px;
            margin: 5px;
            color:#7CB3BF;
            font-size: 1.4rem;

        }
        div:last-child{
            color: #E31863;
            font-size: 14px;

        }
    }

`
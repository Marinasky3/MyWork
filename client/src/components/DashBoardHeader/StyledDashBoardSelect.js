import styled from 'styled-components/macro';

// import StyledTableRow from '../TableRow/StyledTableRow';

// props {checkBox, columns}
export const StyledDashBoardSelect = styled.div`


    box-sizing: border-box;
   /* display: flex; */
   flex-wrap: wrap;
    top: 20px;
    left: ${ props => props.type === 'table' ? '470px' : '450px' };
    width: 439px;
    max-height: ${ props => props.openSelect ? '422px' : '41px' }; 
    /* overflow: hidden; */
    position: absolute;
    color: #7CB3BF;
    z-index: 1;
    border: ${ props => props.openSelect ? '1px solid #7CB3BF' : '1px solid #20404A' }; 

    &:hover {
        border: 1px solid #7CB3BF;
    }

    background-color:  #223540;
    border-radius: 8px;
    margin-left: 25px;
    line-height: 39px;
   
    
    font-size: 1.4rem;
    transition: all 300ms ease;
    cursor: pointer;
    
   
     &>.dashBoardHeader_mainSelectWrapper{
        /* background-color: blue; */
        display:flex;
        justify-content: space-between;
        margin-left: 16px;
        margin-right: 16px;
        height: 41px;
        border-bottom: ${ props => props.openSelect ? '1px solid #20454A' : null };
     
        transition: all 300ms ease;
    }
    &>.dashBoardHeader_mainSelectWrapper:hover{
        color: #E9F7FF;
        transition: all 300ms ease;
      
    }
    
    svg {

        font-size: 20px;
        height: 41px;
    }
    .allSatellitesSelection{
    
        overflow: ${ props => props.openSelect ? 'auto' : 'hidden' }; 
        /* height: 0px; */
        /* background-color: red; */
        max-height: ${ props => props.openSelect ? '340px' : '0px' }; 
        width: 420px;
        transition: max-height 300ms ease;
        scrollbar-width: thin;
        scrollbar-color: rgb(73, 61, 61) ; 

    &::-webkit-scrollbar {
        width: 5px;
      } 
    &::-webkit-scrollbar-track {
        background: #242122;
        box-shadow: 0px 0px 4px 1px #242122 inset;
        border-radius: 10px;
      }
      &::-webkit-scrollbar-thumb {
        background-color: #20404A;
        border-radius: 5px; 
      }
       
       .satellites_wrapper{
        height: 25px;
        line-height: 25px;
        overflow: hidden;
        margin-top: 8px;
        margin-left: 11px;
        margin-right: 11px;
        width: 389px;
        cursor: pointer;
        padding-left: 5px;

        &:last-child{
            margin-bottom:16px
        }
        &:hover{
            background: #20404A ;
            color: #E9F7FF;
            transition: all 300ms ease;
        }
        
        
     }

        
    }

    


`
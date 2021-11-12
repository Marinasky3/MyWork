

import styled from 'styled-components/macro';

export const StyledDashBoardAllSatellites = styled.div`

height: 570px;
width: 440px;

position: relative;

.exportButton_wrapper{
    width: 101px;
    height : 41px;
    transition: all 300ms ease;
    border-radius: 8px;
    position: absolute;
    top: -10px;
    right: 0;

    &:hover{
        background-color:#223540;
       
        transition: all 300ms ease;
    }
}
    .dashBoardAllSatellites_exportButton{
    position: relative;
    width: 101px;
    height : 41px;
    /* padding: 12px 16px; */
    font-family: Barlow;
    font-size: 1.4rem;
    font-weight: 400;
    background: linear-gradient(90deg, #0CE2E2 -100%, #0E7CAA 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent; 
    outline: none;
    cursor: pointer;
    border: 1px solid #0E7CAA;
    border-radius: 8px;
    /* background-color: red; */

    
    transition: all 300ms ease;

   
    
}

    .dashBoardAllSatellites_exportButton.disabled{
            border: 1px solid #20454A;
            color: #20454A;
            transition: all 300ms ease;
            cursor: not-allowed;
            &:hover{
                background-color: #242122;
                transition: all 300ms ease;
                cursor: not-allowed;
            }
        }
    .dashBoardAllSatellites_wrapper{
        height: 571px; //907
        width: 440px;
        background-color: #262628;


        margin-top: 48px;
        border-radius: 8px;
        padding-top: 16px;
        padding-bottom: 24px;
        padding-left: 16px ;
        /* padding: 16px 16px 24px; */
        box-sizing: border-box;
        padding-bottom: 24px;
        /* overflow-y: scroll; */

        .dashBoardAllSatellites_headerWrapper{
            color:#7CB3BF;
            font-weight: 400;
            font-size: 14px;
            margin-bottom: 16px;
        }

       
    }
    .dashBoardAllSatellites_allSatellitesWrapper{
        height: 510px;
        box-sizing: border-box;
        padding-bottom: 10px;

        overflow-y: scroll; 
        scrollbar-width: thin;
        scrollbar-color: rgb(73, 61, 61) ; 

        &::-webkit-scrollbar {
            width: 8px;
        } 
        &::-webkit-scrollbar-track {
            background: #242122;
            box-shadow: 0px 0px 4px 1px #242122 inset;
            border-radius: 10px;
        }
        &::-webkit-scrollbar-thumb {
            background-color: #20404A;
            border-radius: 8px; 
        }

        /* background-color: red; */
    }

`
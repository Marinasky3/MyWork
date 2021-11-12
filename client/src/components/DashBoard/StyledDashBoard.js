import styled from 'styled-components/macro';
import imgBg1 from '../../img/first.png'
import imgBg2 from '../../img/second.png'

export const StyledDashBoard = styled.div`


    box-sizing: border-box;
    max-height: 960px;
    width: 900px;
    margin-bottom: 27px;
    margin-left: 40px;
    margin-right: 20px;

    /* background-color: rgb(96, 105, 102); */

    .dashBoard_headerWrapper{
        display: flex;
        box-sizing: border-box;
        color: #E9F7FF;
        height: 24px;
        font-size: 2rem;
        align-items:  flex-end;

        &>svg{
            cursor: pointer;
            color: #7CB3BF;
            transition: all 300ms ease;
            font-size: 1.8rem;
            margin-left: 12px;
            
            
            &:hover{
                color: #E9F7FF;
                transition: all 300ms ease;
            }
        }

        .dashBoard_headerButton_shawAll{
            width: 69px;
            color: #7CB3BF;
            font-size: 1.4rem;
            margin-top: 5px;
            margin-right: 16px; 
            position: relative; 
             margin-left: 20px;
            cursor: pointer;
            transition: all 300ms ease;
            &:hover{
                color: #E9F7FF;
                transition: all 300ms ease;
            }

            svg{
                 position: absolute;
                top: -1px; 
                left: -19px; 
                font-size: 2rem;
                transform: rotate(90deg)
            }


        }
    }
    .dashBoard_firstThird_wrapper{
        box-sizing: border-box;
        display: flex;
        height: 233px;
        /* background-color: aquamarine; */
        margin-top: 24px;
    }
    .dashBoard_firstThird_countersWrapper{
        box-sizing: border-box;
        /* background-color: aqua; */
        display: flex;
        flex-wrap: wrap;
        width: 555px;
        height: 233px;
        /* margin-left: 20px; */
        margin-bottom: 20px;
    }
    .dashBoard_firstThird_counters__firstCounter{
        box-sizing: border-box;
        padding: 16px;
        width: 267px;
        height: 121px;
        background: url(${ imgBg2 }) 0 0/100% 100% no-repeat;
        border-radius: 8px;
        margin-right: 20px;
        margin-bottom: 20px;

        span {
            color: #E9F7FF;
            font-size: 1.4rem;
            font-weight: 400;
        }
        .dashBoard_firstThird_counters__num{
            font-weight: 700;
            color: #E9F7FF;
            font-size: 3.6rem;
            margin-top: 5px;
            overflow: hidden;
            height: 43px;
        }
        .dashBoard_firstThird_counters__satellite{
            font-size: 2rem;
            font-weight: 700;
            color: #E9F7FF;
            height: 24px;
            overflow: hidden;
        }

    }
    .dashBoard_firstThird_counters__secondCounter{
        box-sizing: border-box;
        padding: 16px;
        width: 267px;
        height: 121px;
        
        background: url(${ imgBg1 }) 0 0/100% 100% no-repeat;
        border-radius: 8px;
        span {
            color: #E9F7FF;
            font-size: 1.4rem;
            font-weight: 400;
        }
        .dashBoard_firstThird_counters__num{
            font-weight: 700;
            color: #E9F7FF;
            font-size: 3.6rem;
            margin-top: 5px;
            overflow: hidden;
            height: 43px;
        }
        .dashBoard_firstThird_counters__satellite{
            font-size: 2rem;
            font-weight: 700;
            color: #E9F7FF;
            height: 24px;
            overflow: hidden;
        }

        
    }
    .dashBoard_firstThird_satellitesQuantity{
        display: flex;
        box-sizing: border-box;
        padding-top: 23px;
        padding-bottom: 23px;
        padding-left: 16px;
        padding-right: 16px;
        height: 92px;
        width: 555px;
        
        margin-bottom: 0px;
        border-radius: 8px;
        background-color: #262628;
    }
    .dashBoard_firstThird_satellitesQuantity_svgWrapper{
       
        margin-right: 17px;
        
        

    }
    .dashBoard_generalInfo_wrapper{
        color: #7CB3BF;
        font-size: 1.4rem;
        font-weight: 400;

        height: 17px;
        overflow: hidden
    }
    .dashBoard_firstThird_counters__satellite{
        font-size: 2rem;
            font-weight: 700;
            color: #E9F7FF;
            height: 24px;
            overflow: hidden;
            margin-top: 8px;
    }

    .dashBoard_firstThird_satellitesQuantityWrapper{
       margin-left: 20px;
        height: 233px;
        width: 325px;
        border-radius: 8px;
        background-color: #262628;
        /* height: 150px;
        width: 200px; */
    }
    .dashBoard_firstThird_satellitesQuantity_totalSat, .dashBoard_firstThird_satellitesQuantity_totalConj{
        display: flex;
        align-items: center;
        height: 118px;
        width: 278px;
        margin: auto;
        border-bottom: 1px solid #223540;
    }

    .dashBoard_firstThird_satellitesQuantity_totalConj{
        border-bottom: none; 
    }
    .dashBoard_secondThird_wrapper{
        display: flex;
        box-sizing: border-box;
        height: 320px;
        width: 900px;
        margin-top: 20px;

    }

`
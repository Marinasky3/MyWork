import styled from 'styled-components/macro';

export const StyledDashBoardAddedSatellite = styled.div`

            min-height: 58px;
            max-height: 73px;
            width: 408px;
            padding-top: 6px;
            padding-bottom: 6px;
            box-sizing: border-box;
            overflow: hidden;
            /* background-color: blue; */

            display: flex;

            .dashBoardAllSatellites_satellite_mainWrapper{
                width: 300px;
                /* background-color: royalblue; */
                .dashBoardAllSatellites_satellite_name{
                    color: #E9F7FF;
                    font-size: 1.6rem;
                    line-height: 19.2px;
                    max-height: 38px;
                    overflow: hidden;
                }
                .dashBoardAllSatellites_satellite_risk{
                    /* color:   ${ props => props.risk ? '#0CE2E2 ' : ' #7CB3BF'}  ; */

                    ${ props => props.risk  ? 
                        `background: linear-gradient(90deg, #0CE2E2 -100%, #0E7CAA 100%);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent; ` : 
                        'color: #7CB3BF;'
                    }



                     /* #7CB3BF; */
                    font-size: 1.4rem;
                    margin-top: 6px;
                    position: relative;
                    box-sizing: border-box;
                    padding-left: ${ props => props.risk ? '15px ' : ' 0px'}  ;
                     

                    svg{
                        display: inline-block;
                        margin-right: 8px;
                        /* height: 18px; */
                        /* padding-top: 5px */
                        position: absolute;
                        left: 0px;
                        top: 2px;
                    }

                }
            }
            .dashBoardAllSatellites_satellite_isGuardedWrapper{
                font-size: 1.6rem;
                font-weight: 400;
                text-align: end;
                width: 103px;
                box-sizing: border-box;
                padding-top: 20px;
                padding-right: 15px;
                color: ${ props => props.isGuarded ? '#23C095 ' : ' #FEC36A'}  ;

                position: relative;

                svg{
                    position: absolute;
                    top: 23px;
                    right: -5px

                }
            }
        

`
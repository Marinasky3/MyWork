import styled from 'styled-components/macro';

export const StyledTableCharts = styled.div`

height: ${ props => props.openTableChart ? 
    '915px' :
    '0px' 
 } ;
 border: ${ props => props.openTableChart ?  '1px solid #20454A;' :'none' } ;
 transition: height 300ms ease-in-out ;

 overflow: hidden;

box-sizing: border-box;

width: 1359px;
margin: auto;
padding-top:  ${ props => props.openTableChart ? ' 40px' : '0px'} ;
/* display: flex; */
justify-content: center
/*  transition: border 3000ms ease-in-out; */
/* border: 1px solid #5D6595; */

`
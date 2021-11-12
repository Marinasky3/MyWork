import styled from 'styled-components/macro';

// import StyledTableRow from '../TableRow/StyledTableRow';

// props {checkBox, columns}
export const StyledTableRow = styled.div`

    box-sizing: border-box;
    margin: auto;
  
    padding-right: 16px;
    display: grid;
    grid-template-columns: 90px 188px 188px 170px 112px 160px 193px 83px 15px;

    grid-column-gap:  16px; //16


    font-size: ${ props =>  props.tableHead ? '1.4rem' : '1.6rem'};
    color: ${ props =>  props.tableHead ? '#7CB3BF' : '#E9F7FF'} ;
    
    font-weight: ${ props =>  props.tableHead ? '500' : '400'};

    width: 1359px;

    min-height: 43px;
    max-height: 62px;
    margin: auto;
    margin-top: ${ props =>  props.tableHead ? '3px' : '3px'};
    margin-bottom: 3px;
    padding-left: 16px;
    padding-right: 16px;
    border: ${ props =>  props.tableHead ? null : '1px solid #20454A;'} ;
    
    .conjunctionsClassification{
        ${ props => props.classification === 'High risk' ? 
    


        `background: linear-gradient(90deg, #0CE2E2 0%, #0E7CAA 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent; ` : 
        'color: #7CB3BF'
        }
    }
    

    
`
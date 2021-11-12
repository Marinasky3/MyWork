import styled from 'styled-components/macro';

// import StyledTableRow from '../TableRow/StyledTableRow';

// props {checkBox, columns}
export const StyledActionTableRow = styled.div`
 
 svg{
 
        margin-right: 0px;
        font-size: 19px;
        color: #7CB3BF;
        transform: ${ props => props.openCharts ? 'rotate(180deg)' : null };
        transition: transform 400ms ease;
    }
`
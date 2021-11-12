import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';

export const StyledLink = styled(Link)`
    font-size: 1.6rem;
    box-sizing: border-box;
    text-decoration: none;
    color: #7CB3BF;
    font-weight: 400PX;
    display: block;
    padding: 12px 24px;
    line-height: 20px;
    align-self: center;
    border: 1px solid transparent;
    /* transition: all 490ms ease; */
    /* text-decoration: solid 1px  transparent; */
        &.active,
        &:hover{
             color:#E9F7FF;
             font-weight: 500;
             border: 1px solid transparent;
            
             /* border-image: radial-gradient(circle, rgba(51,44,85,0) 0%, rgba(238,133,205,1) 2%); */
            /* transition: all 490ms ease; */

             border-image:radial-gradient(rgba(0,143,104,0) 75%, #27AAE1) 1;
            
  
}
    
    &.active {
        cursor: default;
    }
    
`

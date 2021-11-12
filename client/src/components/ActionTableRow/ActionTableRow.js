import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

import {StyledActionTableRow} from './StyledActionTableRow.js'

export const ActionTableRow = ({openCharts}) => {

    return (

        <StyledActionTableRow openCharts= {openCharts}>
            <KeyboardArrowDownIcon />
        </StyledActionTableRow>
    )
}
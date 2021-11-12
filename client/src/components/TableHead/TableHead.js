import UnfoldMoreSharpIcon from '@material-ui/icons/UnfoldMoreSharp';
import { TableRow } from '../TableRow/TableRow'

import './TableHead.scss'


const tableHead = [
    'Conjunction ID', 'Created', 'TCA', 'Collision Probability', 'Miss Distance (m)', 'Chaser', 'Target', 'Classification'
]

export const TableHead = ({handleSortCreated, handleSortTca, handleSortColProb, handleSortMissDis}) => {

    return (
        <TableRow tableHead={true}>
        
                <div className="table_cellWrapper">{tableHead[0]}</div>
                <div className="table_cellWrapper">
                    {tableHead[1]}
                    <UnfoldMoreSharpIcon onClick={handleSortCreated}/>
                </div>
                <div className="table_cellWrapper">
                    {tableHead[2]}
                    <UnfoldMoreSharpIcon onClick={handleSortTca}/>
                </div>
                <div className="table_cellWrapper">
                    {tableHead[3]}
                    <UnfoldMoreSharpIcon onClick={handleSortColProb}/>
                </div>
                <div className="table_cellWrapper">
                    {tableHead[4]}
                    <UnfoldMoreSharpIcon onClick={handleSortMissDis} />
                </div>
                <div className="table_cellWrapper">{tableHead[5]}</div>
                <div className="table_cellWrapper">{tableHead[6]}</div>
                <div className="table_cellWrapper">{tableHead[7]}</div>
            
        </TableRow>
    )
}
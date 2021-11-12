
import { FireSatellite } from '../../svg_elements/FireSatellite'
import './NoSuchNordIdModal.scss'

export const NoSuchNordIdModal = ({modalType}) => {

    return (
        <>
            { modalType === 1 &&
            <div className='noSuchNordIdModal'>
                <FireSatellite />
                <div className="noSuchNordIdModal_error">Error</div>
                
                <div className="">You entered non-existent NORAD ID.</div>
                <div className="">Please come back and enter correct NORAD ID</div>
            </div>
            }
            { modalType === 2 &&
                <div className='noSuchNordIdModal'>
                    <FireSatellite />
                    <div className="noSuchNordIdModal_error">Error</div>
                    
                    <div className="">The NORAD ID you entered has already been added.</div>
                    <div className="">Please come back and enter correct NORAD ID</div>
                </div>
                }
        </>
    )
}
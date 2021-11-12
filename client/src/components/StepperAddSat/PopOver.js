
import "./PopOver.scss"

export const PopOver = ({ type }) => {

    return (

        <div className="popOver_wrapper">
            {type === 1 && 
            <>
            <div className="popOver_headerWrapper">
            Do you have a NORAD ID? 
                <br/>
                Register your satellite at
            </div>
            <div className="popOver_bodyWrapper">
                <a href='https://www.space-track.org/documents/New_Satellite_Registration_Form.docx'> 
                https://www.space-track.org/documents/
                New_Satellite_Registration_Form.docx
            </a>
                
            </div>
            </>
        }
        {type === 2 && 
            <>
            <div className="popOver_headerWrapper">
            Do you have a Space-Track account?
                <br/>
                Create an account  at 
            </div>
            <div className="popOver_bodyWrapper">
                <a href='https://www.space-track.org/' target="blank"> 
                https://www.space-track.org/
            </a>
                
            </div>
            </>
        }
        </div>
    )
}


import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { LogoSvg } from '../../svg_elements/logo_svg';
import { Link } from 'react-router-dom';
import { NavBar } from '../NavBar/NavBar'
import userInfo_photo from '../../img/photo@2x.png'
import './Header.scss'
import { EditProfileModal } from '../EditProfileModal/EditProfileModal';
import { Redirect } from 'react-router'
import SettingsIcon from '@material-ui/icons/Settings';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';


import {useState, useEffect} from 'react';

// const defaultUser = 'Edward_foss@gmail.com'

export const Header = ({ setIsAuthenticated, isAuthenticated}) => {

    const [redirect, setRedirect] = useState(false) 
    const [userInfo, setUserInfo] = useState()

    const handleRestartHeader = () => {

        fetch('/api/dashboard/email', {
            method: 'GET',
            headers: {
            // 'Content-Type': 'application/json',
            'cache-control': 'no-cache',
            'credentials': "include",
            }
        }).then(async (res) => await res.json()).then((json) =>{
            // console.log('from 88833: ', json);
            setUserInfo(json)
            // console.log('sorted by created')
        })
    }

    useEffect(()=>{
        handleRestartHeader()
    },[])

    const handleExit = () => {
        

        fetch('/api/auth/logout', {
            method: 'POST',
            headers: {
            // 'Content-Type': 'application/json',
            'cache-control': 'no-cache',
            'credentials': "include",
            }
        }).then(async () =>{
            // console.log(setIsAuthenticated)
            // setRedirect(true)
            localStorage.setItem('login', "false");
            setIsAuthenticated(false)
            console.log('isAuthenticated  from header', isAuthenticated)
        })
    }
      
    const [openAddSatModal, setOpenAddSatModal] = useState(false)
        const handleOpenAddSatModal = () => {
            setOpenAddSatModal( prevState => !prevState )
        }
    // console.log('userInfo.email', userInfo.email)
    return(
        <>
        {/* {redirect && <Redirect to='SingUp'/>} */}
        <div className="header_wrapper">
            <div className="header_logoWrapper">
                
            </div>
            <NavBar />
            <div className="header_userInfoWrapper">
                { userInfo ? userInfo.email : null}
                {/* <Link to="/SingUp"> */}
                    <SettingsIcon onClick={handleOpenAddSatModal}/>
                    <Modal
                        open={ openAddSatModal }
                        onClose={ ()=>{ setOpenAddSatModal(false)  }}
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                            timeout: 500,
                        }}
                    >
                        <Fade in={ openAddSatModal }>
                            <EditProfileModal 
                                // handleLoadDataFromBack={handleLoadDataFromBack}
                                onclose={ ()=>{ setOpenAddSatModal(false) } }
                                userInfo={userInfo}
                                handleRestartHeader={handleRestartHeader}

                                />
                        </Fade>
                    </Modal>

                    <ExitToAppIcon onClick={handleExit}  />
                {/* </Link> */}
            </div>
        </div>
        </>
    )
}
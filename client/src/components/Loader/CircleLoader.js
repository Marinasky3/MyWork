

import './CircleLoader.scss'

export const CircleLoader = ({type='wide'}) => {

    return(
        <>
            {type==='wide'&&
                <div className="circleLoade_typeWrapper">
                    <div className="circleLoade_wrapper">
                        <div className="">Loading</div>

                        <div className="circleLoade_loaderWrapper">
                            <svg width="56" height="57" viewBox="0 0 56 57" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.33325 28.5C1.33325 43.228 13.2719 55.1667 27.9999 55.1667C42.7279 55.1667 54.6666 43.228 54.6666 28.5C54.6666 13.772 42.7279 1.83337 27.9999 1.83337" stroke="#0EC0D3" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <svg width="36" height="35" viewBox="0 0 36 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M34 17.5C34 8.664 26.836 1.5 18 1.5C9.164 1.5 2 8.664 2 17.5C2 26.336 9.164 33.5 18 33.5" stroke="#0EC0D3" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>

                        </div>
                    
                    </div>
                </div>
            }
            {  type='dashBoard' && type!=='edit' && 
            <div className="dashBoard_loaderWrapper">
                {/* <div className="circleLoader_bigBackground"> */}
                    <div className="circleLoade_wrapper">
                        <div className="">Loading, please wait</div>

                        <div className="circleLoade_loaderWrapper">
                            <svg width="56" height="57" viewBox="0 0 56 57" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.33325 28.5C1.33325 43.228 13.2719 55.1667 27.9999 55.1667C42.7279 55.1667 54.6666 43.228 54.6666 28.5C54.6666 13.772 42.7279 1.83337 27.9999 1.83337" stroke="#0EC0D3" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <svg width="36" height="35" viewBox="0 0 36 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M34 17.5C34 8.664 26.836 1.5 18 1.5C9.164 1.5 2 8.664 2 17.5C2 26.336 9.164 33.5 18 33.5" stroke="#0EC0D3" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>

                        </div>
                    
                    </div>
                {/* </div> */}
            </div>

            }
           { type==='edit' &&  
           
           <div className="circleLoade_editWrapper">
           <div className="circleLoade_wrapper">
               <div className="">Loading</div>

               <div className="circleLoade_loaderWrapper">
                   <svg width="56" height="57" viewBox="0 0 56 57" fill="none" xmlns="http://www.w3.org/2000/svg">
                       <path d="M1.33325 28.5C1.33325 43.228 13.2719 55.1667 27.9999 55.1667C42.7279 55.1667 54.6666 43.228 54.6666 28.5C54.6666 13.772 42.7279 1.83337 27.9999 1.83337" stroke="#0EC0D3" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/>
                   </svg>
                   <svg width="36" height="35" viewBox="0 0 36 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                       <path d="M34 17.5C34 8.664 26.836 1.5 18 1.5C9.164 1.5 2 8.664 2 17.5C2 26.336 9.164 33.5 18 33.5" stroke="#0EC0D3" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/>
                   </svg>

               </div>
           
             </div>
             </div>
           
           } 


        </>
        
    )
    
}
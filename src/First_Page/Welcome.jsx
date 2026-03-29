// import './Welcome.css';
// import Home from './Home';
// import PortfolioMain from '../Portfolio_Main';
// import { useState } from 'react';

// const Welcome = () => {
//     const [PreScreen, setPreScreen] = useState(true);
//     const [ homeScreen, setHomeScreen] = useState(false);

//     const handleClick = () => {
//         setPreScreen(false);
//         setTimeout(() => {
//             setHomeScreen(true);
//         }, 1600);
//     }

//     return ( !homeScreen ? (
//         <div className="screen">
//             <div className="welcome">
//                 <h1 className='moving-text'>React Developer React Developer React Developer React Developer React Developer React Developer React Developer React Developer React Developer React Developer React Developer React Developer React Developer React Developer React Developer React Developer React Developer React Developer React Developer React Developer</h1>
//             </div>
//             <div className={PreScreen ? 'Intro' : 'ScreenChanger'} onClick={()=>handleClick()}>
//                     <p className={PreScreen ? 'Intro_p' : 'Intro_hover_Intro_p'}>WELCOME</p>
//                     <div className={PreScreen ? 'dot' : 'Intro_hover_dot'}></div>
//             </div>
            
//         </div> ) : (<PortfolioMain />
//             )    )
// }
// export default Welcome;

import './Welcome.css';
import Home from './Home';
import PortfolioMain from '../Portfolio_Main';
import { useState, useEffect } from 'react';

const Welcome = () => {
    const [PreScreen, setPreScreen] = useState(true);
    const [homeScreen, setHomeScreen] = useState(false);

    useEffect(() => {
        const timer1 = setTimeout(() => {
            setPreScreen(false);

            const timer2 = setTimeout(() => {
                setHomeScreen(true);
            }, 1600); // wait for animation to complete

            return () => clearTimeout(timer2);
        }, 2500); // after 5 sec transition starts

        return () => clearTimeout(timer1);
    }, []);

    return (
        !homeScreen ? (
            <div className="screen">
                <div className="welcome">
                    <h1 className='moving-text'>
                        React Developer React Developer React Developer React Developer React Developer React Developer React Developer React Developer
                    </h1>
                </div>

                <div className={PreScreen ? 'Intro' : 'ScreenChanger'}>
                    <p className={PreScreen ? 'Intro_p' : 'Intro_hover_Intro_p'}>
                        WELCOME
                    </p>
                    <div className={PreScreen ? 'dot' : 'Intro_hover_dot'}></div>
                </div>
            </div>
        ) : (
            <PortfolioMain />
        )
    );
}

export default Welcome;
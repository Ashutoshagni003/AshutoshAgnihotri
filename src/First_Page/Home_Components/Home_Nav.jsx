// import './Home_Nav.css';
// import { NavLink } from "react-router-dom";


// const HomeNav = () => {
//     return (
//         <div className="HomeNav">
//             <div className="HomeNav-Logo">
//                 <span>A</span>shutosh
//             </div>
//             <div className="HomeNav-Links">
//                 <ul>
//                     <li className='items' onClick={() => document.getElementById("about").scrollIntoView({ behavior: "smooth" })}>About</li>
//                     <li className='items' onClick={() => document.getElementById("projects").scrollIntoView({ behavior: "smooth" })}>Projects</li>
//                     <li className='items' onClick={() => document.getElementById("contact").scrollIntoView({ behavior: "smooth" })}>Contact</li>
//                     <li >
//                         <button className="Resume-Button"><i className="fa-regular fa-file-lines fa-flip-horizontal fa-sm"   style={{ color: "rgb(6, 6, 6)" }}
// ></i>My Resume</button>
//                     </li>
//                     <li className='items' onClick={() => document.getElementById("contact").scrollIntoView({ behavior: "smooth" })}>
//                         <button className="Hire_Me-Button">Hire Me Now</button>
//                     </li>
//                 </ul>
//                 {/* <NavLink to="/" className={'items'}>Home</NavLink>
//                 <NavLink to="/about" className={'items'}>About</NavLink>
//                 <NavLink to="/services" className={'items'}>Services</NavLink>
//                 <NavLink to="/projects" className={'items'}>My Work</NavLink>
//                 <NavLink to="/contact" className={'items'}>Contact</NavLink> */}
                
                
                
//             </div>
//         </div>
//     )
// }

// export default HomeNav;

import './Home_Nav.css';
import { useState } from 'react';


const HomeNav = () => {

    const [menuOpen, setMenuOpen] = useState(false);

    const openResume = () => {
  window.open("../../../public/Resume/Ashutosh agnihotri (1).pdf", "_blank");
};

    return (
        <div className="HomeNav">
            <div className="HomeNav-Logo">
                <span>A</span>shutosh
            </div>

            {/* Hamburger button */}
            <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
                ☰
            </div>

            {/* Nav links */}
            <div className={`HomeNav-Links ${menuOpen ? 'active' : ''}`}>
                <ul>
                    <li className='items' onClick={() => document.getElementById("about").scrollIntoView({ behavior: "smooth" })}>About</li>
                    <li className='items' onClick={() => document.getElementById("projects").scrollIntoView({ behavior: "smooth" })}>Projects</li>
                    <li className='items' onClick={() => document.getElementById("contact").scrollIntoView({ behavior: "smooth" })}>Contact</li>

                    <li className='resume-li'>
                        <button className="Resume-Button" onClick={openResume}>
                            My Resume
                        </button>
                    </li>

                    <li onClick={() => document.getElementById("contact").scrollIntoView({ behavior: "smooth" })}>
                        <button className="Hire_Me-Button">Hire Me Now</button>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default HomeNav;


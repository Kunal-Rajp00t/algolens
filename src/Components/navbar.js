import React from 'react'
import { NavLink } from 'react-router-dom';
import './navbar.css';
import Logo from './Utilities/logo_algolens.png';
const navbar = () => {

  return (
    <div className='navbar'>
      <NavLink to="/"><img src={Logo} alt="Sorry" className='mylogo'/>
      </NavLink>
      
      <div className="contact">
        <a href="https://in.linkedin.com/in/kunal-rajput-616178275" target='_blank'><i className="fa-brands fa-linkedin-in"></i></a>
        <a href="https://github.com/Kunal-Rajp00t"><i className="fa-brands fa-github" target='_blank'></i></a>
        <a href="https://x.com/rKunal_?t=4wqGKQS-uleUEThkPDAwKA&s=09" target='_blank'><i className="fa-brands fa-x-twitter"></i></a>
      </div>
    </div>
  )
}

export default navbar

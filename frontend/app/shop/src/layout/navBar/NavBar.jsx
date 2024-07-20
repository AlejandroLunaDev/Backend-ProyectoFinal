import User from "./components/User";
import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
      
  <nav className='border border-[#61005D] w-full flex justify-between items-center px-6'>
    <NavLink to="/home" >
        <figure>
            <img src="/brand.svg" alt="silouso-brand" />
        </figure>
    </NavLink>
        <NavLink to="/login">
            <User />
        </NavLink>
  </nav>
  ) 
}

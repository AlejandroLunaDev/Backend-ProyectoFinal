import ListNav from "./components/ListNav";
import { Outlet } from "react-router-dom";


export default function Navbar() {
  return (
    <>
    
    <nav className=" h-dvh w-80 border border-orange-400">
        <div>
            <h1>Admin</h1>
        </div>
        <div className="mt-8">
            <ListNav />
        </div>
    </nav>
    <Outlet />
    </>
  )
}

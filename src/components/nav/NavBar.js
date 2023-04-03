import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    const navigate = useNavigate()

    return (
        <>

            <h1 className="home_text">UNHOLY HARMONIES</h1>
        <div className="nav-barr">
            <Link className="navbar__home1" to="/">Back to Hell</Link>
            <Link className="navbar__home2" to="/artists">Artists</Link>
            <Link className="navbar__home2" to="" onClick={() => {
                                localStorage.removeItem("unholy_user")
                                navigate("/", {replace: true})
                            }}>Logout</Link>
            <Link className="navbar__home2" to="/wishlist">WishList</Link>
        </div>
           
            
                
                    
                       
                            
                       
                
          
        </>
    )
}


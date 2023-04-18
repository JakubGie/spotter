import { Link, useLocation } from "react-router-dom"
import { useState } from "react"

const Navbar = (props) => {
    const location = useLocation().pathname

    console.log(location)

    

    return (
        <nav>
            <div className="container">
                <div className="navbar">
                    <h2><Link to="/" onClick={props.clearSearch}>SPOTTER</Link></h2>
                  
                        <input 
                        type="text" 
                        name="search" 
                        className="search" 
                        placeholder="znajdź spotted" 
                        onChange={props.onChange}
                        value={props.value}
                        />
                   
                    <ul>
                        
                        <li><Link to="/spotted/stworz" onClick={props.clearSearch} className="create" /*class={(location=='/spotted/1' ? ( 'this' ) : ( '' ) )} */ >Stwórz spotted</Link></li>
                    </ul>
                </div>
            </div>
          
        </nav>
    )
}

export default Navbar
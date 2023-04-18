import { Link } from "react-router-dom";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer>
            <div className="container">
                <div className="footer">
                    <Link to="/">Spotter</Link> &copy; {currentYear} 
                </div>
            </div>
        </footer>
    )
}

export default Footer
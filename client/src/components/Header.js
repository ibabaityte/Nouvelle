// style imports
import {
    headerDiv,
    logo,
    secondaryHeading
} from "../styles/HeaderStyles";

const Header = () => {
    return (
        <div style={headerDiv}>
            <h1 style={logo}>Nouvelle</h1>
            <h4 style={secondaryHeading}>Rask sau reikiamą grožio ar higienos prekę greičiau</h4>
        </div>
    );
}

export default Header;

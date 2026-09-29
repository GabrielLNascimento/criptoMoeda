import styles from "./header.module.css";
import Logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className={styles.container}>
            <Link to="/">
                <img
                    src={Logo}
                    alt="Logo principal do site"
                    className={styles.imgLogo}
                />
            </Link>
        </header>
    );
};

export default Header;

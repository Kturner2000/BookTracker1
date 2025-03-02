import { Link } from "react-router-dom"; // Corrected import
import styles from './header.module.css'
import { HouseSimple } from '@phosphor-icons/react'

export default function Header() {


    return (
        <header className={styles.header}>
           
            <nav aria-label="Book read status" className={styles.menu}>
                <ul className={styles.menuTabs}>
                    <li className={styles.menuItem}>
                        <Link to="/" className={`${styles.menuLink}`}>
                            <span className={styles.tabContent}>
                            <HouseSimple size={18} color="#000" />
                            </span>
                        </Link>
                    </li>
                    <li className={styles.menuItem}>
                        <Link to="/books/status/wantToRead" className={`${styles.menuLink}`}>
                            <span className={styles.tabContent}>Want</span>
                        </Link>
                    </li>
                    <li className={styles.menuItem}>
                        <Link to="/books/status/currentlyReading" className={`${styles.menuLink}`}>
                            <span className={styles.tabContent}>Current</span>
                        </Link>
                    </li>
                    <li className={styles.menuItem}>
                        <Link to="/books/status/read" className={`${styles.menuLink}`}>
                            <span className={styles.tabContent}>Read</span>
                        </Link>
                    </li>
                    <li className={styles.menuItem}>
                        <Link to="/books/not-published" className={`${styles.menuLink}`}>
                            <span className={styles.tabContent}>Not Published</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

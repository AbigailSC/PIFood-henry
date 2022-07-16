import React from "react";
import { Link } from "react-router-dom";
import styles from './Navbar.module.css'
import Searchbar from "../Searchbar/Searchbar";
import logo from "../../images/main2.png"

export default function Navbar(){
    return(
        <div className={styles.container}>
            <div className={styles.links}>
                <img className={styles.img} src={logo} alt='Logo' />
                <Link className={styles.link} to='/home'>
                    <span className={styles.text}>Home</span>
                </Link>
                <Link className={styles.link} to='/create'>
                    <span className={styles.text}>Create</span>
                </Link>
            </div>
            <div>
                <Searchbar/>
            </div>
        </div>
    )
}
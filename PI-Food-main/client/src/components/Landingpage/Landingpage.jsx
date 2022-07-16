import React from 'react';
import { Link } from "react-router-dom";
import styles from './Landingpage.module.css';
import food1 from '../../images/food_plate_1.png'
import food2 from '../../images/food_plate_2.png'
import food3 from '../../images/food_plate_3.png'
import food4 from '../../images/food_plate_4.png'
import food5 from '../../images/food_plate_5.png'
import food6 from '../../images/food_plate_6.png'
import mainFood from '../../images/main2.png'

export default function Landing(){
    return(
        <div className={styles.container}>
            <img className={styles.img} src={food1} alt="Food  1"/>
            <img className={styles.img2} src={food2} alt="Food  2"/>
            <img className={styles.img3} src={food3} alt="Food  3"/>
            <img className={styles.img4} src={food4} alt="Food  4"/>
            <img className={styles.img5} src={food5} alt="Food  5"/>
            <img className={styles.img6} src={food6} alt="Food  6"/>
            <div>
                <img className={styles.icon} src={mainFood} alt="icon"/>
            </div>
            <div className={styles.item}>
                <h1 className={styles.title}>Api Food</h1>
            </div>
            <div className={styles.item}>
                <h2 className={styles.sub}>Deciding what to eat?</h2>
            </div>
            <div className={styles.item}>
                <Link to ='/home'>
                    <button className={styles.btn}>Go Home</button>
                </Link>
            </div>
        </div>
    )
}
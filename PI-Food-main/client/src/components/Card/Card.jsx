import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Card.module.css'

export default function Card({name, id, image, diets, healthScore}){
    return(
        <div className={styles.container}>
            <div className={styles.subContainer}>
                <img className={styles.img} src={image} alt="as"/>
                <p className={styles.healthScore}>{healthScore}/100</p>
            </div>
            <Link className={styles.link} to={`detail/${id}`}>
                <h3 className={styles.title}>{name}</h3>
            </Link>   
            <div className={styles.dietsContainer}>
                {
                diets.length === 0 ? <p className={styles.noDiets}>No diets</p> :
                diets.map((elemento, i) => 
                    <p className={
                        elemento.name === 'vegan' || elemento === 'vegan' || elemento.name === 'vegetarian' || elemento === 'vegetarian' || elemento.name === 'lacto ovo vegetarian' || elemento === 'lacto ovo vegetarian'  ? styles.green : 
                        elemento.name === 'gluten free' || elemento === 'gluten free' || elemento.name === 'paleolithic' || elemento === 'paleolithic' || elemento.name === 'primal' || elemento === 'primal' ? styles.red : 
                        elemento.name === 'dairy free' || elemento === 'dairy free' || elemento.name === 'ketogenic' || elemento === 'ketogenic' ? styles.violet :
                        elemento.name === 'healthy' || elemento === 'healthy' || elemento.name === 'pescatarian' || elemento === 'pescatarian' ? styles.blue : styles.other
                    } key={i}>{elemento.name || elemento}</p>)
                }
            </div>
        </div>
    )
}
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Card.module.css'

export default function Card({name, id, image, diets, healthScore}){
    const validate = (diet, i) => {
        switch(diet) {
            case 'gluten free':
            case 'dairy free':
                return <span key={i} id={i} className={styles.red}>{diet}</span> ;
            case 'vegan':
            case 'lacto ovo vegetarian':
            case 'vegetarian':
                return <span key={i} id={i} className={styles.green}>{diet}</span>;
            case 'paleolithic':
            case 'primal':
                return <span key={i} id={i} className={styles.blue}>{diet}</span>;
            case 'ketogenic':
            case 'pescatarian':
                return <span key={i} id={i} className={styles.violet}>{diet}</span>;
            default:
                return <span key={i} id={i} className={styles.other}>{diet}</span> ;
        }
    }
    return(
        <div className={styles.container}>
            <div className={styles.subContainer}>
                <img className={styles.img} src={image} alt="as"/>
                <p className={styles.healthScore}>{healthScore}/100</p>
            </div>
            <Link className={styles.link} to={`detail/${id}`}>
                <h3 className={styles.title}>{name}</h3>
            </Link>   
            {diets.length === 0 ? <p className={styles.noDiets}>No diets</p> :
            <div className={styles.dietsContainer}>
            {diets?.map((elemento, i) => 
                elemento.name ? validate(elemento.name, i)
                : validate(elemento, i)
            )}
        </div>}
        </div>
    )
}
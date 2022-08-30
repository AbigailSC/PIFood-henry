import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Card.module.css'

export default class Card extends React.Component{
    // constructor(props){
    //     //console.log(props)
    // }
    render(){
        const validate = (diet, i) => {
            switch(diet) {
                case 'gluten free':
                case 'dairy free':
                    return <span key={i} id={i} className={styles.red}>{diet}</span> ;
                case 'vegan':
                case 'lacto ovo vegetarian':
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
                    <img className={styles.img} src={this.props.image} alt="as"/>
                    <p className={styles.healthScore}>{this.props.healthScore}/100</p>
                </div>
                <Link className={styles.link} to={`detail/${this.props.id}`}>
                    <h3 className={styles.title}>{this.props.name}</h3>
                </Link>   
                {this.props.diets.length === 0 ? <p className={styles.noDiets}>No diets</p> :
                <div className={styles.dietsContainer}>
                {this.props.diets?.map((elemento, i) => validate(elemento.name, i))}
            </div>}
            </div>
        )
    }
}
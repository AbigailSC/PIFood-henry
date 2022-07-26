import React from "react";
import { Link, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getRecipesById, cleanRecipe } from "../../redux/actions/index.js";
import styles from "./Details.module.css"
import Loading from "../Loading/Loading.jsx"
import hScore from "../../images/icons/healthy_food.png"
import cIcon from "../../images/icons/clock.png"
import yields from "../../images/icons/icon_fork.png"
import Navbar from "../Navbar/Navbar.jsx";

export default function Details() {
   const dispatch = useDispatch()
   const { id } = useParams()
   useEffect(() => {
      dispatch(getRecipesById(id))
      return () => {
         dispatch(cleanRecipe());
       };
   }, [id, dispatch])                 
   //console.log(id)
   const recipe = useSelector((state) => state.detail)
   //console.log(recipe)
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
   return (
      <div>
         <Navbar/>
         {recipe.length === 0 ? <Loading/> :
         <div className={styles.container}>
            <div className={styles.column1}>
               <div>
                  <img className={styles.img} src={recipe.image} alt={recipe.name}/>
               </div>
               <div className={styles.otroContainer}>
                  <div className={styles.containerDishTypes}>
                     {Array.isArray(recipe.dishTypes) ? recipe.dishTypes?.map((el, i) => 
                     <p className={styles.dishTypes} key={i}>{el.name}</p>)
                     : <p className={styles.dishTypes}>{recipe.dishTypes}</p>
                     }
                  </div>
                  <h1 className={styles.title}>{recipe.name[0].toUpperCase() + recipe.name.slice(1)}</h1>
                  <div className={styles.containerSubtitles}>
                     <div className={styles.subContainer}>
                        <div>
                           <img className={styles.icons} src={hScore} alt='icon'/>
                        </div>
                        <div className={styles.columnSubContainer}>
                           <h3 className={styles.subtitles}>Health Score</h3>
                           <h3 className={styles.text}>{recipe.healthScore}/100</h3>
                        </div>
                     </div>
                     <div className={styles.subContainer}>
                        <div>
                           <img className={styles.icons} src={cIcon} alt='icon' />
                        </div>
                        <div className={styles.columnSubContainer}>
                           <h3 className={styles.subtitles}>Ready in</h3>
                           <h3 className={styles.text}>{recipe.minutes} minutes</h3>                      
                        </div>
                     </div>
                     <div className={styles.subContainer}>
                        <div>
                           <img className={styles.icons} src={yields} alt='icon' />
                        </div>
                        <div className={styles.columnSubContainer}>                        
                           <h3 className={styles.subtitles}>Yields</h3>
                           <h3 className={styles.text}>{recipe.servings} servings</h3>
                        </div>
                     </div>
                  </div>
                  <h3 className={styles.summary}>{recipe.summary}</h3>
               </div>
            </div>
            <div className={styles.column2}>
               <p className={styles.subtitles}>Diets:</p>
               <div className={styles.lastContainer}>
                  {recipe.diets.length === 0 ? <p className={styles.noDiets}>No diets</p> :
                     recipe.diets?.map((elemento, i) => validate(elemento.name, i))
                  }
               </div>
               <div className={styles.stepsMainContainer}>
                  <p className={styles.subtitles}>Instructions: </p>
                  {
                  recipe.steps === undefined || recipe.steps.length === 0 ? 
                     <p className={styles.steps} >This recipe has no instructions</p> :
                     ((typeof recipe.steps === 'string') ? <p className={styles.steps}>{recipe.steps}</p> :
                        <div>
                        {recipe.steps?.map((el, i) => {
                           return (
                              <div className={styles.stepsContainer} key={i}>
                                 <p className={styles.olContainer}>{i+1}</p>
                                 <p className={styles.steps}>{el}</p>
                              </div>
                           )
                        })}
                        </div>
                     ) 
                  }
               </div>
                  <div className={styles.containerBtn}>
                     <Link to='/home'>
                        <button className={styles.btn}>Back</button>
                     </Link>
                  </div>
            </div>
         </div>
         }
      </div>
   )
}
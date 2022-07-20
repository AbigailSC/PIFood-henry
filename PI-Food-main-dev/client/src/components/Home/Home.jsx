import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading.jsx";
import { filterByDiets, filterByName, filterByScore, getRecipes} from '../../redux/actions/index.js';
import Card from "../Card/Card.jsx";
import Pagination from '../Pagination/Pagination.jsx' 
import styles from './Home.module.css'
import logo from "../../images/main2.png"
import Searchbar from "../Searchbar/Searchbar.jsx";

export default function Home(){

    const dispatch = useDispatch();
    const allRecipes = useSelector((state) => state.recipes)

    const [currentPage, setCurrentPage] = useState(1) //inicia en 1
    const [recipesPerPage, /*setRecipesPerPage*/] = useState(9) //9 x pagina
    const indexOfLastRecipe = currentPage * recipesPerPage //9
    const indexOfFirstPage = indexOfLastRecipe - recipesPerPage //0
    const currentRecipes = allRecipes.slice(indexOfFirstPage, indexOfLastRecipe)
    //console.log("pagina actual ", currentPage)
    //console.log("indexL ", indexOfLastRecipe)
    //console.log("indexF ", indexOfFirstPage)
    //console.log("current recipes", currentRecipes)
    const [orderName, setOrdenName] = useState('')
    const [ordenScore, setOrdenScore] = useState('')

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
    useEffect(() => {
        dispatch(getRecipes())
    }, [dispatch])  
    
    function handleClick(e){
        e.preventDefault()
        dispatch(getRecipes())
        setCurrentPage(1)
    }
    function handleDiets(e){
        e.preventDefault()
        dispatch(filterByDiets(e.target.value))
        setCurrentPage(1)
    }
    function handleOrderName(e){
        e.preventDefault()
        dispatch(filterByName(e.target.value))
        setCurrentPage(1)
        setOrdenName(`Order by name: ${e.target.value}`)// cuando seteo la pag modifica el estado local y se renderiza
    }
    function handleOrderByScore(e){
        e.preventDefault()
        dispatch(filterByScore(e.target.value))
        setCurrentPage(1)
        setOrdenScore(`Order by healthScore: ${e.target.value}`)
    }
    //console.log(orderName)
    //console.log(ordenScore)
    return(
        <div>
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
                <Searchbar setCurrentPage ={setCurrentPage}/>
            </div>
            <div className={styles.containerfiltro}>
                <div className={styles.subContainer}>
                    <span className={styles.span}>Order by name</span>
                    <select className={styles.select} onChange={(e) => handleOrderName(e)}>
                        <option hidden value="all">All...</option>
                        <option value="asc">A to Z</option> 
                        <option value="desc">Z to A</option> 
                    </select>
                </div>
                <div className={styles.subContainer}>
                    <span className={styles.span}>Order by score</span>
                    <select className={styles.select} onChange={(e) => handleOrderByScore(e)}>
                        <option hidden value="all">All...</option>
                        <option value="high"> High score </option>
                        <option value="low"> Low score </option>
                    </select>
                </div>
                <div className={styles.subContainer}>
                    <span className={styles.span}>Filter by diets</span>
                    <select className={styles.select} onChange={(e) => handleDiets(e)}>
                        <option value="all"> All diets</option>
                        <option value="gluten free"> Gluten free</option>
                        <option value="dairy free"> Dairy free</option>
                        <option value="paleolithic"> Paleolithic</option>
                        <option value="ketogenic"> Ketogenic</option>
                        <option value="lacto ovo vegetarian"> Lacto ovo vegetarian</option>
                        <option value="vegan"> Vegan</option>
                        <option value="pescatarian"> Pescatarian</option>
                        <option value="primal"> Primal</option>
                        <option value="fodmap friendly"> Fodmap friendly</option>
                        <option value="whole 30"> Whole 30</option>
                    </select>
                </div>
            </div>
            <div className={styles.btnContainer}>
                <button className={styles.btn} onClick={e => { handleClick(e) }}>Clear</button>
            </div>
            <Pagination 
                pageFunction={paginado}
                data={recipesPerPage}
                current={currentPage}
            />
            <div className={styles.containerCards}>
                {currentRecipes.length > 0 ? currentRecipes?.map((r) => (
                    <Card
                        key={r.id}
                        image={r.image}
                        name={r.name}
                        diets={r.diets}
                        id={r.id}
                        healthScore={r.healthScore}
                    />)) 
                : <Loading/>}
            </div>
        </div>
    )
}
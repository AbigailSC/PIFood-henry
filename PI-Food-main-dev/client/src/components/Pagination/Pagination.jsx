import React, { useState } from "react";
import { useSelector } from "react-redux";
import styles from "./Pagination.module.css";

export default function Paginado({ pageFunction, data, current }) {

    const pageNumbersArray = [] //guardo la pagina

    const allRecipesPage = useSelector((state) => state.recipes)

    const [pageDisplayed, /*setPageDisplayed*/] = useState(4); //estado de la pag que se muestra
    
    const [maxPageDisplayed, setMaxPageDisplayed] = useState(4) // max cant que muestro
    const [minPageDisplayed, setMinPageDisplayed] = useState(0) //min ´´

    const max = Math.ceil(allRecipesPage.length / data)
    
    for (let i = 1; i <= max; i++) {
        pageNumbersArray.push(i)
    }//12

    const movesPages = (page) => { //siguiente pagina
        if(page === pageNumbersArray?.length){
            movesPagesPrevious(0)
            setMaxPageDisplayed(4)
            setMinPageDisplayed(0)
        }else{
            //console.log("La pagina actual else adelante es: ",page)
            let maxTemp = page + pageDisplayed - 1
            //console.log("el maximo siguiente:",maxTemp)
            let minTemp = maxTemp - pageDisplayed
            //console.log("el minimo siguiente:",minTemp)
            setMaxPageDisplayed(maxTemp)
            setMinPageDisplayed(minTemp) 
        }
        //console.log("La pagina actual es: ",page)
    }
    const movesPagesPrevious = (page) => {
        if(page === 1) movesPages(0);
        else if (page <= 2 && page > 0){
            setMaxPageDisplayed(4)
            setMinPageDisplayed(0)
            //console.log("La pagina actual if atras es: ",page)
        }else{
            if(page === 0) page = 1;
            //console.log("La pagina actual else atras es: ",page)
            let maxTemp = page + pageDisplayed - 3
            //console.log("el maximo previo:",maxTemp)
            let minTemp = maxTemp - pageDisplayed
            //console.log("el minimo previo:",minTemp)
            setMaxPageDisplayed(maxTemp)
            setMinPageDisplayed(minTemp)
        }
        //console.log("La pagina actual es: ",page)
    }

    const handleClick = (page) => {
        movesPages(page)
        pageFunction(page)
    }
    const handleFirstPage = (e) => {
        e.preventDefault()
        movesPages(1)
        pageFunction(1)
    }
    const handleLastPage = (e) => {
        e.preventDefault()
        movesPages(max - 1) //11
        pageFunction(max)
    }
    const previous = (e, page) => {
        e.preventDefault()
        movesPagesPrevious(page)
        if(page === 1) pageFunction(pageNumbersArray?.length);
        else pageFunction(page - 1)
    }
    const next = (e, page) => {
        e.preventDefault()
        movesPages(page)
        if(page === pageNumbersArray?.length) pageFunction(1)
        else pageFunction(page + 1)
    }

    const renderPageNumber = pageNumbersArray?.map((pages) => {
        if(pages < maxPageDisplayed + 1 && pages > minPageDisplayed - 1){
            return <li className={current === pages ? styles.btnActive : styles.btn} key={pages} id={pages} onClick={() => handleClick(pages)}>
                <ul className={styles.number}>{pages}</ul>
            </li>
        }else{
            return null
        }
    })
    return (
        <div className={styles.container}>
            <button className={styles.btn} onClick={(e) => handleFirstPage(e)} disabled={current <= 1}>{'|<< First'}</button>
            <button className={styles.btn} onClick={(e) => previous(e, current)} disabled={current <= 1}>{'< Prev'}</button>
            <ul className={styles.containerLista}>
                {renderPageNumber}
            </ul>
            <button className={styles.btn} onClick={(e) => next(e, current)} disabled={current >= max}>{'Next >'}</button>
            <button className={styles.btn} onClick={(e) => handleLastPage(e)} disabled={current >= max}>{'Last >>|'}</button>
        </div>
    )

}
import React, { useState } from "react";
import { useSelector } from "react-redux";
import styles from "./Pagination.module.css";

export default function Paginado({ pageFunction, data, current }) {

    const pageNumbersArray = []

    const allRecipesPage = useSelector((state) => state.recipes)

    const [pageDisplayed, setPageDisplayed] = useState(4); 
    
    const [maxPageDisplayed, setMaxPageDisplayed] = useState(4)
    const [minPageDisplayed, setMinPageDisplayed] = useState(0)

    const max = Math.ceil(allRecipesPage.length / data)

    for (let i = 1; i <= max; i++) {
        pageNumbersArray.push(i)
    }

    const movesPages = (page) => {
        if(page === pageNumbersArray?.length){
            movesPagesPrevious(0)
            setMaxPageDisplayed(4)
            setMinPageDisplayed(0)
        }else{
            if(page === 0) page = pageNumbersArray?.length;
            let maxTemp = page + pageDisplayed - 1
            let minTemp = maxTemp - pageDisplayed
            setMaxPageDisplayed(maxTemp)
            setMinPageDisplayed(minTemp) 
        }
    }
    const movesPagesPrevious = (page) => {
        if(page === 1) movesPages(0);
        else if (page <= 2 && page > 0){
            setMaxPageDisplayed(4)
            setMinPageDisplayed(0)
        }else{
            if(page === 0) page = 1;
            let maxTemp = page + pageDisplayed - 3
            let minTemp = maxTemp - pageDisplayed
            setMaxPageDisplayed(maxTemp)
            setMinPageDisplayed(minTemp)
        }
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
        movesPages(max - 1)
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
import React, { useState } from "react";
import styles from './Searchbar.module.css';
import { useDispatch } from "react-redux";
import { searchName } from "../../redux/actions/index.js";

export default function Searchbar({setCurrentPage}){
    const dispatch = useDispatch()
    const [name, setName] = useState('')

    function handleInputChange(e){
        e.preventDefault()
        setName(e.target.value)
    }
    function handleSubmit(e){
        e.preventDefault()
        dispatch(searchName(name))
        setName('')
        setCurrentPage(1)
    }
    return(
        <div className={styles.container}>
            <input 
                className={styles.input}
                type='text'
                value={name}
                onChange={(e) => handleInputChange(e)}
                placeholder='Search recipe...'/>
            <input 
                className={styles.btn}
                type='submit'
                value='Search' 
                onClick={(e) => handleSubmit(e)}/>
        </div>
    )
}
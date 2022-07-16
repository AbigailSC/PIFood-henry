import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { postRecipe, getDiets } from "../../redux/actions/index.js";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Form.module.css";
import Navbar from "../Navbar/Navbar.jsx";

export default function RecipeCreate() {
    const dispatch = useDispatch()
    const history = useHistory()
    const diets = useSelector((state) => state.diets) //trae
    const [errors, setError] = useState({})
    const [input, setInput] = useState({
        name: "",
        summary: "",
        image: "",
        dishTypes: "",
        healthScore: 0,
        steps: "",
        minutes: 0,
        servings: 0,
        diets: [],
    })

    let validateName = /^[a-zA-Z\s]+$/;
    let validateUrl = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/;

    function validate(input) {
        let errors = {};
        console.log(input)
        if(!input.name) {
            errors.name = "The name of recipe is required";
        }else if(input.name.length < 5){
            errors.name = "The name is too short"
        }else if(input.name.length > 30){
            errors.name = "The name is too long"
        }else if(!validateName.test(input.name)) {
            errors.name = "Special characters or numbers are not allowed";
        }
        if(input.healthScore > 100) {
            errors.healthScore = "The healt has to be lower than 100";
        }else if(input.healthScore < 0){
            errors.healthScore = "The healt has to be greater than 0";
        }else if(input.healthScore.toString().includes('.')) {
            errors.healthScore = "The health score cannot be a decimal number"
        }
        if(!input.summary){
            errors.summary = "The summary of recipe is required";
        }else if(input.summary.length < 40) {
            errors.summary = "This field must be at least 40 characters";
        }else if(input.summary.length > 400) {
            errors.summary = "This field should not have more than 400 characters";
        }
        if(!input.dishTypes){
            errors.dishTypes = "Enter at least one type of dish"
        }else if(!validateName.test(input.dishTypes)){
            errors.dishTypes = "Special characters or numbers are not allowed"
        }else if(input.dishTypes.length > 16){
            errors.dishTypes = "Dish types cannot be more than 16 characters";
        }
        if(input.servings < 0){
            errors.servings = "The portion cannot be lower than 0"
        }else if(input.servings > 12){
            errors.servings = "The portion cannot be greater than 12"
        }else if(input.servings.toString().includes('.')){
            errors.servings = "The portion cannot be a decimal number"
        }
        if(input.minutes < 0){
            errors.minutes = "The minutes cannot be lower than 0"
        }else if(input.minutes > 120){
            errors.minutes = "The minutes cannot be greater than 120 minutes"
        }
        if(input.image && !validateUrl.test(input.image)) {
            errors.image = "This is not a valid URL";
        }
        return errors;
    }

    useEffect(() => {
        dispatch(getDiets())
    }, [dispatch])

    function handleChecked(e) {
        const value = e.target.name;
        if(e.target.checked && !input.diets.includes(value)){
            setInput({
                ...input,
                diets: [...input.diets, value]
            })
        }else{
            setInput({
                ...input,
                diets: input.diets.filter((d) => d !== value)
            })
        }
    }
    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value 
        })
        setError( 
            validate({
                ...input,
                [e.target.name]: e.target.value,  
            })
        );
    }
    function handleSubmit(e) {  
        e.preventDefault()
        if(!input.name || !input.summary){
            e.preventDefault()
            return alert('The recipe needs a name, a dishtype and a summary')
        }else if(input.diets.length === 0){
            e.preventDefault()
            return alert('You need to add at least one diet for the recipe')
        }else{
            if(!input.image){
                input.image = 'https://data.whicdn.com/images/338252817/original.jpg'
            }
            setError(validate(input))
            dispatch(postRecipe(input))
            alert('Recipe sucessfully created!')
            setInput({  
                name: "",
                summary: "",
                image: "",
                dishTypes: "",
                healthScore: "",
                steps: "",
                minutes: "",
                servings: "",
                diets: [],
            })
            history.push('/home')
        }
    }
    //console.log("ERRORS ",Object.keys(errors).length)
    return (
        <div className={styles.container}>
            <Navbar/>
            <div className={styles.containerColumn}>
                <div className={styles.containerForm}>
                    <h1 className={styles.title}>Create your recipe</h1>
                    <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
                        <div className={styles.ContainerRows}>
                            <p className={styles.label}>Name</p>
                            <input className={styles.input}
                            type="text"
                            value={input.name}
                            name="name"
                            placeholder="Recipe name*"
                                onChange={(e) => handleChange(e)}
                            />
                            {errors.name && <p className={styles.error}>{errors.name}</p>}
                        </div>
                        <div className={styles.ContainerRows}>
                            <p className={styles.label}>Image</p>
                            <input className={styles.input}
                                type="text"
                                value={input.image}
                                name="image"
                                placeholder="Url image (Optional)"
                                onChange={(e) => handleChange(e)}
                            />
                            {errors.image && <p className={styles.error}>{errors.image}</p>}
                        </div>
                        <div className={styles.ContainerRows}>
                            <p className={styles.label}>Dish types</p>
                            <input className={styles.input}
                                type="text"
                                value={input.dishTypes}
                                name="dishTypes"
                                placeholder="Dishtypes*"
                                onChange={(e) => handleChange(e)}
                            />
                            {errors.dishTypes && <p className={styles.error}>{errors.dishTypes}</p>}
                        </div>
                        <div className={styles.ContainerRows}>
                            <p className={styles.label}>Health Score</p>
                            <input className={styles.input}
                                type="number"
                                value={input.healthScore}
                                name="healthScore"
                                onChange={(e) => handleChange(e)}
                            />
                            {errors.healthScore && <p className={styles.error}>{errors.healthScore}</p>}
                        </div>
                        <div className={styles.ContainerRows}>
                            <p className={styles.label}>Servings</p>
                            <input className={styles.input}
                                type="number"
                                value={input.servings}
                                name="servings"
                                onChange={(e) => handleChange(e)}
                            />
                            {errors.servings && <p className={styles.error}>{errors.servings}</p>}
                        </div>
                        <div className={styles.ContainerRows}>
                            <p className={styles.label}>Minutes</p>
                            <input className={styles.input}
                                type="number"
                                value={input.minutes}
                                name="minutes"
                                onChange={(e) => handleChange(e)}
                            />
                            {errors.minutes && <p className={styles.error}> {errors.minutes}</p>}
                        </div>
                        <div className={styles.ContainerRows}>
                        <p className={styles.label}>Summary</p>
                        <textarea className={styles.inputArea}
                            type="text"
                            value={input.summary}
                            name="summary"
                            placeholder="Summary*"
                            onChange={(e) => handleChange(e)}
                        />
                        {errors.summary && <p className={styles.error}> {errors.summary}</p>}
                        </div>
                        <div className={styles.ContainerRows}>
                            <p className={styles.label}>Steps</p>
                            <textarea className={styles.inputArea}
                            type="textarea"
                            value={input.steps}
                            name="steps"
                            placeholder="Steps (Optional)"
                            onChange={(e) => handleChange(e)}
                            />
                        </div>
                        <h3 className={styles.labelDiets}>Select diets</h3>
                        <br/>
                            {diets?.map((elemento) => (
                            <div className={styles.inputsChecksContainer}>
                                <input 
                                    type="checkbox"
                                    checked={input.diets?.includes(elemento.name)}
                                    onChange={(e) => handleChecked(e)}
                                    id={elemento.id} 
                                    name={elemento.name}
                                />
                                <label className={styles.label} htmlFor={elemento.id}>{elemento.name[0].toUpperCase() + elemento.name.slice(1)}</label>
                            </div>
                            ))}
                        <br/>
                        {(Object.keys(errors).length === 0 && (input.name && input.summary && input.dishTypes))
                        ? <button className={styles.btnCreate} type="submit" >Create recipe</button>
                        : null}
                    </form>
                </div>
            </div>
        </div>
    )
}
import axios from 'axios';
import {
    GET_DIETS,
    FILTER_NAME,
    CLEAN_RECIPE,
    SEARCH_NAME,
    FILTER_DIETS,
    FILTER_SCORE,
    GET_RECIPES,
    GET_RECIPE_BY_ID,
    POST_RECIPE
} from '../action-types/index.js';

export function getRecipes(){
    return async function(dispatch) {
        try{
            const json = await axios.get('http://localhost:3001/recipes')
            return dispatch({
                type: GET_RECIPES,
                payload: json.data
            })
        }catch(error){
            console.log(error)
        }
    }
}
export const getDiets = () => {
    return async function(dispatch){
        try{
            const json = await axios.get('http://localhost:3001/diets')
            return dispatch({
                type: GET_DIETS,
                payload: json.data
            })
        }catch(error){
            console.log(error)
        }
    }
}
export const postRecipe = (recipe) => {
    return async function(dispatch){
        try{
            const json = await axios.post('http://localhost:3001/recipes/create', recipe)
            console.log(recipe)
            return dispatch({
                type: POST_RECIPE,
                payload: json
            })
        }catch(error){
            console.log(error)
        }
    }
}
export const cleanRecipe = () => {
    return {
        type: CLEAN_RECIPE
    } 
}
export const searchName = (value) => {
    return async function(dispatch){
        try{
            if(value === '') return alert('You must enter a name. Try again')
            const json = await axios.get(`http://localhost:3001/recipes?name=${value}`)
            return dispatch({
                type: SEARCH_NAME,
                payload: json.data
            })
        }catch(error){
            return alert('No recipe have been found with the name entered. Try again')
        }
    }
}
export const filterByDiets = (payload) => {
    return{
        type: FILTER_DIETS,
        payload
    }
}
export const filterByName = (payload) => {
    return{
        type: FILTER_NAME,
        payload
    }
}
export const filterByScore = (payload) => {
    return{
        type: FILTER_SCORE,
        payload
    }
}
export const getRecipesById = (id) => {
    return async function(dispatch){
        try{
            const json = await axios.get(`http://localhost:3001/recipes/${id}`)
            //console.log(json)
            return dispatch({
                type: GET_RECIPE_BY_ID,
                payload: json.data
            })
        }catch(error){
            console.log(error)
        }
    }
}
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
import Swal from "sweetalert2"

export function getRecipes() {
    return async function (dispatch) {
        try {
            const json = await axios.get("/recipes")
            return dispatch({
                type: GET_RECIPES,
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}
export const getDiets = () => {
    return async function (dispatch) {
        try {
            const json = await axios.get("/diets")
            return dispatch({
                type: GET_DIETS,
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}
export const postRecipe = (recipe) => {
    return async function (dispatch) {
        try {
            const json = await axios.post("/recipes/create", recipe)
            //console.log(recipe)
            return dispatch({
                type: POST_RECIPE,
                payload: json
            })
        } catch (error) {
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
    return async function (dispatch) {
        try {
            if (value === '') return Swal.fire('You must enter a name. Try again')
            const json = await axios.get(`/recipes?name=${value}`)
            return dispatch({
                type: SEARCH_NAME,
                payload: json.data
            })
        } catch (error) {
            return Swal.fire('No recipe have been found with the name entered. Try again')
        }
    }
}
export const filterByDiets = (payload) => {
    return {
        type: FILTER_DIETS,
        payload
    }
}
export const filterByName = (payload) => {
    return {
        type: FILTER_NAME,
        payload
    }
}
export const filterByScore = (payload) => {
    return {
        type: FILTER_SCORE,
        payload
    }
}
export const getRecipesById = (id) => {
    return async function (dispatch) {
        try {
            const json = await axios.get(`/recipes/${id}`)
            //console.log(json)
            return dispatch({
                type: GET_RECIPE_BY_ID,
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}
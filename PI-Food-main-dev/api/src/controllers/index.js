require('dotenv').config();
const { API_KEY_1, API_KEY_2 ,API_KEY_3, API_KEY_4, API_KEY_5, API_KEY_6, API_KEY_7, API_KEY_8} = process.env;
const { Recipe, Diet } = require('../db');
const axios = require('axios');

const URL = 'https://api.spoonacular.com/recipes';

const getApiInfo = async() => {
    try{
        const apiURL = await axios.get(`${URL}/complexSearch?apiKey=${API_KEY_6}&addRecipeInformation=true&number=100`)
        const apiInfo = apiURL.data.results?.map((elemento) => { //traigo toda la info
            return {
                id: elemento.id,
                name: elemento.title,
                healthScore: elemento.healthScore,
                dishTypes: elemento.dishTypes?.map((e) => {return {name: e}}), //mapeo el array
                diets: elemento.diets?.map((e) => {return {name: e}}),
                summary: elemento.summary.replace( /(<([^>]+)>)/ig, ''),
                image: elemento.image,
                steps: elemento.analyzedInstructions[0]?.steps.map((e) => e.step),
                minutes: elemento.readyInMinutes,
                servings: elemento.servings
            }
        })
        return apiInfo //la info de la api
    }catch(error){
        console.log(error)
    }
}
const getDbInfo = async() => {
    try{
        let newRecipe = await Recipe.findAll({ // trae data de la db
            include: {
                model: Diet, //genero la relacion con el modelo Diet
                attributes: ['name'], //Me trae toda la data del name de las dietas
                through: {
                    attributes: [] //Traigo todo
                }
            }
        })
        return newRecipe.map((e) => {
            return{
                ...e.dataValues,
                diets: e.diets?.map((d) => d.name)
            }
        })
    }catch(error){
        console.log(error)
    }
}
const getAllRecipes = async() => {
    try{
        const apiInfo = await getApiInfo();
        const dbInfo = await getDbInfo();
        const all = apiInfo.concat(dbInfo)
        return all
    }catch(error){
        console.log(error)
    }
}
const getRecipeById = async(id) => {
    try{
        const api = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY_6}`)
        const elemento = api.data
        return{
            id: elemento.id,
            name: elemento.title,
            healthScore: elemento.healthScore,
            dishTypes: elemento.dishTypes?.map((e) => {return {name: e}}),
            diets: elemento.diets?.map((e) => {return {name: e}}),
            summary: elemento.summary.replace( /(<([^>]+)>)/ig, ''),
            image: elemento.image,
            steps: elemento.analyzedInstructions[0]?.steps.map((e) => e.step),
            minutes: elemento.readyInMinutes,
            servings: elemento.servings
        }
    }catch(error){
        console.log(error)
    }
}
const getRecipeByDb = async (id) => {
    try {
        const idDb = await Recipe.findByPk(id, {
            include: {
                model: Diet,
                attributes: ["name"], // trae los name de toda la data
                through: { 
                    attributes: []
                },
            },
        }); 
        return{
            id: idDb.id,
            name: idDb.name,
            healthScore: idDb.healthScore,
            dishTypes: idDb.dishTypes,
            diets: idDb.diets,
            summary: idDb.summary,
            image: idDb.image,
            steps: idDb.steps,
            minutes: idDb.minutes,
            servings: idDb.servings,
            createInDB: idDb.createInDB
        }
      } catch (error) {
        console.log(error);
      }
}
const getAllId = async (id) => {
    try{
        if(id.includes('-')){
            let db = await getRecipeByDb(id)
            return db
        }
        let api = await getRecipeById(id)
        return api
    }catch(error){
        console.log(error)
    }
}
const postRecipe = async({name, summary, healthScore, dishTypes, steps, image, diets, minutes, servings, createInDB}) => {
    try{
        let recipe = await Recipe.create({
            name,
            summary,
            healthScore,
            dishTypes,
            image,
            steps,
            minutes,
            servings,
            createInDB
        })
        let dietsDb = await Diet.findAll({
            where: { 
                name: diets // trae data donde el name sean las dietas
            }
        })
        recipe.addDiet(dietsDb)
        return recipe    
    }catch(error){
        console.log(error)
    }
}
const getDbDiets = async() => {
    try{
        const apiURL = await axios.get(`${URL}/complexSearch?apiKey=${API_KEY_6}&addRecipeInformation=true&number=100`)
        let apiDiets = apiURL.data.results.map((elemento) => elemento.diets)
        apiDiets = [...new Set(apiDiets.flat())] 
        for(let i = 0; i < apiDiets.length; i++){
            await Diet.findOrCreate({ // si no lo encuentra lo crea
                where: {name: apiDiets[i]} //donde el name sea cada una de las dietas en el ciclo for
            })
        }
        return Diet.findAll()
    }catch(error){
        console.log(error)
    }
}
module.exports = {
    getAllRecipes,
    getAllId,
    postRecipe,
    getDbDiets
}
require('dotenv').config();
const { API_KEY_1, API_KEY_2 ,API_KEY_3} = process.env;
const { Recipe, Diet } = require('../db');
const axios = require('axios');

const URL = 'https://api.spoonacular.com/recipes';

const getApiInfo = async() => {
    try{
        const apiURL = await axios.get(`${URL}/complexSearch?apiKey=${API_KEY_1}&addRecipeInformation=true&number=100`)
        const apiInfo = apiURL.data.results.map((elemento) => {
            return {
                id: elemento.id,
                name: elemento.title,
                healthScore: elemento.healthScore,
                dishTypes: elemento.dishTypes?.map((e) => {return {name: e}}),
                diets: elemento.diets?.map((e) => {return {name: e}}),
                summary: elemento.summary,
                image: elemento.image,
                steps: elemento.analyzedInstructions[0]?.steps.map((e) => e.step)
            }
        })
        return apiInfo
    }catch(error){
        console.log(error)
    }
}
const getDbInfo = async() => {
    try{
        let newRecipe = await Recipe.findAll({
            include: {
                model: Diet,
                attributes: ['name'],
                through: {
                    attributes: []
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
        return apiInfo.concat(dbInfo)
    }catch(error){
        console.log(error)
    }
}
const getRecipeById = async(id) => {
    let allInfo = await getAllRecipes();
    return await allInfo.filter((e) => e.id == id)
}
const deleteRecipe = async(id) => {
    let deleteRecipe = await Recipe.destroy({
        where: {
            id
        }
    })
    return deleteRecipe
}
//const updateRecipe = async(recipe) => {}
const postRecipe = async({name, summary, healthScore, dishTypes, steps, image, diets}) => {
    let recipe = await Recipe.create({
        name,
        summary,
        healthScore,
        dishTypes,
        steps,
        image
    })
    let dietsDb = await Diet.findAll({
        where: { 
            name: diets
        }
    })
    recipe.addDiet(dietsDb)
    return recipe
}
const getDbDiets = async() => {
    const apiURL = await axios.get(`${URL}/complexSearch?apiKey=${API_KEY_1}&addRecipeInformation=true&number=100`)
    let apiDiets = apiURL.data.results.map((elemento) => elemento.diets)
    apiDiets = [...new Set(apiDiets.flat()), 'vegetarian']
    for(let i = 0; i < apiDiets.length; i++){
        await Diet.findOrCreate({
            where: {name: apiDiets[i]}
        })
    }
    return Diet.findAll()
}
module.exports = {
    getAllRecipes,
    getRecipeById,
    deleteRecipe,
    postRecipe,
    getDbDiets
}
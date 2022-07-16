const { Router } = require('express');
const { 
    getAllRecipes, 
    getAllId, 
    postRecipe 
} = require('../controllers/index.js')
const router = Router();

router.get('/', async(req,res) => {
    const {name} = req.query
    try{
        const allRecipes = await getAllRecipes()
        if(name){
            let recipeNameFiltered = allRecipes.filter((elemento) => elemento.name.toLowerCase().includes(name.toLocaleLowerCase()))
            return recipeNameFiltered.length ? 
                res.json(recipeNameFiltered) : 
                res.status(404).send('La receta no existe')
        }else{
            res.status(200).send(allRecipes)
        }
    }catch(error){
        return res.status(400).json("Ups! Algo ha salido mal")
    }
})
router.get('/:id', async(req,res) => {
    let {id} = req.params;
    try{
        let recipe = await getAllId(id);
        if(!recipe){
            return res.status(400).json("No se encontro el id")
        }
        return res.json(recipe)
    }catch(error){
        return res.status(400).json("Ups! Algo ha salido mal")
    }
})
router.post('/', async(req,res) => {
    let { name, summary, healthScore, dishTypes, steps, image, diets, minutes, servings, createInDB} = req.body;
    try{
        if(!name || !summary) throw Error('El nombre y summary son necesarios');
        postRecipe({name, summary, healthScore, dishTypes, steps, image, diets,minutes, servings, createInDB})
        .then((recipe) => {
            res.json(recipe)
        })
    }catch(error){
        return res.status(400).json("Ups! Algo ha salido mal")
    }
})
module.exports = router;
const { Router } = require('express');
const { 
    getAllRecipes, 
    getRecipeById, 
    deleteRecipe, 
    postRecipe 
} = require('../controllers/index.js')
const router = Router();

router.get('/', async(req,res) => {
    const {name} = req.query
    try{
        const allRecipes = await getAllRecipes()
        if(name){
            let recipeNameFiltered = allRecipes.filter((elemento) => elemento.name.toLowerCase().includes(name.toLocaleLowerCase()))
            return recipeNameFiltered.length ? res.json(recipeNameFiltered) : res.status(404).send('La receta no existe')
        }else{
            res.status(200).send(allRecipes)
        }
    }catch(error){
        return res.status(400).json("Ups! Algo ha salido mal")
    }
})
router.get('/:idRecipe', async(req,res) => {
    let {idRecipe} = req.params;
    try{
        const recipe = await getRecipeById(idRecipe);
        if(!recipe){
            res.status(404).json("No se encontre el id")
        }
        res.status(200).json(recipe)
        res.send("Receta creada con éxito")
    }catch(error){
        return res.status(400).json("Ups! Algo ha salido mal")
    }
})
router.post('/', async(req,res) => {
    let { name, summary, healthScore, dishTypes, steps, image, diets} = req.body;
    try{
        if(!name || !summary) throw Error('Falta nombre o summary');
        postRecipe({name, summary, healthScore, dishTypes, steps, image, diets})
        .then((recipe) => {
            res.status(201).json(recipe)
        })
        
    }catch(error){
        return res.status(400).json("Ups! Algo ha salido mal")
    }
})
router.delete('/:idRecipe', async (req, res) => {
    let {idRecipe} = req.params;
    try{
        res.status(200).json(await deleteRecipe(idRecipe))
        res.send("Receta eliminada con éxito")
    }catch(error){
        return res.status(400).json("Ups! Algo ha salido mal")
    }
})
module.exports = router;
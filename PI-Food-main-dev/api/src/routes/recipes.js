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
                res.status(404).send('La receta no se encontro')
        }else{
            res.status(200).send(allRecipes)
        }
    }catch(error){
        return res.status(400).json("Algo ha salido mal en la busqueda de la receta")
    }
})
router.get('/:id', async(req,res) => {
    let {id} = req.params;
    try{
        let recipe = await getAllId(id);
        if(!recipe){
            return res.status(400).json("No se encontro el id")
        }
        return res.status(200).json(recipe)
    }catch(error){
        return res.status(400).json("Algo ha salido mal en la busqueda de la receta")
    }
})
router.post('/create', async(req,res) => {
    let { name, summary, healthScore, dishTypes, steps, image, diets, minutes, servings, createInDB} = req.body;
    try{
        if(!name || !summary || !dishTypes) throw Error('El nombre, summary y dishtypes son necesarios');
        const recipe = await postRecipe({name, summary, healthScore, dishTypes, steps, image, diets, minutes, servings, createInDB})
        // .then((recipe) => {
        //     res.json(recipe)
        // })
        return res.json(recipe)
    }catch(error){
        return res.status(400).json("Algo salio mal en la creación de la receta")
    }
})
module.exports = router;
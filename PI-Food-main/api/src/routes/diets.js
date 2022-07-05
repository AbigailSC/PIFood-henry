const { Router } = require('express');
const { getDbDiets } = require('../controllers/index.js');
const router = Router();

router.get('/', async (req, res) => {
    try{
       res.status(200).json(await getDbDiets())
    }catch(error){
        return res.status(400).json("Ups! Algo ha salido mal")
    }
})
module.exports = router;
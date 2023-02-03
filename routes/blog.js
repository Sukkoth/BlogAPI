const router = require('express').Router();

router.get('/', (req, res)=>{
    res.json({message: 'Blogs index'})
})

module.exports = router
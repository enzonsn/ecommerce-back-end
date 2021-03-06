const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

router.get('/', async (req, res) => {
  try{
    const tagInfo = await Tag.findAll({ include: {model: Product}});
    res.status(200).json(tagInfo);
  }catch(err){res.status(500).json(err);}
});

router.get('/:id', async (req, res) => {
  try{
    const tagInfo = await Tag.findByPk(req.params.id, 
      { include: [{model: Product, through: ProductTag}]
    });
    res.status(200).json(tagInfo);
  }catch(err){res.status(500).json(err);}
});

router.post('/', async (req, res) => {
  try{
    const tagInfo = await Tag.create(req.body);
    res.status(200).json(tagInfo);
  }catch(err){res.status(500).json(err);}
});

router.put('/:id', async (req, res) => {
  try{
    const tagInfo = await Tag.update({tag_name: req.body.tag_name}, {where: {id: req.params.id}});
    if(!tagInfo){
      res.status(404).json({message: 'Tag not found / No tags.'});
      return;
    }
    return res.status(200).json(tagInfo);
  }catch(err){res.status(500).json(err);}
});

router.delete('/:id', async (req, res) => {
  try{
    const tagInfo = await Tag.destroy({where: {id: req.params.id}});
    if(!tagInfo){
      res.status(404).json({message: 'Tag not found / No tags / Tag already destroyed.'});
      return;
    }
    return res.status(200).json(tagInfo);
  }catch(err){res.status(500).json(err);}
});

module.exports = router;

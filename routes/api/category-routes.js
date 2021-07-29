const router = require('express').Router();
const { Category, Product } = require('../../models');

router.get('/', async (req, res) => {
  try{
    const catInfo = await Category.findAll({ include: { model: Product }});
    res.status(200).json(catInfo);
  }catch(err){res.status(500).json(err);}
});

router.get('/:id', async (req, res) => {
  try{
    const catInfo = await Category.findByPk(req.params.id, { include: { model: Product }});
    if(!catInfo){
      res.status(404).json({ message: 'Category not found / No categories.' });
      return;
    }
    res.status(200).json(catInfo);
  }catch(err){res.status(500).json(err);}
});

router.post('/', async (req, res) => {
  try{
    const catInfo = await Category.create(req.body);
    res.status(200).json(catInfo);
  }catch(err){res.status(500).json(err);}
});

router.put('/:id', async (req, res) => {
  try{
    const catInfo = await Category.update(req.body, { where: { id: req.params.id }});
    if(!catInfo){
      res.status(404).json({ message: 'Category not found / No categories.' });
      return;
    }
    res.status(200).json(catInfo);
  }catch(err){res.status(500).json(err);}
});

router.delete('/:id', async (req, res) => {
  try{
    const catInfo = await Category.destroy({ where: { id: req.params.id }});
    if(!catInfo){
      res.status(404).json({ message: 'Category not found / No categories / Category already destroyed.' });
      return;
    }
    res.status(200).json(catInfo);
  }catch(err){res.status(500).json(err);}
});

module.exports = router;

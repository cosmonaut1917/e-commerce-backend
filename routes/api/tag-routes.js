const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  Tag.findAll({ include: [Product, { model: Product, through: ProductTag }] }).then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  Tag.findByPk(req.params.id, { include: [Product, { model: Product, through: ProductTag }] }).then((data) => {
    if (!data) {
      return res.status(404).json({ message: 'No tag found with this id' });
     }
    res.json(data);
  }
  ).catch((err) => {
    res.json(err);
  });
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body).then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id
    }
  }).then((data) => {
    if (!data) {
      return res.status(404).json({ message: 'No tag found with this id' });
     }
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy
    ({
      where: {
        id: req.params.id
      }
    }).then((data) => {
      if (!data) {
       return res.status(404).json({ message: 'No tag found with this id' });
      }
      res.json(data);
    }).catch((err) => {
      res.json(err);
    });
});

module.exports = router;

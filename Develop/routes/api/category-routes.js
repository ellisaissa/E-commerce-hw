const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {

  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {

  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!categoryData[0]) {
      res.status(404).json({ message: 'No category with this id!' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {

  try {
    const categoryData = await Category.destroy({
      where: { id: req.params.id }
    });
    if (!categoryData) {
      res.status(404).json({ message: 'No category with this id!' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
  });



// router.get('/', (req, res) => {
//   // find all categories
//   Category.findAll({
//   // be sure to include its associated Products
//   include: [Product],
//   })
//     .then((categories) => res.json(categories))
//     .catch((err) => res.status(500).json(err));
// });

// router.get('/:id', (req, res) => {
//   // find one category by its `id` value
//   Category.findOne({
//     where: {
//       id: req.params.id,
//     },
//   // be sure to include its associated Products
//   include: [Product],
//   })
//     .then((category) => res.json(category))
//     .catch((err) => res.status(400).json(err));
// });

// router.post('/', (req, res) => {
//   // create a new category
//   Category.create(req.body)
//     .then((category) => res.status(200).json(category))
//     .catch((err) => res.status(400).json(err));
// });

// router.put('/:id', (req, res) => {
//   // update a category by its `id` value
//   Category.update(req.body, {
//     where: {
//       id: req.params.id,
//     },
//   })
//   .then((category) => res.status(200).json(category))
//   .catch((err) => res.status(400).json(err));
// });

// router.delete('/:id', (req, res) => {
//   // delete a category by its `id` value
//   Category.destroy({
//     where: {
//       id: req.params.id,
//     },
//   })
//     .then((category) => res.status(200).json(category))
//     .catch((err) => res.status(400).json(err));
// });

module.exports = router;

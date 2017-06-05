
'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex')

router.get('/', (req, res, next) => {
  knex('classifieds')
  .select('id', 'title', 'title', 'description', 'price', 'item_image')
  .orderBy('id')
  .then((data) => {
    res.send(data);
  })
  .catch((err) => {
    next(err);
  });
});

router.get('/:id', (req, res, next) => {
  let id = Number.parseInt(req.params.id)

  knex('classifieds')
    .select(['id', 'title', 'description', 'price', 'item_image'])
    .where('id', id)
    .then((data) => {
      res.send(data[0]);
    })
    .catch((err) => {
      next(err);
    })
})

router.post('/', (req, res, next) => {
  knex('classifieds')
  .returning(['id', 'title', 'description', 'price', 'item_image'])
  .insert({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    item_image: req.body.item_image
  })
  .then((data) => {
    res.send(data[0]);
  })
  .catch((err) => {
    next(err);
  });
});

router.patch('/:id', (req, res, next) => {
  let id = Number.parseInt(req.params.id)

  knex('classifieds')
    .where('id', id)
    .returning(['id', 'title', 'description', 'price', 'item_image'])
    .update(req.body)
    .then((data) => {
      res.send(data[0])
      // "Ad Updated!"
    })
    .catch((err) => {
      next(err);
    });
});

router.delete('/:id', (req, res, next) => {
  let id = Number.parseInt(req.params.id)

  knex('classifieds')
    .where('id', req.params.id)
    .returning(['id', 'title', 'description', 'price', 'item_image'])
    .del()
    .then((data) => {
      res.send(data[0]);
    // "Ad Deleted!"
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
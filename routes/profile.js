const express = require('express');
const router = express.Router();
const Freelancer = require('../models/profile.model');
const freelancerDesc = require('../models/freelancer.desc');

router.post('/add', async (req, res) => {
  try {
    const { name, skill, experience, rating, charge } = req.body;
    const {description, strength, magictool, experiencedescription, workhistory } = req.body;

    const freelancer = new Freelancer({
      name,
      skill,
      experience,
      rating,
      charge
    });
   const prf = await freelancer.save();
    const free = new freelancerDesc({
      _id: prf._id,
        description,
        strength,
        magictool,
        experiencedescription,
        workhistory
      });
  await free.save();
    res.status(201).json({ message: 'Freelancer details saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error });
  }
});


router.get('/view', async (req, res) => {
  try {
    const freelancers = await Freelancer.find();
    if (freelancers.length > 0) {
      res.status(200).json(freelancers);
    } else {
      res.status(404).json({ error: 'No freelancers found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error });
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Freelancer.deleteOne({ _id: id });
    if (result.deletedCount === 1) {
      res.json({ message: 'Freelancer deleted' });
    } else {
      res.status(404).json({ error: 'Freelancer not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error });
  }
});

router.put('/update/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const freelancer = await Freelancer.findById(id);
    if (!freelancer) {
      res.status(404).json({ error: 'Freelancer not found' });
    } else {
      const { name, skill, experience, rating, charge, description } = req.body;
      freelancer.name = name || freelancer.name;
      freelancer.skill = skill || freelancer.skill;
      freelancer.experience = experience || freelancer.experience;
      freelancer.rating = rating || freelancer.rating;
      freelancer.charge = charge || freelancer.charge;
      freelancer.description = description || freelancer.description;

      await freelancer.save();
      res.send(freelancer);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error });
  }
});

module.exports = router;

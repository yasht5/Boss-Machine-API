const express = require('express');
const ideasRouter = express.Router();
module.exports = ideasRouter;

const {
    createMeeting,
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    deleteAllFromDatabase,
} = require('./db.js');

const checkMillionDollarIdea = require('./checkMillionDollarIdea.js');

ideasRouter.param('id', (req, res, next, id) => {
    const idea = getFromDatabaseById('ideas', id);
    if(idea){
        req.idea = idea;
        next();
    }else{
        res.status(404).send(); 
    }
});

ideasRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('ideas'));
    next();
});

ideasRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
    const newIdea = addToDatabase('ideas', req.body);
    res.status(201).send(newIdea);
    next();
});

ideasRouter.get('/:id', (req, res, next) => {
    res.send(req.idea);
    next();
});

ideasRouter.put('/:id', (req, res, next) => {
    const newInstance = updateInstanceInDatabase('ideas', req.body);
    res.send(newInstance);
    next();
});

ideasRouter.delete('/:id', (req, res, next) => {
    const toDelete = deleteFromDatabasebyId('ideas', req.params.id);
    if(toDelete){
        res.status(204).send();
    }else{
        req.status(500).send();
    }
    next();
});


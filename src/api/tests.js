const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

router.get('/', async (req, res) => {
    const tests = await loadTests();
    res.send(await tests.find({}).toArray());
});

router.get('/:id', async (req, res) => {
    const tests = await loadTests();
    res.send(await tests.findOne({ _id: new mongodb.ObjectID(req.params.id) }));
});

router.post('/:id', async (req, res) => {
    const answers = req.body.answers;
    const tests = await loadTests();
    const test = await tests.findOne({ _id: new mongodb.ObjectID(req.params.id) });

    let correct_answers = 0;
    for (i = 0; i < answers.length; i++) {
        if (answers[i] == test.questions[i].answer) {
            correct_answers++;
        }
    }
    
    res.send({ score: correct_answers/answers.length });
});
    
async function loadTests() {
    const client = await mongodb.MongoClient.connect(
        'mongodb://localhost:27017/',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true 
        }
    );

    return client.db('nsa4').collection('tests');
}

module.exports = router;

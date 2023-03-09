const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');

suite('Functional Tests', () => {
    // #1
    test('Translation with text and locale fields: POST request to /api/translate', function (done) {
        chai.request(server)
            .post('/api/translate')
            .send({
                text: 'Tea time is usually around 4 or 4.30.',
                locale: 'british-to-american',
            })
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.body.text, 'Tea time is usually around 4 or 4.30.');
                assert.equal(res.body.translation, 'Tea time is usually around 4 or <span class="highlight">4:30</span>.')
                done();
            });
    });
    // #2
    test('Translation with text and invalid locale field: POST request to /api/translate', function (done) {
        chai.request(server)
            .post('/api/translate')
            .send({
                text: 'Tea time is usually around 4 or 4.30.',
                locale: 'british-to-chinese',
            })
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.deepEqual(res.body, { error: 'Invalid value for locale field' });
                done();
            });
    });
    // #3
    test('Translation with missing text field: POST request to /api/translate', function (done) {
        chai.request(server)
            .post('/api/translate')
            .send({
                locale: 'british-to-american',
            })
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.deepEqual(res.body, { error: 'Required field(s) missing' });
                done();
            });
    });
    // #4
    test('Translation with missing locale field: POST request to /api/translate', function (done) {
        chai.request(server)
            .post('/api/translate')
            .send({
                text: 'Tea time is usually around 4 or 4.30.',
            })
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.deepEqual(res.body, { error: 'Required field(s) missing' });
                done();
            });
    });
    // #5
    test('Translation with empty text: POST request to /api/translate', function (done) {
        chai.request(server)
            .post('/api/translate')
            .send({
                text: '',
                locale: 'british-to-american',
            })
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.deepEqual(res.body, { error: 'No text to translate' });
                done();
            });
    });
    // #6
    test('Translation with text that needs no translation: POST request to /api/translate', function (done) {
        chai.request(server)
            .post('/api/translate')
            .send({
                text: 'Mangoes are my favorite fruit.',
                locale: 'british-to-american',
            })
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.body.translation, 'Everything looks good to me!');
                done();
            });
    });
});

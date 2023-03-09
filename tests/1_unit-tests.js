const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');
let translator = new Translator();

suite('Unit Tests', () => {
    suite('#Translate To British English', () => {
        // #1
        test('Mangoes are my favorite fruit.', function () {
            assert.equal(translator.translateToBritish('Mangoes are my favorite fruit.').translation,
                'Mangoes are my favourite fruit.');
        });
        // #2
        test('I ate yogurt for breakfast.', function () {
            assert.equal(translator.translateToBritish('I ate yogurt for breakfast.').translation,
                'I ate yoghurt for breakfast.');
        });
        // #3
        test("We had a party at my friend's condo.", function () {
            assert.equal(translator.translateToBritish("We had a party at my friend's condo.").translation,
                "We had a party at my friend's flat.");
        });
        // #4
        test('Can you toss this in the trashcan for me?', function () {
            assert.equal(translator.translateToBritish('Can you toss this in the trashcan for me?').translation,
                'Can you toss this in the bin for me?');
        });
        // #5
        test('The parking lot was full.', function () {
            assert.equal(translator.translateToBritish('The parking lot was full.').translation,
                'The car park was full.');
        });
        // #6
        test('Like a high tech Rube Goldberg machine.', function () {
            assert.equal(translator.translateToBritish('Like a high tech Rube Goldberg machine.').translation,
                'Like a high tech Heath Robinson device.');
        });
        // #7
        test('To play hooky means to skip class or work.', function () {
            assert.equal(translator.translateToBritish('To play hooky means to skip class or work.').translation,
                'To bunk off means to skip class or work.');
        });
        // #8
        test('No Mr. Bond, I expect you to die.', function () {
            assert.equal(translator.translateToBritish('No Mr. Bond, I expect you to die.').translation,
                'No Mr Bond, I expect you to die.');
        });
        // #9
        test('Dr. Grosh will see you now.', function () {
            assert.equal(translator.translateToBritish('Dr. Grosh will see you now.').translation,
                'Dr Grosh will see you now.');
        });
        // #10
        test('Lunch is at 12:15 today.', function () {
            assert.equal(translator.translateToBritish('Lunch is at 12:15 today.').translation,
                'Lunch is at 12.15 today.');
        });
    });

    suite('#Translate to American English', () => {
        // #11
        test('We watched the footie match for a while.', function () {
            assert.equal(translator.translateToAmerican('We watched the footie match for a while.').translation,
                'We watched the soccer match for a while.');
        });
        // #12
        test('Paracetamol takes up to an hour to work.', function () {
            assert.equal(translator.translateToAmerican('Paracetamol takes up to an hour to work.').translation,
                'Tylenol takes up to an hour to work.');
        });
        // #13
        test('First, caramelise the onions.', function () {
            assert.equal(translator.translateToAmerican('First, caramelise the onions.').translation,
                'First, caramelize the onions.');
        });
        // #14
        test('I spent the bank holiday at the funfair.', function () {
            assert.equal(translator.translateToAmerican('I spent the bank holiday at the funfair.').translation,
                'I spent the public holiday at the carnival.');
        });
        // #15
        test('I had a bicky then went to the chippy.', function () {
            assert.equal(translator.translateToAmerican('I had a bicky then went to the chippy.').translation,
                'I had a cookie then went to the fish-and-chip shop.');
        });
        // #16
        test("I've just got bits and bobs in my bum bag.", function () {
            assert.equal(translator.translateToAmerican("I've just got bits and bobs in my bum bag.").translation,
                "I've just got odds and ends in my fanny pack.");
        });
        // #17
        test('The car boot sale at Boxted Airfield was called off.', function () {
            assert.equal(translator.translateToAmerican('The car boot sale at Boxted Airfield was called off.').translation,
                'The swap meet at Boxted Airfield was called off.');
        });
        // #18
        test('Have you met Mrs Kalyani?', function () {
            assert.equal(translator.translateToAmerican('Have you met Mrs Kalyani?').translation,
                'Have you met Mrs. Kalyani?');
        });
        // #19
        test("Prof Joyner of King's College, London.", function () {
            assert.equal(translator.translateToAmerican("Prof Joyner of King's College, London.").translation,
                "Prof. Joyner of King's College, London.");
        });
        // #20
        test('Tea time is usually around 4 or 4.30.', function () {
            assert.equal(translator.translateToAmerican('Tea time is usually around 4 or 4.30.').translation,
                'Tea time is usually around 4 or 4:30.');
        });
    });

    suite('#Highlight translation', () => {
        // #21
        test('Mangoes are my favorite fruit.', function () {
            assert.equal(translator.translate('Mangoes are my favorite fruit.', 'american-to-british').translation,
                'Mangoes are my <span class="highlight">favourite</span> fruit.');
        });
        // #22
        test('I ate yogurt for breakfast.', function () {
            assert.equal(translator.translate('I ate yogurt for breakfast.', 'american-to-british').translation,
                'I ate <span class="highlight">yoghurt</span> for breakfast.');
        });
        // #23
        test("We watched the footie match for a while.", function () {
            assert.equal(translator.translate('We watched the footie match for a while.', 'british-to-american').translation,
                'We watched the <span class="highlight">soccer</span> match for a while.');
        });
        // #24
        test('Paracetamol takes up to an hour to work.', function () {
            assert.equal(translator.translate('Paracetamol takes up to an hour to work.', 'british-to-american').translation,
                '<span class="highlight">Tylenol</span> takes up to an hour to work.');
        });
    });
});

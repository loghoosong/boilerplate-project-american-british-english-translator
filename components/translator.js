const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

Object.prototype.reverseMap = function () {
    let map = new Map();
    for (let key in this) {
        map.set(this[key], key);
    }
    return map;
}
const aToBSpellingMap = new Map(Object.entries(americanToBritishSpelling));
const bToASpellingMap = americanToBritishSpelling.reverseMap();
const aOnlyMap = new Map(Object.entries(americanOnly));
const bOnlyMap = new Map(Object.entries(britishOnly));
const aToBTitlesMap = new Map(Object.entries(americanToBritishTitles));
const bToATitlesMap = americanToBritishTitles.reverseMap();

class Translator {
    highlight(text, words) {
        for (let word of words) {
            text = text.replace(word, `<span class="highlight">${word}</span>`);
        }
        return text;
    }

    translateWithMap(sentence, spelling, titles, only, timeFormat) {
        let wordsChanged = [];
        let words = sentence.split(' ');
        const len = words.length;

        const translateWord = (word, getter, capitalized, func) => {
            word = getter(word);    //取翻译值
            if (capitalized) word = word[0].toUpperCase() + word.slice(1);    //首字母大写
            wordsChanged.push(word);    //放入标记数组
            func(word);    //执行翻译
        }

        //暂存句尾的标点符号
        let punctuation = '';
        if (words[len - 1].match(/[.?!]$/)) {
            punctuation = words[len - 1].slice(-1);
            words[len - 1] = words[len - 1].slice(0, -1);
        }

        next: for (let i = 0; i < words.length; i++) {
            let capitalized = false;
            if (words[i][0].match(/[A-Z]/)) capitalized = true;    //标记单词首字母大写

            //多个单词联合（only对象中，key最长的是3个单词）
            for (let j = 3; j > 1; j--) {
                if (i <= words.length - j) {
                    let multiple = words.slice(i, i + j).join(' ').toLowerCase();
                    if (only.has(multiple)) {
                        translateWord(multiple,
                            word => only.get(word),
                            capitalized,
                            word => { words.splice(i, j, word); })
                        continue next;
                    }
                }
            }

            //单个单词
            let single = words[i].toLowerCase();
            if (only.has(single)) {
                translateWord(single, word => only.get(word), capitalized, word => { words[i] = word; });
            } else if (spelling.has(single)) {
                translateWord(single, word => spelling.get(word), capitalized, word => { words[i] = word; });
            } else if (titles.has(single)) {
                translateWord(single, word => titles.get(word), capitalized, word => { words[i] = word; });
            } else if (timeFormat.match(single)) {
                //处理时间格式
                translateWord(single, timeFormat.transform, capitalized, word => { words[i] = word; });
            }
        }

        //恢复句尾的标点符号
        words[words.length - 1] = words[words.length - 1] + punctuation;

        return { translation: words.join(' '), wordsChanged };
    }

    translateToBritish(text) {
        const regex = /(?<=(^\d{1,2})):(?=(\d{2}$))/;
        const match = word => word.match(regex);
        const transform = word => word.replace(regex, '.')
        return this.translateWithMap(text, aToBSpellingMap, aToBTitlesMap, aOnlyMap, { match, transform });
    }

    translateToAmerican(text) {
        const regex = /(?<=(^\d{1,2})).(?=(\d{2}$))/;
        const match = word => word.match(regex);
        const transform = word => word.replace(regex, ':')
        return this.translateWithMap(text, bToASpellingMap, bToATitlesMap, bOnlyMap, { match, transform });
    }

    translate(text, locale) {
        let res;
        if (locale == 'american-to-british') {
            res = this.translateToBritish(text);
        } else if (locale == 'british-to-american') {
            res = this.translateToAmerican(text);
        } else {
            return { error: 'Invalid value for locale field' };
        }
        return res.wordsChanged.length === 0
            ? { text, translation: 'Everything looks good to me!' }
            : { text, translation: this.highlight(res.translation, res.wordsChanged) };
    }
}

module.exports = Translator;
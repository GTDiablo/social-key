__author = 'Zsolt Boda';
__version = 1.0;

const CHARS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';


// Just a simple array comparison
function array_compare(arr1, arr2) {
    if (typeof arr1 !== 'undefined' && typeof arr1 !== 'undefined') {
        if (arr1.length === arr2.length) {
            for (var i = 0; i < arr1.length; i++) {
                if (arr1[i] !== arr2[i]) return false;
            }
            return true;
        }
    }
    return false;
}

class Key {
    /**
     * 
     * @param {string} key 
     */
    constructor(key = 'abcde-12345') {
        this.pattern = this._calc_pattern(key);
        this.checksum = this._calc_sum(key);
    }

    _calc_pattern(key) {
        var map = [];
        key.split('-').forEach(block => {
            map.push(block.length);
        });
        return map;
    }

    _calc_sum(key) {
        var sum = 0;
        key.split('-').forEach(block => {
            block.split('').forEach(char => {
                sum += char.charCodeAt(0);
            });
        });
        return sum;
    }

    _gen_random(n) {
        var block = '';
        for (var i = 0; i < n; i++) {
            block += CHARS.charAt(Math.floor(Math.random() * CHARS.length));
        }
        return block;
    }

    _gen_key() {
        var res = [];
        this.pattern.forEach(n => {
            res.push(this._gen_random(n));
        });
        return res.join('-')
    }

    get_rule() {
        /**
         * 
         */
        return ({
            pattern: this.pattern,
            check_sum: this.checksum
        });
    }

    static create_key_generator(pattern, check_sum) {
        /**
         * 
         */
        var instance = new Key();
        instance.pattern = pattern;
        instance.checksum = check_sum;
        return instance;
    }

    is_valid(key) {
        /**
         * 
         */
        var same_pattern = array_compare(this._calc_pattern(key), this.pattern);
        var same_checksum = this._calc_sum(key) === this.checksum;

        return (same_checksum && same_pattern);
    }

    async generate_key() {
        /**
         * 
         */
        var key;
        do {
            key = await this._gen_key();
        } while (!this.is_valid(key));
        return key;
    }
}

module.exports = Key;
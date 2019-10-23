
module.exports = function(input) {
    const strings = input.split('\n').map(string => string.trim());
    const weaponRegexp = new RegExp("^(.+) @ (.+) [@]{2} (.+) [@]{3} (.+) [@]{4} (.+)$");
    const shopRegexp = new RegExp("^(.+) [#]{2} (.+) @ (.+) [@]{3} (.+) [_]{2} (.+)$");

    const results = {};
    strings.forEach(string => {
        const weaponResult = weaponRegexp.exec(string);

        if (weaponResult) {
            results[weaponResult[4].trim()] = weaponResult[5].trim();
            return;
        }

        const shopResult = shopRegexp.exec(string);

        if (shopResult) {
            results[shopResult[4].trim()] = shopResult[5].trim();
        }
    });

    return JSON.stringify(results);
};
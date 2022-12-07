/**
 * Returns the index of the first available table in the given array, else returns -1
 * @param {boolean[]} tables the array of tables
 * @returns {number} the index of the first available table, else -1
 */
function findAvailableTable(tables) {
    for (let i = 0; i < tables.length; i++) {
        if (tables[i]) {
            return i;
        }
    }

    return -1;
}

/**
 * Returns a promise for the index of the first available table in the given array, else for -1
 * @param {boolean[]} tables the array of tables
 * @returns {Promise<number>} a promise for the index of the first available table, else -1
 */
function findAvailableTableAsync(tables) {
    return new Promise(resolve => {
        for (let i = 0; i < tables.length; i++) {
            if (tables[i]) {
                return resolve(i);
            }
        }

        resolve(-1);
    });
}


const tables = [false, false, false, true, false, false];

// both lines should print 3
console.log(findAvailableTable(tables));
findAvailableTableAsync(tables).then(index => console.log(index));
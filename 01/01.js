
function solve({ A, K }) {
    // Process sorted positive number first
    const sortedTuples = [...A]
        .map((number, index) => ({
            number,
            index
        }))
        .sort((tuple1, tuple2) => tuple2.number - tuple1.number)
        .filter(tuple => tuple.number > 0);

    let maxTuple = null;
    while (K && sortedTuples.length) {
        maxTuple = sortedTuples[0];
        A[maxTuple.index] = -1 * maxTuple.number;
        sortedTuples.shift();
        K--;
    }

    // If K is still > 0 then flip smallest negative number
    if (K > 0) {
        const sortedTuplesNegatives = [...A]
            .map((number, index) => ({
                number,
                index
            }))
            .sort((tuple1, tuple2) => tuple2.number - tuple1.number);
        const maxTuple = sortedTuplesNegatives[0];
        A[maxTuple.index] = Math.pow(-1, K) * maxTuple.number;
    }

    return A.reduce((a, b) => a + b, 0);
}

module.exports = solve;
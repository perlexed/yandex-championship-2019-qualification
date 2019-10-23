
const createBordersAndGetContainer = element => {
    const blackBorderContainer = document.createElement("div");
    Object.assign(blackBorderContainer.style, {
        border: "2px solid black",
        width: "146px",
        height: "138px",
    });
    const whiteBorderContainer = document.createElement("div");
    Object.assign(whiteBorderContainer.style, {
        border: "3px solid white",
        width: "140px",
        height: "132px",
    });
    blackBorderContainer.appendChild(whiteBorderContainer);
    const secondBlackBorderContainer = document.createElement("div");
    Object.assign(secondBlackBorderContainer.style, {
        border: "2px solid black",
        width: "136px",
        height: "128px",
    });
    whiteBorderContainer.appendChild(secondBlackBorderContainer);
    element.appendChild(blackBorderContainer);

    return secondBlackBorderContainer;
};

function renderBarcode(keyInfo, element) {
    const secondBlackBorderContainer = createBordersAndGetContainer(element);
    const addSquare = is1 => {
        const bar = document.createElement("div");
        bar.style.width = "8px";
        bar.style.height = "8px";
        bar.style.cssFloat = "left";
        bar.style.backgroundColor = is1 ? 'black' : 'white';
        secondBlackBorderContainer.appendChild(bar);
    };
    const dec2bin = dec => (dec >>> 0).toString(2).padStart(8, '0');

    const compositeKeyString = keyInfo.key + (keyInfo.address.padEnd(21, ' '));
    const keyAsBinaries = compositeKeyString
        .split('')
        .map(char => dec2bin(char.charCodeAt(0)));

    const binaries = [
        dec2bin(keyInfo.version),
        ...keyAsBinaries
    ];

    // Join pair if binary arrays
    const joinedBinaries = [];
    for (let index = 0; index <= binaries.length - 1; index += 2) {
        joinedBinaries.push(binaries[index] + binaries[index + 1]);
    }

    // Place binaries in columns and add checksum at the row end
    for (let columnIndex = 0; columnIndex < 16; columnIndex++) {
        const lineArray = [];

        for (let rowIndex = 0; rowIndex < 16; rowIndex++) {
            const cellElement = parseInt(joinedBinaries[rowIndex][columnIndex]);
            lineArray.push(cellElement);
            addSquare(cellElement);
        }

        const checksum = lineArray.reduce((a, b) => a + b, 0) % 2;
        addSquare(checksum);
    }

    return element;
}
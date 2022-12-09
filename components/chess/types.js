export var Colors;
(function (Colors) {
    Colors["WHITE"] = "white";
    Colors["BLACK"] = "black";
})(Colors || (Colors = {}));
export var Figures;
(function (Figures) {
    Figures["BISHOP"] = "bishop";
    Figures["KING"] = "king";
    Figures["KNIGHT"] = "knight";
    Figures["PAWN"] = "pawn";
    Figures["QUEEN"] = "queen";
    Figures["ROOK"] = "rook";
})(Figures || (Figures = {}));
export const BoardLettersByNumber = {
    1: 'A',
    2: 'B',
    3: 'C',
    4: 'D',
    5: 'E',
    6: 'F',
    7: 'G',
    8: 'H',
};
export const BoardNumberByLetter = {
    'A': 1,
    'B': 2,
    'C': 3,
    'D': 4,
    'E': 5,
    'F': 6,
    'G': 7,
    'H': 8,
};

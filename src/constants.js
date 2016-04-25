export const Strings = {
    'E-Guitar': [ 6, 7 ],
    'E-Bass': [4, 5, 6],
    'Acoustic Guitar': [ 6 ],
    'Ukulele': [ 4 ]
};

export const Instruments = [
    'E-Guitar', 'E-Bass', 'Acoustic Guitar', 'Ukulele'
];

export const Tunings = {
    'E-Guitar': {
        6: [
            { name: 'Standard', tones: 'E2 A2 D3 G3 B3 E3' },
            { name: 'Drop D', tones: 'D2 A2 D3 G3 B3 E3' },
            { name: 'Drop G', tones: 'G2 G2 D3 G3 B3 D3' },
            { name: 'Drop C', tones: 'C2 E2 G3 C3 E3 G3' },
            { name: 'High F', tones: 'C2 F2 C3 F3 A3 F3' }
        ],
        7: [
            { name: 'Standard', tones: 'B2 E2 A3 D3 G3 B3 E3' },
            { name: 'Russian', tones: 'D2 G2 B3 D3 G3 B3 D3' },
            { name: 'Spanish', tones: 'C2 G2 B3 D3 G3 B3 D3' },
            { name: 'Drop C', tones: 'C2 E2 A3 D3 G3 B3 E3' },
            { name: 'Dont know', tones: 'A2 A2 D3 D3 G3 B3 E3' }
        ]
    },
    'E-Bass': {
        4: [
            { name: 'Standard', tones: 'E1 A1 D2 G2' },
            { name: 'Drop D', tones: 'D1 A1 D2 G2' },
            { name: 'Drop H', tones: 'H1 E1 A2 D2' },
            { name: 'Drop C', tones: 'C1 G1 D2 A2' },
            { name: 'Drop B', tones: 'B1 E1 A2 D2' }
        ],
        5: [
            { name: 'Standard', tones: 'B0 E1 A1 D2 G2' },
            { name: 'Drop E', tones: 'E1 A1 D2 G2 C3' },
            { name: 'Drop C', tones: 'C1 D1 G2 C2 F3' },
            { name: 'High B', tones: 'E1 B1 E2 G2 B3' }
        ],
        6: [
            { name: 'Standard', tones: 'B0 E1 A1 D2 G2 C3' }
        ]
    },
    'Acoustic Guitar': {
        6: [
            { name: 'Standard', tones: 'E2 A2 D3 G3 B3 E3' },
            { name: 'Drop D', tones: 'D2 A2 D3 G3 B3 E3' },
            { name: 'Drop G', tones: 'G2 G2 D3 G3 B3 D3' },
            { name: 'Drop C', tones: 'C2 E2 G3 C3 E3 G3' },
            { name: 'High F', tones: 'C2 F2 C3 F3 A3 F3' }
        ]
    },
    'Ukulele': {
        4: [
            { name: 'Standard', tones: 'E1 A1 D2 G2' },
            { name: 'Drop D', tones: 'D1 A1 D2 G2' },
            { name: 'Drop H', tones: 'H1 E1 A2 D2' },
            { name: 'Drop C', tones: 'C1 G1 D2 A2' },
            { name: 'Drop B', tones: 'B1 E1 A2 D2' }
        ]
    }
};

export const Frequencies = [
    { name: 'B0', value: 30.87 },
    { name: 'C1', value:  32.70},
    { name: 'C1#', value: 34.65},
    { name: 'D1', value:  36.71},
    { name: 'D1#', value: 38.89},
    { name: 'E1', value:  41.20},
    { name: 'F1', value:  43.65},
    { name: 'F1#', value: 46.25},
    { name: 'G1', value:  49.00},
    { name: 'G1#', value: 51.91},
    { name: 'A1', value:  55.00},
    { name: 'A1#', value: 58.27},
    { name: 'B1', value:  61.74},

    { name: 'C2', value:  65.41},
    { name: 'C2#', value: 69.30},
    { name: 'D2', value:  73.42},
    { name: 'D2#', value: 77.78},
    { name: 'E2', value:  82.41},
    { name: 'F2', value:  87.31},
    { name: 'F2#', value: 92.50},
    { name: 'G2', value:  98.00},
    { name: 'G2#', value: 103.83},
    { name: 'A2', value: 110.00},
    { name: 'A2#', value: 116.54},
    { name: 'B2', value: 123.47},

    { name: 'C3', value: 130.81 },
    { name: 'C3#', value: 138.59 },
    { name: 'D3', value: 146.83 },
    { name: 'D3#', value: 155.56 },
    { name: 'E3', value: 164.81 },
    { name: 'F3', value: 174.61 },
    { name: 'F3#', value: 185.00 },
    { name: 'G3', value: 196.00 },
    { name: 'G3#', value: 207.65 },
    { name: 'A3', value: 220.00 },
    { name: 'A3#', value: 233.08 },
    { name: 'B3', value: 246.94 },

    { name: 'C4', value: 261.63 },
    { name: 'C4#', value: 277.18 },
    { name: 'D4', value: 293.66 },
    { name: 'D4#', value: 311.13 },
    { name: 'E4', value: 329.63 },
    { name: 'F4', value: 349.23 },
    { name: 'F4#', value: 369.99 },
    { name: 'G4', value: 392.00 },
    { name: 'G4#', value: 415.30 },
    { name: 'A4', value: 440.00 },
    { name: 'A4#', value: 466.16 },
    { name: 'B4', value: 493.88 },

    { name: 'C5', value: 523.25 },
    { name: 'C5#', value: 554.37 },
    { name: 'D5', value: 587.33 },
    { name: 'D5#', value: 622.25 },
    { name: 'E5', value: 659.25 },
    { name: 'F5', value: 698.46 },
    { name: 'F5#', value: 739.99 },
    { name: 'G5', value: 789.99 },
    { name: 'G5#', value: 830.61 },
    { name: 'A5', value: 880.00 },
    { name: 'A5#', value: 932.33 },
    { name: 'B5', value: 987.77 },

    { name: 'C6', value: 1046.50 }
];

export const getNoteFrequency = (note, stringName) => {
    if (!note || note.value == undefined || note.value == null) return null;

    const pos = Frequencies.reduce((memo, f, index) => {
        if (f.name == stringName) memo = index;
        return memo;
    }, 0);
    return Frequencies[pos + note.value].value;
};

export const addBar = (b1, b2) => {
    const factor = b1.de / b2.de;
    return { en: b1.en + b2.en * factor, de: b1.de };
};

export const mulBar = (b1, b2) => {
    const en = b1.en * b2.en;
    const de = b1.de * b2.de;
    const d = gcd(en, de);
    return { en: en / d, de: de / d };
};

export const subBar = (b1, b2) => {
    const factor = b1.de / b2.de;
    return { en: b1.en - b2.en * factor, de: b1.de };
};

export const eqBar = (b1, b2) => {
    return b1.en == b2.en && b1.de == b2.de;
};

export const smBar = (b1, b2) => {
    const factor = b1.de / b2.de;
    return b1.en < b2.en * factor;
};

export const normalize = (bar, de) => {
    const en = bar.en / (bar.de / de);
    if (en % 1 == 0) return { en, de };
    else return normalize(bar, de * 2);
};

const gcd = (a, b) => {
    if (!b) return a;
    return gcd(b, a % b);
};
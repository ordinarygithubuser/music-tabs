import { Util } from 'mva';

export const createNotes = (strings, bars) => {
    return Util.Range(0, strings).reduce((memo, string) => {
        memo[string] = [];
        bars.map((bar, index) => {
            memo[string][index] = Note({
                string, index, bar: bar, value: null
            });
        });
        return memo;
    }, []);
};

export const Project = (data, projectCount) => {
    return Object.assign(data, {
        id: projectCount
    });
};

export const Note = data => {
    return Object.assign({}, data);
};

export const Measure = (data, measureCount, instrument) => {
    const strings = instrument.tune.tones.split(' ');
    const bars = Util.Range(0, 8).map(i => Bar(1, 8));

    return Object.assign(Object.assign({}, data), {
        id: measureCount,
        iid: instrument.id,
        notes: createNotes(strings.length, bars),
        tempo: 120,
        bar: Bar(8, 8)
    });
};

export const Instrument = (data, instrumentCount, projectId) => {
    return Object.assign(data, {
        id: instrumentCount,
        pid: projectId,
        measures: []
    });
};

export const Bar = (en, de) => {
    return { en, de };
};

const add = (b1, b2) => {
    return Bar(b1.en + b2.en * (b1.de / b2.de), b1.de);
};

const sub = (b1, b2) => {
    return Bar(b1.en - b2.en * (b1.de / b2.de), b1.de);
};

const mul = (b1, b2) => {
    const en = b1.en * b2.en;
    const de = b1.de * b2.de;
    const d = gcd(en, de);
    return Bar(en / d, de / d);
};

const eq = (b1, b2) => {
    return b1.en == b2.en && b1.de == b2.de;
};

const less = (b1, b2) => {
    return b1.en < b2.en * (b1.de / b2.de);
};

const more = (b1, b2) => {
    return b1.en > b2.en * (b1.de / b2.de);
};

const norm = (bar, de) => {
    const en = bar.en / (bar.de / de);
    if (en % 1 == 0) return Bar(en, de);
    else return norm(bar, de * 2);
};

const gcd = (a, b) => {
    if (!b) return a;
    return gcd(b, a % b);
};

export const BarOps = {
    add, sub, mul, less, more, eq, norm
};
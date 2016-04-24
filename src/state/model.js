import { Util } from 'mva';

let NID = 0;

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

export const Bar = (en, de) => {
    return { en, de };
};

export const Project = (data, state) => {
    const id = state.projects.length + 1;
    return Object.assign(data, { id });
};

export const Note = data => {
    return Object.assign(data, { id: NID++ });
};

export const Measure = (data, state) => {
    const strings = state.instrument.tune.tones.split(' ');
    const bars = Util.Range(0, 7).map(i => Bar(1, 8));

    return Object.assign(data, {
        id: state.measures.length + 1,
        iid: state.instrument.id,
        notes: createNotes(strings.length, bars),
        tempo: 120,
        bar: Bar(8, 8)
    });
};

export const Instrument = (data, state) => {
    const id = state.instruments.length + 1;
    const pid = state.project.id;
    return Object.assign(data, { id, pid, measures: [] });
};


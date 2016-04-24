import { Util } from 'mva';

let NID = 0;

const createNotes = state => {
    const tunes = state.instrument.tune.tones.split(' ');
    return Util.Range(0, tunes.length).reduce((memo, tune, index) => {
        memo[index] = [];
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

export const Note = (data, de) => {
    data.id = NID++;
    if (!data.bar) data.bar = Bar(1, de);
    return data;
};

export const Measure = (data, state) => {
    return Object.assign(data, {
        id: state.measures.length + 1,
        iid: state.instrument.id,
        notes: createNotes(state),
        tempo: 120,
        bar: Bar(8, 8)
    });
};

export const Instrument = (data, state) => {
    const id = state.instruments.length + 1;
    const pid = state.project.id;
    return Object.assign(data, { id, pid, measures: [] });
};


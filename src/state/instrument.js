import { Util } from 'mva';
import * as Actions from '../actions/instrument';
import { Measure, Instrument, createString } from './model';

const getMeasure = (state, instrument) => {
    const measures = state.measures.filter(m => m.iid == instrument.id);
    if (!state.instrument) return measures[0];
    const index = state.measures.filter(m => {
        return m.iid == state.instrument.id;
    }).indexOf(state.measure);
    return measures[index] || measures[0];
};

export default ({ load, persist, on }) => {
    load('instruments',[]);
    load('instrument', null);

    on(Actions.Create, (data, state) => {
        const instrument = Instrument(data, state.instruments.length, state.project.id);
        const instruments = state.instruments.concat([instrument]);
        const measure = Measure({ index: 0 }, state.measures.length, instrument);
        const measures = state.measures.concat([measure]);
        persist({ instruments, instrument, measures, measure });
    });

    on(Actions.Update, (data, state) => {
        const instrument = state.instrument;
        const strings = data.tune.tones.split(' ').length;
        const measures = state.measures.map(m => {
            if (m.iid != instrument.id) return m;
            if (strings < m.notes.length) {
                m.notes = m.notes.slice(0, strings);
            } else {
                const bars = m.notes[0].map(n => n.bar);
                Util.Range(m.notes.length, strings).map(string => {
                    m.notes[string] = createString(string, bars);
                });
            }
            return m;
        });

        Object.keys(data).map(key => {
            if (instrument[key]) instrument[key] = data[key];
        });

        const instruments = state.instruments.map(i => {
            return i.id == instrument.id ? instrument : i;
        });
        persist({ instruments, instrument, measures });
    });

    on(Actions.Remove, (_, state) => {
        const measures = state.measures.filter(m => {
            return m.iid !== state.instrument.id;
        });
        const instruments = state.instruments.filter(i => {
            return i.id != state.instrument.id;
        });
        persist({
            instruments,
            instrument: instruments[0],
            measures,
            measure: null
        });
    });

    on(Actions.Select, (instrument, state) => {
        const measure = getMeasure(state, instrument);
        persist({ instrument, measure });
    });

    on(Actions.SetAttributes, (conf, { instrument, instruments }) => {
        instrument.conf = conf;
        instruments = instruments.map(i => {
            return i.id == instrument.id ? instrument : i;
        });
        persist({ instruments, instrument });
    });

    on(Actions.Mute, (instrument, state) => {
        const instruments = state.instruments.map(i => {
            if (i.id == instrument.id) {
                i.conf.mute = !i.conf.mute;
            }
            return i;
        });
        persist({ instruments });
    });

    on(Actions.Solo, (instrument, state) => {
        const instruments = state.instruments.map(i => {
            if (i.id == instrument.id) {
                i.conf.solo = !i.conf.solo;
            } else {
                i.conf.solo = false;
            }
            return i;
        });
        persist({ instruments });
    });
};
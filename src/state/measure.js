import { Util } from 'mva';
import { addBar, mulBar } from '../constants';
import * as Actions from '../actions/measure';
import { Measure, Note } from './model';

const insertMeasure = (state, pos) => {
    const afterMeasures = state.measures.filter(m => {
        return m.pos >= pos;
    }).map(m => {
        m.pos = m.pos + 1;
        return m;
    });

    return state.measures.slice(0, pos)
        .concat([state.measure])
        .concat(afterMeasures);
};

export default ({ init, on }) => {
    init('measures', []);
    init('measure', null);

    on(Actions.Create, (data, state, update) => {
        state.measure = Measure(data, state);
        state.measures = insertMeasure(state, data.pos);
        update(state);
    });

    on(Actions.Select, (measure, state, update) => {
        update({ measure });
    });

    on(Actions.SetBar, (en, state, update) => {
        if (state.measure.bar.en > en) {
            state.measure.notes = state.measure.notes.map(string => {
                return string.slice(0, en);
            });
        }
        state.measure.bar.en = en;
        update(state);
    });

    on(Actions.SetTempo, (tempo, state, update) => {
        state.measure.tempo = tempo;
        update(state);
    });

    on(Actions.UpdateNote, ({ note, value }, state, update) => {
        state.measure.notes[note.string][note.index].value = value;
        update(state);
    });

    on(Actions.SelectTrack, ({ measure, instrument }, state, update) => {
        update({ measure, instrument });
    });

    on(Actions.JoinNote, ({ from, to }, state, update) => {
        const joined = [];

        state.measure.notes.map((string, sIndex) => {
            const temp = Object.assign({}, string[to]);
            joined[sIndex] = Object.assign(temp, string[from]);
            joined[sIndex].bar = addBar(string[from].bar, string[to].bar);
        });

        state.measure.notes.map((string, sIndex) => {
            const last = string.filter(note => note.index > to).map(note => {
                note.index -= 1;
                return note;
            });
            state.measure.notes[sIndex] = string.slice(0, from)
                .concat([joined[sIndex]]).concat(last);
        });
        update(state);
    });

    on(Actions.SplitNote, ({ index }, state, update) => {
        let clone = [];

        state.measure.notes.map((string, sIndex) => {
            const note = Object.assign({}, string[index]);
            note.index += 1;
            note.bar = mulBar(string[index].bar, { en: 1, de: 2 });
            clone[sIndex] = note;
        });
        state.measure.notes.map((string, sIndex) => {
            const orig = string.filter(note => note.index == index)[0];
            const last = string.filter(note => note.index > index).map(note => {
                note.index += 1;
                return note;
            });
            orig.bar = mulBar(orig.bar, { en: 1, de: 2 });
            state.measure.notes[sIndex] = string.slice(0, index)
                .concat([orig, clone[sIndex]]).concat(last);
        });
        update(state);
    });
};
import { Util } from 'mva';
import { addBar, mulBar, smBar, eqBar, normalize } from '../constants';
import * as Actions from '../actions/measure';
import { Measure, Note, Bar } from './model';

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
        const newBar = Bar(en, state.measure.bar.de);

        if (state.measure.bar.en > newBar.en) {
            state.measure.notes = state.measure.notes.map(string => {
                let bar = Bar(0, newBar.de);

                return string.filter(note => {
                    bar = addBar(bar, note.bar);
                    return smBar(bar, newBar) || eqBar(bar, newBar);
                });
            });
        } else {
            const bar = Bar(newBar.en - state.measure.bar.en, newBar.de);
            const index = state.measure.notes[0].length;

            state.measure.notes.map((_, string) => {
                state.measure.notes[string][index] = Note({ string, index, bar });
            });
        }
        state.measure.bar = newBar;
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
            const bar = addBar(string[from].bar, string[to].bar);
            const temp = Object.assign({}, string[to]);
            joined[sIndex] = Object.assign(temp, string[from]);
            joined[sIndex].bar = normalize(bar, state.measure.bar.de);
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
            note.bar = normalize(note.bar, state.measure.bar.de);
            clone[sIndex] = note;
        });
        state.measure.notes.map((string, sIndex) => {
            const orig = string.filter(note => note.index == index)[0];
            const last = string.filter(note => note.index > index).map(note => {
                note.index += 1;
                return note;
            });
            orig.bar = mulBar(orig.bar, { en: 1, de: 2 });
            orig.bar = normalize(orig.bar, state.measure.bar.de);
            state.measure.notes[sIndex] = string.slice(0, index)
                .concat([orig, clone[sIndex]]).concat(last);
        });
        update(state);
    });
};
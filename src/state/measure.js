import { Util } from 'mva';
import { addBar } from '../constants';
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

    on(Actions.CreateNote, (data, state, update) => {
        const { string, index } = data;
        state.measure.notes[string][index] = Note(data, state.measure.bar.de);
        update(state);
    });

    on(Actions.UpdateNote, ({ note, value }, state, update) => {
        if (value == '') {
            state.measure.notes[note.string][note.index] = null;
        } else {
            state.measure.notes[note.string][note.index].value = value;
        }
        update(state);
    });

    on(Actions.SelectTrack, ({ measure, instrument }, state, update) => {
        update({ measure, instrument });
    });

    on(Actions.JoinNote, ({ from, to }, state, update) => {
        let joined = [];
        state.measure.notes.map((string, sIndex) => {
            string.map((note, index) => {
                if (index == from) {
                    const tmp = Object.assign({}, string[to]);
                    joined[sIndex] = Object.assign(tmp, note);
                    joined[sIndex].bar = addBar(note.bar, string[to].bar);
                }
            });
        });
        state.measures = state.measures.notes.map((string, sIndex) => {
            return string.map((note, index) => {
                if (index < from) return note;
                if (index == from) return joined[sIndex];
            });
        });
    });

    on(Actions.SplitNote, (data, state, update) => {
        state.measure.bar.de = state.measure.bar.de / 2;
    });
};
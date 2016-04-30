import { Util } from 'mva';
import * as Actions from '../actions/edit';
import { Note, createNotes } from './model';

export default ({ init, persist, on }) => {
    init('edit', {
        copy: null
    });

    on(Actions.Copy, (measure, state, update) => {
        state.edit.copy = measure;
        update(state);
    });

    on(Actions.Paste, (measure, state) => {
        const strings = state.instrument.tune.tones.split(' ').length;
        const bars = state.edit.copy.notes[0].map(note => note.bar);
        const notes = createNotes(strings, bars);

        state.edit.copy.notes.map((string, sIndex) => {
            string.map(note => {
                const data = Object.assign({}, note);
                notes[sIndex][note.index] = Note(data);
            });
        });
        measure.notes = notes;
        measure.bar = state.edit.copy.bar;
        const measures = state.measures.map(m => {
            return m.id == measure.id ? measure : m;
        });
        persist({ measure, measures });
    });
};
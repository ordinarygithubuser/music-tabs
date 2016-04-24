import { Util } from 'mva';
import * as Actions from '../actions/edit';
import { Note, createNotes } from './model';

export default ({ init, on }) => {
    init('edit', {
        copy: null
    });

    on(Actions.Copy, (measure, state, update) => {
        state.edit.copy = measure;
        update(state);
    });

    on(Actions.Paste, (measure, state, update) => {
        const strings = state.instrument.tune.tones.split(' ').length;
        const bars = state.edit.copy.notes[0].map(note => note.bar);
        const notes = createNotes(strings, bars);

        state.edit.copy.notes.map((string, sIndex) => {
            string.map(note => {
                notes[sIndex][note.index] = Note(note);
            });
        });
        state.measure.notes = notes;
        update(state);
    });
};
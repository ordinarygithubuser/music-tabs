import { Util } from 'mva';
import * as Actions from '../actions/edit';
import { Note } from './model';

export default ({ init, on }) => {
    init('edit', {
        copy: null
    });

    on(Actions.Copy, (measure, state, update) => {
        state.edit.copy = measure.notes.slice();
        update(state);
    });

    on(Actions.Paste, (measure, state, update) => {
        const strings = state.instrument.tune.tones.split(' ');
        Util.Range(0, measure.bar.en).map(index => {
            Util.Range(0, strings.length).map(string => {
                const note = state.edit.copy[string][index];
                const copy = note ? Note(Object.assign({}, note), state) : null;
                measure.notes[string][index] = copy;
            });
        });
        state.measure = measure;
        update(state);
    });
};
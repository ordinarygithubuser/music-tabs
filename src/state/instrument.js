import * as Actions from '../actions/instrument';
import { Measure, Instrument } from './model';

export default ({ init, on }) => {
    init('instruments',[]);
    init('instrument', null);

    on(Actions.Create, (data, state, update) => {
        state.instrument = Instrument(data, state);
        state.instruments.push(state.instrument);
        state.measure = Measure({ pos: 0 }, state);
        state.measures.push(state.measure);
        update(state);
    });

    on(Actions.Select, (instrument, state, update) => {
        const index = state.measures.filter(m => m.iid == state.instrument.id).indexOf(state.measure);
        const measures = state.measures.filter(m => m.iid == instrument.id);
        const measure = measures[index] || measures[0];
        update({ instrument, measure });
    });

    Actions.Create({
        type: 'E-Bass',
        name: 'Tony T.',
        tune: { name: 'Standard', tones: 'E1 A1 D2 G2' },
        pid: 1
    });
};
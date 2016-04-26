import * as Actions from '../actions/instrument';
import { Measure, Instrument } from './model';

export default ({ load, persist, on }) => {
    load('instruments',[]);
    load('instrument', null);

    on(Actions.Create, (data, state) => {
        const instrument = Instrument(data, state.instruments.length, state.project.id);
        const instruments = state.instruments.concat([instrument]);
        const measure = Measure({ pos: 0 }, state.measures.length, instrument);
        const measures = state.measures.concat([measure]);
        persist({ instruments, instrument, measures, measure });
    });

    on(Actions.Select, (instrument, state) => {
        const index = state.measures.filter(m => m.iid == state.instrument.id).indexOf(state.measure);
        const measures = state.measures.filter(m => m.iid == instrument.id);
        const measure = measures[index] || measures[0];
        persist({ instrument, measure });
    });
};
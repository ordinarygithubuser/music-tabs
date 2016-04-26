import { Util } from 'mva';
import * as Actions from '../actions/measure';
import { Measure, Note, Bar , BarOps } from './model';

const { add, sub, mul, eq, less, more, norm } = BarOps;

const insertMeasure = (measures, measure) => {
    const afterMeasures = measures.filter(m => {
        return m.pos >= measure.pos;
    }).map(m => {
        m.pos = m.pos + 1;
        return m;
    });

    return measures.slice(0, measure.pos)
        .concat([measure])
        .concat(afterMeasures);
};

const updateMeasure = (measures, measure) => {
    return measures.map(m => {
        return m.id == measure.id ? measure : m;
    });
};

export default ({ load, persist, on }) => {
    load('measures', []);
    load('measure', null);

    on(Actions.Select, measure => persist({ measure }));

    on(Actions.Create, (data, { measures, instrument }) => {
        const measure = Measure(data, measures.length, instrument);
        persist({ measure, measures: insertMeasure(measures, measure) });
    });

    on(Actions.SetBar, (en, state) => {
        const measure = state.measure;
        const newBar = Bar(en, measure.bar.de);

        if (more(measure.bar, newBar)) {
            measure.notes = measure.notes.map(string => {
                let bar = Bar(0, newBar.de);

                return string.filter(note => {
                    bar = add(bar, note.bar);
                    return less(bar, newBar) || eq(bar, newBar);
                });
            });
        } else if (less(measure.bar, newBar)) {
            const bar = sub(newBar, measure.bar);
            const index = measure.notes[0].length;

            measure.notes.map((_, string) => {
                measure.notes[string][index] = Note({ string, index, bar });
            });
        }
        measure.bar = newBar;
        const measures = updateMeasure(state.measures, measure);
        persist({ measures, measure });
    });

    on(Actions.SetTempo, (tempo, state) => {
        const measure = Object.assign(state.measure, { tempo });
        const measures = updateMeasure(state.measures, measure);
        persist({ measure, measures });
    });

    on(Actions.UpdateNote, ({ note, value }, state) => {
        if (value === '') value = null;
        state.measure.notes[note.string][note.index].value = value;
        const measures = updateMeasure(state.measures, state.measure);
        persist({ measure: state.measure, measures });
    });

    on(Actions.SelectTrack, ({ measure, instrument }) => {
        persist({ measure, instrument });
    });

    on(Actions.JoinNote, ({ from, to }, state) => {
        const measure = state.measure;
        const joined = [];

        measure.notes.map((string, sIndex) => {
            const tmp = Object.assign({}, string[to]);
            const bar = norm(add(tmp.bar, string[to].bar), measure.bar.de);
            joined[sIndex] = Object.assign(tmp, string[from]);
            joined[sIndex].bar = bar;
        });

        measure.notes.map((string, sIndex) => {
            const first =  string.slice(0, from);
            const replace = [joined[sIndex]];
            const last = string.filter(note => note.index > to).map(note => {
                note.index -= 1;
                return note;
            });
            measure.notes[sIndex] = first.concat(replace).concat(last);
        });
        const measures = updateMeasure(state.measures, measure);
        persist({ measure, measures });
    });

    on(Actions.SplitNote, ({ index }, state) => {
        const measure = state.measure;
        const clone = [];

        measure.notes.map((string, sIndex) => {
            const note = Object.assign({}, string[index]);
            note.index += 1;
            note.bar = norm(mul(note.bar, Bar(1, 2)), measure.bar.de);
            clone[sIndex] = note;
        });

        measure.notes.map((string, sIndex) => {
            const orig = string.filter(note => note.index == index)[0];
            const first =  string.slice(0, index);
            const insert = [orig, clone[sIndex]];
            const last = string.filter(note => note.index > index).map(note => {
                note.index += 1;
                return note;
            });

            orig.bar = norm(mul(orig.bar, Bar(1, 2)), measure.bar.de);
            measure.notes[sIndex] =first.concat(insert).concat(last);
        });

        const measures = updateMeasure(state.measures, measure);
        persist({ measure, measures });
    });
};
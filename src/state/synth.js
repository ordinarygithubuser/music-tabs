import { Util } from 'mva';
import { getNoteFrequency } from '../constants';
import * as Actions from '../actions/synth';

const createTone = (context, note, type, string) => {
    if (!note) return null;
    const osc = context.createOscillator();
    const gain = context.createGain();

    osc.frequency.value = getNoteFrequency(note, string);
    gain.gain.value = 0.1;
    osc.connect(gain);
    gain.connect(context.destination);
    return osc;
};

const playBuffer = (context, buffer) => {
    let offset = 0;

    buffer.map(tone => {
        const begin = offset;
        offset += tone.duration;

        tone.chord.map(osc => {
            osc.start(begin);
            osc.stop(offset);
        });
    });
};

const makeBuffer = (measures, instrument, context) => {
    return measures.reduce((memo, m) => {
        const strings = instrument.tune.tones.split(' ');
        const type = instrument.type;
        const tones = [];

        Util.Range(0, m.notes[0].length).map(index => {
            const bar = m.notes[0][index].bar;
            const chord = strings.reduce((arr, string, sIndex) => {
                const note = m.notes[sIndex][index];
                const tone = createTone(context, note, type, string);
                return tone ? arr.concat([tone]) : arr;
            }, []);

            const duration = 1 / (m.tempo / 60 * ((bar.de / 4) / bar.en));
            tones.push({ chord, duration });
        });
        return memo.concat(tones);
    }, []);
};

const getMeasuresFrom = (measures, measure, instrument) => {
    const iMeasures = measures.filter(m => m.iid === instrument.id);
    const index = iMeasures.indexOf(measure);
    return iMeasures.filter((m, i) => i >= index);
};

export default ({ init, on }) => {
    let context = null;

    init('synth', {
        playing: false,
        position: []
    });

    on(Actions.Play, (_, state, update) => {
        if (state.synth.playing) context.close();
        context = new AudioContext();

        const { measures, measure, instrument } = state;
        const subset = getMeasuresFrom(measures, measure, instrument);
        const buffer = makeBuffer(subset, instrument, context);

        playBuffer(context, buffer);
        state.synth.playing = true;
        update(state);
    });

    on(Actions.Stop, (_, state, update) => {
        context.close();
        state.synth.playing = false;
        update(state);
    });
};
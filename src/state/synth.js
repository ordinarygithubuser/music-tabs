import { Util } from 'mva';
import { getNoteFrequency } from '../constants';
import * as Actions from '../actions/synth';

const createTone = (context, note, type, string) => {
    if (!note) return null;
    const osc = context.createOscillator();
    const gain = context.createGain();

    osc.frequency.value = getNoteFrequency(note, string);
    gain.gain.value = 0.5;

    if (type == 'E-Bass') {
        const filter = context.createBiquadFilter();
        osc.connect(filter);
        filter.gain.value = 50;
        filter.connect(gain);
    } else {
        osc.connect(gain);
    }
    gain.connect(context.destination);
    return osc;
};

const play = (context, buffer) => {
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

export default ({ init, on }) => {
    let context = null;

    init('synth', {
        playing: false,
        position: []
    });

    on(Actions.Play, (_, state) => {
        if (context) context.close();
        context = new AudioContext();

        const buffer = state.measures.reduce((memo, m) => {
            if (m.iid !== state.instrument.id) return memo;

            const strings = state.instrument.tune.tones.split(' ');
            const type = state.instrument.type;
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

        play(context, buffer);
    });

    on(Actions.Stop, (_, state, update) => {

    });
};
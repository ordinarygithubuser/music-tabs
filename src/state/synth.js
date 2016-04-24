import { Util } from 'mva';
import { getNoteFrequency } from '../constants';
import * as Actions from '../actions/synth';

const createTone = (context, note, string) => {
    if (!note) return null;
    const osc = context.createOscillator();
    osc.frequency.value = getNoteFrequency(note, string);
    osc.connect(context.destination);
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

            const tones = [];
            Util.Range(0, m.bar.en).map(index => {
                let bar = { en: 1, de: m.bar.de };
                const chord = state.instrument.tune.tones.split(' ').reduce((arr, string, sIndex) => {
                    const note = m.notes[sIndex][index];
                    const tone = createTone(context, note, string);
                    if (tone) {
                        if (note) bar = note.bar;
                        return arr.concat([tone])
                    }
                    return arr;
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
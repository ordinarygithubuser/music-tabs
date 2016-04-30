import { Util } from 'mva';
import { getNoteFrequency } from '../constants';
import * as Actions from '../actions/synth';

const Scheduler = (context, buffer, instrument) => {
    const strings = instrument.tune.tones.split(' ');

    const outputs = Util.Range(0, strings.length).map(() => {
        const osc = context.createOscillator();
        const gain = context.createGain();

        gain.gain.value = 0.2;
        osc.connect(gain);
        gain.connect(context.destination);
        return { osc, gain };
    });

    const schedule = (noteTime = 0) => {
        while ((noteTime < context.currentTime + 0.5) && buffer.length > 0) {
            const tone = buffer.splice(0, 1)[0];
            scheduleNote(noteTime, tone);
            noteTime += tone.duration;
        }
        if (buffer.length > 0) {
            setTimeout(() => schedule(noteTime), 0);
        } else {
            outputs.map(out => out.osc.stop(noteTime));
        }
    };

    const scheduleNote = (time, tone) => {
        tone.chord.map((freq, i) => {
            outputs[i].osc.frequency.cancelScheduledValues(time);
            if (!freq) {
                outputs[i].osc.frequency.setValueAtTime(0, time);
            } else {
                outputs[i].osc.frequency.setValueAtTime(freq, time);
            }
        });
    };

    outputs.map(out => out.osc.start(0));
    schedule(0);
};

const makeBuffer = (measures, strings) => {
    return measures.reduce((memo, m) => {
        const tones = [];

        Util.Range(0, m.notes[0].length).map(index => {
            const bar = m.notes[0][index].bar;
            const chord = strings.reduce((arr, string, sIndex) => {
                const note = m.notes[sIndex][index];
                const tone = getNoteFrequency(note, string);
                return arr.concat([tone]);
            }, []);

            const barFactor = bar.en / bar.de;
            const duration = m.tempo / 120 * barFactor * 2;
            tones.push({ chord, duration, tempo: m.tempo });
        });
        return memo.concat(tones);
    }, []);
};

const getMeasuresFrom = ({ measures, measure, instrument }) => {
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

    on(Actions.Play, (_, state) => {
        if (state.synth.playing) context.close();
        context = new AudioContext();

        const strings = state.instrument.tune.tones.split(' ');
        const subset = getMeasuresFrom(state);
        const buffer = makeBuffer(subset, strings);

        Scheduler(context, buffer, state.instrument);
    });

    on(Actions.Stop, (_, state, update) => {
        context.close();
        state.synth.playing = false;
        update(state);
    });
};
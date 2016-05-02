import { Util } from 'mva';
import { getNoteFrequency } from '../constants';
import * as Actions from '../actions/synth';

const Scheduler = (context, buffer, instrument, played, done) => {
    const strings = instrument.tune.tones.split(' ');

    const outputs = Util.Range(0, strings.length).map(() => {
        const osc = context.createOscillator();
        const gain = context.createGain();

        gain.gain.value = instrument.conf.gain;
        osc.connect(gain);
        gain.connect(context.destination);
        return { osc, gain };
    });

    const schedule = (noteTime = 0) => {
        while ((noteTime < context.currentTime + 0.5) && buffer.length > 0) {
            const tone = buffer.splice(0, 1)[0];
            const last = buffer.length == 0;
            scheduleNote(noteTime, context.currentTime, tone, last);
            noteTime += tone.duration;
        }
        if (buffer.length > 0) {
            setTimeout(() => schedule(noteTime), 0);
        }
    };

    const scheduleNote = (time, currentTime, tone, last) => {
        tone.chord.map((freq, i) => {
            outputs[i].osc.frequency.cancelScheduledValues(time);
            if (!freq) {
                outputs[i].osc.frequency.setValueAtTime(0, time);
            } else {
                outputs[i].osc.frequency.setValueAtTime(freq, time);
            }
        });
        const diff = time - currentTime;
        const delay = (diff > 0 ? diff : 0) * 1000;

        if (last) setTimeout(done, delay + (tone.duration * 1000));
        else setTimeout(() => { played(tone); }, delay);
    };

    outputs.map(out => out.osc.start(0));
    schedule(0);
};

const makeBuffer = (measures, strings) => {
    return measures.reduce((memo, m, mIndex) => {
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
            tones.push({ chord, duration, mIndex, index });
        });
        return memo.concat(tones);
    }, []);
};

const getMeasuresFrom = ({ measures, measure, instrument }) => {
    const iMeasures = measures.filter(m => m.iid === instrument.id);
    return iMeasures
        .filter(m => m.index >= measure.index)
        .sort((a, b) => a.index - b.index);
};

export default ({ init, on }) => {
    let context = null;
    let cancelEnd = false;

    init('synth', {
        playing: false,
        index: 0
    });

    on(Actions.Play, (_, state, update) => {
        const { synth, instrument } = state;
        const strings = instrument.tune.tones.split(' ');
        const subset = getMeasuresFrom(state);
        const buffer = makeBuffer(subset, strings);

        const played = tone => {
            const measure = subset[tone.mIndex];
            synth.index = tone.index;
            if (measure != state.measure) {
                update({ measure, synth });
            } else {
                update({ synth });
            }
        };

        const done = () => {
            if (!cancelEnd) {
                state.synth.playing = false;
                context.close();
                update(state);
            }
            cancelEnd = false;
        };

        context = new AudioContext();
        synth.playing = true;
        Scheduler(context, buffer, instrument, played, done);
        update({ synth });
    });

    on(Actions.Stop, (_, state, update) => {
        context.close();
        cancelEnd = true;
        state.synth.playing = false;
        update(state);
    });
};
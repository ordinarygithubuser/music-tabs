import { React, Util } from 'mva';
import { smBar, addBar } from '../../constants';
import { UpdateNote, CreateNote } from '../../actions/measure';

export default ({ measure, string }) => {
    const elements = [];
    const size = measure.notes.length;
    let bar = { en: 0, de: measure.bar.de };

    for (let i = 0; i < size && smBar(bar, measure.bar); i++) {
        const note = measure.notes[string][i];
        const currentBar = note ? note.bar : { en: 1, de: bar.de };

        const setNote = ({ target: { value } }) => {
            if (value == '' || Util.isNumber(value) && value > -1 && value < 25) {
                if (Util.isNumber(value)) value = parseInt(value, 10);
                if (note) UpdateNote({ note, value });
                else CreateNote({ string, index: i, value });
            }
        };

        bar = addBar(bar, currentBar);
        elements.push(<input
            key={i}
            value={note ? note.value: ''}
            onChange={setNote}
        />);
    }

    return <div className="string">
        {elements}
    </div>;
};
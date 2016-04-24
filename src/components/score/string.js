import { React, Util } from 'mva';
import { smBar, addBar } from '../../constants';
import { UpdateNote, CreateNote } from '../../actions/measure';

export default ({ measure, string }) => {
    const setNote = note => ({ target: { value } }) => {
        if (value == '' || Util.isNumber(value) && value > -1 && value < 25) {
            if (Util.isNumber(value)) value = parseInt(value, 10);
            UpdateNote({ note, value });
        }
    };

    const elements = measure.notes[string].map((note, i) => {
        const value = note.value != null ? note.value: '';
        return <input key={i} value={value} onChange={setNote(note)} />;
    });

    return <div className="string">
        {elements}
    </div>;
};
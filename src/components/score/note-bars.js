import { React, Util } from 'mva';
import { SetPopup } from '../../actions/flow';
import NoteBarPopup from '../popup/note-bar';

export default ({ measure, strings }) => {
    const elements = Util.Range(0, measure.bar.en).map(index => {
        let bar = { en: 1, de: measure.bar.de };
        Util.Range(0, strings).map(string => {
            const note = measure.notes[string][index];
            if (note) bar = note.bar;
        });

        const showNoteBarPopup = event => {
            const x = event.clientX, y = event.clientY;
            SetPopup({ Component: NoteBarPopup, data: { x, y, index } });
        };

        return <div className="bar" key={index} onClick={showNoteBarPopup}>
            <div className="en">{bar.en}</div>
            <div className="div"> </div>
            <div className="de">{bar.de}</div>
        </div>;
    });

    return <div className="bars">
        {elements}
    </div>;
};
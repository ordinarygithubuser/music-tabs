import { React, Util } from 'mva';
import { SetPopup } from '../../actions/flow';
import NoteBarPopup from '../popup/note-bar';

export default ({ measure }) => {
    const elements = measure.notes[0].map(note => {
        const showNoteBarPopup = event => {
            const x = event.clientX, y = event.clientY;
            SetPopup({ Component: NoteBarPopup, data: { x, y, index: note.index } });
        };

        return <div className="bar" key={note.index} onClick={showNoteBarPopup}>
            <div className="en">{note.bar.en}</div>
            <div className="div"> </div>
            <div className="de">{note.bar.de}</div>
        </div>;
    });

    return <div className="bars">
        {elements}
    </div>;
};
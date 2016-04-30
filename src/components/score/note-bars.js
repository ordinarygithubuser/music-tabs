import { React, Util } from 'mva';
import { SetPopup } from '../../actions/flow';
import NoteBarPopup from '../popup/note-bar';

export default ({ measure }) => {
    const elements = measure.notes[0].map(({ index, bar }) => {
        const showNoteBarPopup = event => {
            const x = event.clientX;
            const y = event.clientY;
            const last = measure.notes[0].length - 1;

            SetPopup({
                Component: NoteBarPopup,
                data: { x, y, index, last }
            });
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
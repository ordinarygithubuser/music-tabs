import { React } from 'mva';
import JoinPopup from '../popup/join';
import SplitPopup from '../popup/split';

import { SetPopup } from '../../actions/flow';

export default ({ measure, note }) => {
    const showNotePopup = popup => event => {
        const x = event.clientX;
        const y = event.clientY;
        const last = measure.notes[0].length - 1;

        SetPopup({
            Component: popup,
            data: { x, y, index: note.index, last }
        });
    };

    if (!note.index || !note.string) {
        return <div className="options">
            <i className="fa fa-plus disabled" title="Insert" />
            <i className="fa fa-minus disabled" title="Remove" />
            <div className="space"> </div>
            <i className="fa fa-chain disabled" title="Join" />
            <i className="fa fa-unlink disabled" title="Split" />
            <div className="space"> </div>
            <i className="fa fa-code-fork disabled" title="Effects" />
        </div>;
    }

    return <div className="options">
        <i className="fa fa-plus" title="Insert" />
        <i className="fa fa-minus" title="Remove" />
        <div className="space"> </div>
        <i className="fa fa-chain" onClick={showNotePopup(JoinPopup)} title="Join" />
        <i className="fa fa-unlink" onClick={showNotePopup(SplitPopup)} title="Split" />
        <div className="space"> </div>
        <i className="fa fa-code-fork" title="Effects" />
    </div>;
};
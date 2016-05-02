import { React } from 'mva';
import MeasurePopup from '../popup/measure';
import LoopPopup from '../popup/loop';

import * as EditActions from '../../actions/edit';
import { SetPopup } from '../../actions/flow';

export default ({ measure, edit }) => {
    const create = event => {
        const x = event.clientX, y = event.clientY;
        SetPopup({ Component: MeasurePopup, data: { x, y, measure } });
    };

    const loop = event => {
        const x = event.clientX, y = event.clientY;
        SetPopup({ Component: LoopPopup, data: { x, y } });
    };

    const copy = () => EditActions.Copy(measure);

    const paste = () => {
        if (edit.copy) EditActions.Paste(measure);
    };

    const getPasteClass = () => {
        return edit.copy ? '' : 'disabled';
    };

    return <div className="options">
        <button onClick={create} title="Create Measure">
            <i className="fa fa-plus" />
        </button>
        <button onClick={copy} title="Copy Measure">
            <i className="fa fa-copy" />
        </button>
        <button className={getPasteClass()} onClick={paste} title="Paste Measure">
            <i  className="fa fa-paste"/>
        </button>
        <button onClick={loop} title="Loop">
            <i className="fa fa-refresh" />
        </button>
    </div>;
}
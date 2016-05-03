import { React } from 'mva';
import MeasurePopup from '../popup/measure';
import LoopPopup from '../popup/loop';
import TempoPopup from '../popup/tempo';
import BarPopup from '../popup/bar';

import * as Edit from '../../actions/edit';
import * as Measure from '../../actions/measure';
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

    const showBarPopup = event => {
        const x = event.clientX, y = event.clientY;
        const { en, de } = measure.bar;
        const data = { en, de, x, y, update: Measure.SetBar };
        SetPopup({ Component: BarPopup, data });
    };

    const showTempoPopup = event => {
        const x = event.clientX, y = event.clientY;
        const data = { tempo: measure.tempo, x, y, update: Measure.SetTempo };
        SetPopup({ Component: TempoPopup, data });
    };

    const copy = () => Edit.Copy(measure);

    const paste = () => {
        if (edit.copy) Edit.Paste(measure);
    };

    const getPasteClass = () => {
        return 'fa fa-paste' + (edit.copy ? '' : ' disabled');
    };

    if (!measure) {
        return <div className="options">
            <i className="fa fa-plus disabled" title="Create Measure"/>
            <i className="fa fa-minus disabled"title="Remove Measure" />
            <div className="space"> </div>
            <i className="fa fa-copy disabled" title="Copy Measure" />
            <i  className="fa fa-paste disabled" title="Paste Measure"/>

            <div className="space"></div>
            <i className="fa fa-refresh disabled" title="Loop"/>
            <i className="fa fa-bold disabled" title="Change Bar"/>
            <i className="fa fa-tachometer disabled" title="Change Tempo"/>
        </div>;
    }

    return <div className="options">
        <i className="fa fa-plus" onClick={create} title="Create Measure" />
        <i className="fa fa-minus" title="Remove Measure" />
        <div className="space"></div>
        <i className="fa fa-copy" onClick={copy} title="Copy Measure" />
        <i className={getPasteClass()} onClick={paste} title="Paste Measure"/>
        <div className="space"></div>
        <i className="fa fa-refresh" onClick={loop} title="Loop" />
        <i className="fa fa-bold" onClick={showBarPopup} title="Change Bar" />
        <i className="fa fa-tachometer" onClick={showTempoPopup} title="Change Tempo" />
    </div>;
}
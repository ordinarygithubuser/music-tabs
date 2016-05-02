import { React, Util } from 'mva';
import BarPopup from '../popup/bar';
import { SetBar } from '../../actions/measure';
import { SetPopup } from '../../actions/flow';

export default ({ measure, strings, enabled }) => {
    const height = (strings.length) * 26;
    const style = { height };
    const enPos = { top: ((height + 52) / 2) * -1 };
    const dePos = { top: ((height + 52) / 2) * -1 };
    const { en, de } = measure.bar;

    const elements = Util.Range(0, strings.length).map(pos => {
        return <i key={pos} className="fake-string" />;
    });

    const showBarPopup = event => {
        if (!enabled) return;

        const x = event.clientX, y = event.clientY;
        const data = { en, de, x, y, update: SetBar };
        SetPopup({ Component: BarPopup, data });
    };

    return <div className="bar" style={style}>
        <div className="fake-strings">
            {elements}
            <div onClick={showBarPopup} className="en" style={enPos}>
                {en}
            </div>
            <div className="de" style={dePos}>
                {de}
            </div>
        </div>
    </div>;
};
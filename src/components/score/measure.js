import { React, Util } from 'mva';

import Bar from './bar';
import NoteBars from './note-bars';
import String from './string';
import MeasureMenu from '../menu/measure-menu';
import TempoPopup from '../popup/tempo';

import * as Actions from '../../actions/measure';
import { SetPopup } from '../../actions/flow';

const Input = (value, onAction) => {
    const onChange = ({ which }) => {
        console.log(which);
        onAction(which);
    };

    return <input value={value} onChange={onChange} />
};

export default class Measure extends React.Component {
    render () {
        const { index, instrument, measures, measure, selected, edit } = this.props;
        const strings = instrument.tune.tones.split(' ');
        const active = measure == selected ? 'active' : '';

        const style = {
            width: 45 + (30 * measure.notes[0].length),
            height: 75 + (strings.length * 26)
        };

        const elements = Util.Range(0, strings.length).map(string => {
            return <String
                key={string}
                string={string}
                measure={measure}
            />;
        });

        const select = () => {
            if (measure != selected) Actions.Select(measure);
        };

        const showTempoPopup = event => {
            const x = event.clientX, y = event.clientY;
            const data = { tempo: measure.tempo, x, y, update: Actions.SetTempo };
            SetPopup({ Component: TempoPopup, data });
        };

        return <div className={`measure ${active}`} style={style} onClick={select}>
            <MeasureMenu
                edit={edit}
                measures={measures}
                measure={measure}
            />
            <div className="head">
                <div className="index">{index}</div>
            </div>
            <div className="body">
                <Bar
                    measure={measure}
                    strings={strings}
                />
                <div className="strings">
                    {elements}
                </div>
            </div>
            <div className="foot">
                <div className="tempo" onClick={showTempoPopup}>{measure.tempo}</div>
                <NoteBars measure={measure} />
            </div>
        </div>;
    };
};
import { React, Util } from 'mva';

import String from './string';

import * as Actions from '../../actions/measure';
import { SetPopup } from '../../actions/flow';

const Bar = ({ measure, strings }) => {
    const height = (strings.length) * 26;
    const style = { height };
    const enPos = { top: ((height + 52) / 2) * -1 };
    const dePos = { top: ((height + 52) / 2) * -1 };
    const { en, de } = measure.bar;

    const elements = Util.Range(0, strings.length).map(pos => {
        return <i key={pos} className="fake-string" />;
    });

    return <div className="bar" style={style}>
        <div className="fake-strings">
            {elements}
            <div className="en" style={enPos}>{en}</div>
            <div className="de" style={dePos}>{de}</div>
        </div>
    </div>;
};

const NoteBars = ({ measure }) => {
    const elements = measure.notes[0].map(({ index, bar }) => {
        return <div className="bar" key={index}>
            <div className="en">{bar.en}</div>
            <div className="div"> </div>
            <div className="de">{bar.de}</div>
        </div>;
    });

    return <div className="bars">
        {elements}
    </div>;
};

const Strings = ({ strings, measure, selected, synth, note }) => {
    const elements = Util.Range(0, strings.length).map(string => {
        return <String
            key={string}
            note={note}
            string={string}
            measure={measure}
            selected={selected}
            synth={synth}
        />;
    });

    return <div className="strings">
        {elements}
    </div>;
};

export default class Measure extends React.Component {
    constructor (props) {
        super(props);
        this.state = { measure: props.selected };
    }

    shouldComponentUpdate (nextProps) {
        const { measure, selected } = this.props;
        return !measure || !selected || nextProps.selected.id == measure.id || selected.id == measure.id;
    }

    render () {
        const { instrument, measure, selected} = this.props;
        const active = selected && measure.id == selected.id ? 'active' : '';
        const strings = instrument.tune.tones.split(' ');

        const style = {
            width: 45 + (30 * measure.notes[0].length),
            height: 50 + (strings.length * 26)
        };


        const select = () => Actions.Select(measure);

        return <div className={`measure ${active}`} style={style} onClick={select}>
            <div className="head">
                <div className="index">{measure.index + 1}</div>
            </div>
            <div className="body">
                <Bar measure={measure} strings={strings} />
                <Strings {...this.props} strings={strings} />
            </div>
            <div className="foot">
                <div className="tempo">{measure.tempo}</div>
                <NoteBars measure={measure} />
            </div>
        </div>;
    };
};
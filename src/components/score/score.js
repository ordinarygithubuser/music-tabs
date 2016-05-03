import { React, ReactDOM } from 'mva';

import Measure from './measure';
import NoteMenu from '../menu/note-menu';
import MeasureMenu from '../menu/measure-menu';

const Title = ({ project, instrument }) => {
    const pName = project ? project.name : '';
    const iName = instrument && instrument.tune ? ' - ' + instrument.name : '';
    return <h2>{pName + iName}</h2>;
};

const Menu = ({ measure, note, edit }) => {
    return <div className="score-menu">
        <MeasureMenu edit={edit} measure={measure} />
        <div className="sep"> </div>
        <NoteMenu measure={measure} note={note} />
    </div>;
};

class Sheet extends React.Component {
    constructor (props) {
        super(props);
    }

    componentDidUpdate(prevProps) {
        if (this.props.measure != prevProps.measure) {
            const component = this.refs.active;
            const node = ReactDOM.findDOMNode(component);
            if (node) node.scrollIntoViewIfNeeded();
        }
    }

    render () {
        const { instrument, measures, measure, synth, note } = this.props;
        if (!instrument) return <noscript />;

        const getRef = m => {
            return (measure && m.id == measure.id) ? 'active' : 'm' + m.id;
        };

        const elements = measures.filter(m => {
            return m.iid == instrument.id;
        }).sort((a, b) => {
            return a.index - b.index;
        }).map(m => <Measure
            key={m.id}
            ref={getRef(m)}
            note={note}
            synth={synth}
            measure={m}
            selected={measure}
            instrument={instrument}
        />);

        return <div className="sheet" ref="sheet">
            {elements}
        </div>;
    }
}

export default state => {
    if (!state.project) return <noscript />;

    return <div className="score">
        <Title {...state }/>
        <Menu {...state} />
        <Sheet {...state} />
    </div>
};
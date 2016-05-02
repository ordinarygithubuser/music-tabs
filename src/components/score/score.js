import { React, ReactDOM } from 'mva';

import Measure from './measure';

const Title = ({ project, instrument }) => {
    const pName = project ? project.name : '';
    const iName = instrument && instrument.tune ? ' - ' + instrument.name : '';
    return <h2>{pName + iName}</h2>;
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
        const { instrument, measures, measure, edit, synth, note } = this.props;
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
            edit={edit}
            note={note}
            synth={synth}
            measure={m}
            selected={measure}
            measures={measures}
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
        <Sheet {...state} />
    </div>
};
import { React } from 'mva';
import { SelectTrack } from '../../actions/measure';

export default ({ instrument, measures, measure }) => {
    const getClass = m => {
       return 'unit' + (measure && measure.id == m.id ? ' active' : '');
    };

    const elements = measures.filter(m => {
        return m.iid == instrument.id;
    }).sort((a, b) => {
        return a.index - b.index;
    }).map((m, i) => <i key={i}
        className={getClass(m)}
        onClick={() => SelectTrack({ measure: m, instrument })}
    />);

    return <div className="track">
        {elements}
    </div>;
};
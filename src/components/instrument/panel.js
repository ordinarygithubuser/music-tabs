import { React } from 'mva';
import Track from './track';
import { Select } from '../../actions/instrument';

export default ({ project, instrument, instruments, measures, measure }) => {
    if (!project) return <div className="instrument-panel"></div>;

    const rows = instruments.filter(i => {
        return i.pid == project.id;
    }).map(i => {
        const select = () => Select(i);
        const className = instrument && instrument.id == i.id ? 'active' : '';

        return <tr key={i.id} className={className}>
            <td onClick={select}>{i.type}</td>
            <td onClick={select}>{i.name}</td>
            <td onClick={select} title={i.tune.tones}>{i.tune.name}</td>
            <td><Track
                measures={measures}
                measure={measure}
                instrument={i}
            /></td>
        </tr>
    });

    if (!instrument) return <noscript />

    return <div className="instrument-panel">
        <table>
            <thead>
                <tr>
                    <th>Type</th>
                    <th>Name</th>
                    <th>Tuning</th>
                    <th>Track</th>
                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>
    </div>;
};
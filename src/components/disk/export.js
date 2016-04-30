import { React } from 'mva';
import { Export } from '../../actions/flow';

import FileBrowser from './file-browser';

class ExportDialog extends React.Component {
    constructor (props) {
        super(props);
        this.state = { name: '' };
    }
    render () {
        const { name } = this.state;
        const { close, disk } = this.props;

        const onClick = () => {
            if (name) {
                Export(name);
                close();
            }
        };

        const className = name.length > 0 ? 'primary' : 'disabled';
        const setName = e => this.setState({ name: e.target.value });

        return <div className="form export">
            <div className="row">
                <label>Filename</label>
                <input value={name} onChange={setName} />
            </div>
            <div className="row">
                <label>Filepath</label>
                <FileBrowser disk={disk} error={disk.err} />
            </div>
            <button className={className} onClick={onClick}>
                Export
            </button>
        </div>;
    }
}


export default {
    Component: ExportDialog,
    title: 'Export Database'
}
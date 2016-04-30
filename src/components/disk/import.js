import { React } from 'mva';
import { Import } from '../../actions/flow';

import FileBrowser from './file-browser';

class ImportDialog extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            wait: false,
            error: null,
            file: props.file
        };
    }

    componentDidUpdate () {
        if (this.props.disk.file != this.state.file) {
            this.setState({ file: this.props.disk.file, error: null });
        }
    }

    render () {
        const { disk, close } = this.props;
        const { wait, error } = this.state;
        const isFile = obj => disk.file && !disk.file.dir;
        const className =  isFile() ? 'primary' : 'disabled';

        const onLoaded = error => {
            this.setState({ wait: false, error });
            if (!error) close();
        };

        const onClick = () => {
            this.setState({ wait: true });
            if (isFile) Import(onLoaded);
        };

        const Wait = () => {
            if (!wait) return <noscript />;
            return <div className="waiting"></div>
        };

        return <div className="form import">
            <Wait />
            <div className="row">
                <label>File</label>
                <FileBrowser disk={disk} error={error} />
            </div>
            <button className={className} onClick={onClick}>
                Import
            </button>
        </div>;
    }
}


export default {
    Component: ImportDialog,
    title: 'Import Database'
}

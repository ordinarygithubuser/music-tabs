import { React } from 'mva';
const remote = require('electron').remote;

export default () => {
    const max = () => remote.getCurrentWindow().maximize();
    const min = () => remote.getCurrentWindow().minimize();
    const close = () => remote.getCurrentWindow().close();

    return <div className="window-options">
        <i
            className="fa fa-minus"
            onClick={min}
            title="Minimize Window"
        />
        <i
            className="fa fa-plus"
            onClick={max}
            title="Maximize Window"
        />
        <i
            className="fa fa-times close"
            onClick={close}
            title="Close Application"
        />
    </div>;
};
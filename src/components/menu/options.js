import { React, Accordion } from 'mva';

import { ClearStorage } from '../../actions/flow';

const Clear = () => <div>
    <p>
        This clears the internal database and the whole
        current loaded data. All data will be lost and
        can only be restored via an import of a backup.
    </p>
    <button onClick={ClearStorage}>Clear</button>
</div>;

const Export = () => <div>
    <p>
        Exports the current internal state as a JSON file.
    </p>
    <button onClick={() => {}}>Export...</button>
</div>;

const Import = () => <div>
    <p>
        Imports a previously saved JSON backup. The current
        internal state will be cleared.
    </p>
    <button onClick={() => {}}>Import...</button>
</div>;

const DevOptions = () => {
    const items = [{
        name: 'Clear Storage',
        body: Clear
    }, {
        name: 'Export Data',
        body: Export
    }, {
        name: 'Import Data',
        body: Import
    }];

    return <div className="form dev-options">
        <Accordion items={items} />
    </div>;
};

export default {
    Component: DevOptions,
    title: 'Developer Options'
}
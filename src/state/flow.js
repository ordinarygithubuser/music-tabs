import fs from 'fs';
import path from 'path';
import * as Actions from '../actions/flow';

export default ({ init, on, persist }) => {
    init('dialog', null);
    init('popup', null);

    on(Actions.SetDialog, (dialog, state, update) => {
        update({ dialog });
    });

    on(Actions.SetPopup, (popup, state, update) => {
        update({ popup });
    });

    on(Actions.ClearStorage, (_, state, update) => {
        localStorage.clear();
        state.projects = [];
        state.instruments = [];
        state.measures = [];
        state.edit.copy = null;

        state.project = null;
        state.instrument = null;
        state.measure = null;
        state.dialog = null;

        update(state);
    });

    on(Actions.Export, (name, state) => {
        const { projects, instruments, measures, disk } = state;
        const file = path.join(disk.dir, name);
        const data = { projects, instruments, measures };
        const content = JSON.stringify(data, null, 4);

        fs.writeFile(file, content, err => {
            if (err) console.log(err);
        });
    });

    on(Actions.Import, (loaded, state) => {
        const { dir, file } = state.disk;
        fs.readFile(path.join(dir, file.name), 'utf-8', (err, content) => {
            if (err) return console.log(err);

            try {
                const data = JSON.parse(content);
                state = Object.assign(state, data);
                persist(state);
                loaded();
            } catch (e) {
                loaded('Invalid or corrupt file.');
            }
        });
    });
};
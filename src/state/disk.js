import * as Actions from '../actions/disk';

import path from 'path'
import os from 'os';
import fs from 'fs';

const ERR = 'Not enough permissions.';

const read = (root, done) => {
    fs.readdir(root, (err, files) => {
        if (err) return done(err);

        files = files.filter(file => {
            return file.charAt(0) != '.';
        }).map(file => {
            try {
                const p = path.join(root, file);
                const isDir = fs.statSync(p).isDirectory();
                return { name: file, dir: isDir };
            } catch (e) {
                err = true;
            }
        });
        done(err, files);
    });
};

export default ({ init, on }) => {
    const makeState = (dir, files, err = null) => {
        return { dir, files, file: files[0], err };
    };

    read(os.homedir(), (err, files) => {
        init('disk', makeState(os.homedir(), files));
    });

    on(Actions.Select, (file, state, update) => {
        state.disk.file = file;
        update(state);
    });

    on(Actions.Read, (file, { disk }, update) => {
        const fullPath = path.join(disk.dir, file.name);

        if (file.dir) {
            read(fullPath, (err, files) => {
                if (!err) update({ disk: makeState(fullPath, files) });
                else update({ disk: makeState(disk.dir, disk.files, ERR) });
            });
        }
    });

    on(Actions.Back, (file, { disk }, update) => {
        const fullPath = path.join(disk.dir, '../');

        if (fullPath) {
            read(fullPath, (err, files) => {
                if (!err) update({ disk: makeState(fullPath, files) });
            });
        }
    });

    on(Actions.Write, (fileName, state) => {

    });
};
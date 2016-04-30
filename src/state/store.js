import { Store } from 'mva';

import Flow from './flow';
import Disk from './disk';
import Edit from './edit';
import Synth from './synth';
import Project from './project';
import Measure from './measure';
import Instrument from './instrument';

module.exports = Store([
    Flow, Edit, Disk, Synth,
    Project, Measure, Instrument
]);
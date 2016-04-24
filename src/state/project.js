import * as Actions from '../actions/project';
import { Project } from './model';

export default ({ init, on }) => {
    init('projects', []);
    init('project', null);

    on(Actions.Create, (data, state, update) => {
        state.project = Project(data, state);
        state.projects.push(state.project);
        state.instrument = null;
        state.measure = null;
        state.synth.playing = false;
        state.synth.audio = null;
        update(state);
    });

    on(Actions.Select, (project, state, update) => {
        const instrument = state.instruments.filter(i => i.pid == project.id)[0];
        update({ project, instrument });
    });

    Actions.Create({ name: 'Bolero', author: 'Anon' });
};
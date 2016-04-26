import * as Actions from '../actions/project';
import { Project } from './model';

export default ({ load, persist, on }) => {
    load('projects', []);
    load('project', null);

    on(Actions.Create, (data, state) => {
        state.project = Project(data, state.projects.length);
        state.projects.push(state.project.id);
        state.instrument = null;
        state.measure = null;
        state.synth.playing = false;
        state.synth.audio = null;
        persist(state);
    });

    on(Actions.Select, (project, state) => {
        const instrument = state.instruments.filter(i => i.pid == project.id)[0];
        persist({ project, instrument });
    });
};
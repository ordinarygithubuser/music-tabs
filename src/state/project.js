import * as Actions from '../actions/project';
import { Project } from './model';

export default ({ load, persist, on }) => {
    load('projects', []);
    load('project', null);

    on(Actions.Create, (data, state) => {
        state.project = Project(data, state.projects.length);
        state.projects.push(state.project);
        state.instrument = null;
        state.measure = null;
        state.synth.playing = false;
        state.synth.audio = null;
        persist(state);
    });

    on(Actions.Update, (data, state) => {
        const project = state.project;
        project.name = data.name;
        project.author = data.author;
        const projects = state.projects.map(p => {
            return p.id == project.id ? project: p;
        });
        persist({ projects, project });
    });

    on(Actions.Remove, (_, state) => {
        let measures = [];
        const removedInsts = [];
        const project = state.project || { id: -1 };
        const projects = state.projects.filter(project => {
            return project.id != state.project.id;
        });
        const instruments = state.instruments.filter(i => {
            if (i.pid == project.id) {
                removedInsts.push(i);
                return false;
            }
        });
        removedInsts.map(i => {
            measures = measures.filter(m => m.iid !== i.id);
        });
        persist({
            instruments,
            instrument: null,
            measures,
            measure: null,
            projects,
            project: null
        });
    });

    on(Actions.Select, (project, state) => {
        const instrument = state.instruments.filter(i => i.pid == project.id)[0];
        persist({ project, instrument });
    });
};
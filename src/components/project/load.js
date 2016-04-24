import { React } from 'mva';

import { Select } from '../../actions/project';

class LoadProject extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            active: props.project
        };
    }

    render () {
        const { active } = this.state;
        const loadClass = active ? 'primary' : 'disabled';
        const load = () => {
            if (active) {
                Select(active);
                this.props.close();
            }
        };

        let elements = this.props.projects.map((project) => {
            const onClick = () => this.setState({ active: project });
            const className = active && active.id == project.id ? 'active' : '';

            return <li key={project.id} className={className} onClick={onClick}>
                {`${project.name} (${project.author})`}
            </li>;
        });

        if (elements.length == 0) {
            elements = <li className="empty">No Projects found.</li>;
        }

        return <div>
            <ul className="list">{elements}</ul>
            <button className={loadClass} onClick={load}>
                Load
            </button>
        </div>;
    }
}

export default {
    Component: LoadProject,
    title: 'Load Project'
};
import { React } from 'mva';

import { Create } from '../../actions/project';

export default class CreateProject extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            name: 'Overture No. 1',
            author: 'Anonymous'
        };
    }

    render () {
        const setField = key => e => {
            this.setState({ [key]: e.target.value });
        };

        const create = () => {
            if (this.state.name) {
                Create(this.state);
                this.props.close();
            }
        };

        return <div>
            <div className="row">
                <label>Name</label>
                <input
                    value={this.state.name}
                    onChange={setField('name')}
                />
            </div>
            <div className="row">
                <label>Author</label>
                <input
                    value={this.state.author}
                    onChange={setField('author')}
                />
            </div>
            <div className="buttons">
                <button className="primary" onClick={create}>
                    Create
                </button>
            </div>
        </div>;
    }
}

export default {
    Component: CreateProject,
    title: 'Create Project'
}
import { React } from 'mva';

import { Create, Update } from '../../actions/project';

export default (type) => {
    const typeName = type.charAt(0).toUpperCase() + type.slice(1);

    class UpdateProject extends React.Component {
        constructor (props) {
            super(props);

            if (props.dialogType == 'edit') {
                this.state = {
                    name: props.project.name,
                    author: props.project.author
                };
            } else {
                this.state = {
                    name: 'Overture No. 1',
                    author: 'Anonymous'
                };
            }
        }

        render () {
            const setField = key => e => {
                this.setState({ [key]: e.target.value });
            };

            const action = () => {
                if (this.state.name) {
                    if (this.props.dialogType == 'edit') {
                        Update(this.state);
                    } else {
                        Create(this.state);
                    }
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
                    <button className="primary" onClick={action}>
                        {typeName}
                    </button>
                </div>
            </div>;
        }
    }

    return {
        Component: UpdateProject,
        title: typeName + ' Project',
        type: type
    };
}
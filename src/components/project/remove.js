import { React } from 'mva';

import { Remove } from '../../actions/project';

const DeleteProject = ({ project, close }) => {
    const remove = () => {
        Remove();
        close();
    };

    return <div>
        <p>Are you sure to delete the Project <b>{project.name}</b>?</p>
        <button className="primary" onClick={remove}>Yes</button>
        <button onClick={() => close()}>No</button>
    </div>;
};

export default {
    Component: DeleteProject,
    title: 'Delete Project'
}
import { React } from 'mva';
import { Select, Read, Back } from '../../actions/disk';

const Error = ({ error }) => {
    if (!error) return <noscript />;

    return <div className="row error">
        <i className="fa fa-exclamation-triangle" />
        <span>{error}</span>
    </div>;
};

export default ({ disk: { files, file, dir }, error }) => {
    const elements = files.map((f, i) => {
        const className = file && file.name == f.name ? 'active' : '';
        const select = () => Select(f);
        return <li title={f.name} key={i} className={className} onClick={select}>
            {f.name}
        </li>;
    });

    const open = () => {
        if (file) Read(file);
    };

    let openClass = file.dir ? '' : 'disabled';

    return <div className="file-browser">
        <input className="path" title={dir} value={dir} disabled={true}/>
        <ul className="files">{elements}</ul>
        <Error error={error} />
        <div className="options">
            <button className={openClass} onClick={open}>Open</button>
            <button onClick={Back}>Back</button>
        </div>
    </div>
};
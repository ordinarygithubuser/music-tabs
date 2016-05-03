import { React, Util } from 'mva';
import { SplitNote, JoinNote } from '../../actions/measure';

// TODO: check if split num < 128
export default ({ index, close }) => {
    const splitTwo = () => {
        SplitNote({ index, times: 2 });
        close();
    };

    return <ul className="note-bar-options">
        <li onClick={splitTwo}><span className="num">2</span></li>
        <li ><span className="num" >3</span></li>
    </ul>;
};
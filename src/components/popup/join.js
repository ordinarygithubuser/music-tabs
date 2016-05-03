import { React, Util } from 'mva';
import { SplitNote, JoinNote } from '../../actions/measure';

// TODO: check if split num < 128
export default ({ index, last, close }) => {
    const joinLeft = () => {
        JoinNote({ from: index - 1, to: index });
        close();
    };

    const joinRight = () => {
        JoinNote({ from: index, to: index + 1 });
        close();
    };

    const JoinLeft = () => {
        if (index == 0) return <noscript />;
        return <li onClick={joinLeft}>
            <i className="fa fa-chevron-circle-left" />
        </li>;
    };

    const JoinRight = () => {
        if (last == index) return <noscript />;
        return <li onClick={joinRight}>
            <i className="fa fa-chevron-circle-right" />
        </li>;
    };

    return <ul className="note-bar-options">
        <JoinLeft />
        <JoinRight />
    </ul>;
};
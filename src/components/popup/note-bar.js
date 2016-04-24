import { React, Util } from 'mva';
import { SplitNote, JoinNote } from '../../actions/measure';

export default ({ index, close }) => {
    const joinLeft = () => {
        JoinNote({ from: index - 1, to: index });
        close();
    };

    const joinRight = () => {
        JoinNote({ from: index, to: index + 1 });
        close();
    };

    const splitTwo = () => {
        SplitNote({ index, times: 2 });
        close();
    };

    const JoinLeft = () => {
        if (index == 0) return <noscript />;
        return <li onClick={joinLeft}>Join Left</li>;
    };

    return <ul>
        <li onClick={splitTwo}>Split in Two</li>
        <li>Split in Three</li>
        <JoinLeft />
        <li onClick={joinRight}>Join Right</li>
    </ul>;
};
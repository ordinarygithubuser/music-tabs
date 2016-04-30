import { React, Util } from 'mva';
import { SplitNote, JoinNote } from '../../actions/measure';

// TODO: check if split num < 128
export default class NoteBar extends React.Component {
    render () {
        const { index, last, pos, close } = this.props;

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
            return <li><i
                className="fa fa-chevron-circle-left"
                onClick={joinLeft}
            /></li>;
        };

        const JoinRight = () => {
            if (last == index) return <noscript />;
            return <li><i
                className="fa fa-chevron-circle-right"
                onClick={joinRight}
            /></li>;
        };

        const getStyle = (ref, reverse) => {
            const style = { left: pos.width ? pos.width : 0 };

            if (pos.width && index >= last / 2) {
                style.left = -72;
                style.borderRadius = 4;
                style.borderTopRightRadius = 0;
                style.borderBottomRightRadius = 0;
                if (reverse) style.flexDirection = 'row-reverse';
            }
            return style;
        };

        if (!pos) return <noscript />;

        return <ul className="note-bar-options">
            <li>
                <div className="name">Split</div>
                <ul className="split" ref="split" style={getStyle(true)}>
                    <li onClick={splitTwo}><span className="num">2</span></li>
                    <li ><span className="num" >3</span></li>
                </ul>
            </li>
            <li>
                <div className="name">Join</div>
                <ul className="join" ref="join" style={getStyle()}>
                    <JoinLeft />
                    <JoinRight />
                </ul>
            </li>
        </ul>;
    }
};
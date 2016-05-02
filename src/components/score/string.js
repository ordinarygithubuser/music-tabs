import { React, Util } from 'mva';
import { UpdateNote, CreateNote, SetNote } from '../../actions/measure';

const getArrow = key  => {
    switch (key) {
        case 37: return 'left';
        case 38: return 'top';
        case 39: return 'right';
        case 40: return 'down';
    }
};

class Note extends React.Component {
    shouldComponentUpdate (nextProps) {
        const { selected, note, active, string } = this.props;

        return active || nextProps.active ||
               (nextProps.selected.index == note.index &&
               nextProps.selected.string == string ||
               selected && selected.index == note.index &&
               selected.string == string);
    }

    componentDidUpdate () {
        const { note, selected, string } = this.props;

        if (string == selected.string && selected.index == note.index) {
            this.refs.note.focus();
        }
    }

    render () {
        const { active, note, string, selected, measure, onKey, onChange } = this.props;

        const onFocus = () => {
            if (string != selected.string || selected.index != note.index) {
                SetNote({ measure, string, index: note.index });
            }
        };

        return <input ref="note"
            className={active ? 'active' : ''}
            value={note.value != null ? note.value: ''}
            onKeyDown={onKey}
            onFocus={onFocus}
            onChange={onChange}
        />;
    }
}

export default class MesureString extends React.Component {
    render () {
        const { measure, selected, string, synth, note } = this.props;
        const notes = measure.notes[string];
        const isActive = measure && selected && measure.id == selected.id;
        const isPlaying = index => synth.playing && synth.index == index;

        const onKey = index => ({ keyCode }) => {
            const arrow = getArrow(keyCode);

            if (!synth.playing && arrow) {
                switch (arrow) {
                    case 'right': return SetNote({ measure, index: index + 1 });
                    case 'left':  return SetNote({ measure, index: index - 1 });
                    case 'top':   return SetNote({ measure, string: string - 1 });
                    case 'down':  return SetNote({ measure, string: string + 1 });
                }
            }
        };

        const updateNote = note => ({ target: { value } }) => {
            if (!synth.playing && value == '' || Util.isNumber(value) && value < 25) {
                if (Util.isNumber(value)) value = parseInt(value, 10);
                UpdateNote({ note, value });
            }
        };

        const elements = notes.map((n, i) => {
            return <Note
                key={i}
                note={n}
                selected={note}
                string={string}
                measure={measure}
                active={isActive && isPlaying(i)}
                onKey={onKey(i)}
                onChange={updateNote(n)}
            />
        });

        return <div className="string">{elements}</div>;
    }
};
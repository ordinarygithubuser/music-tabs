import { React, ComboBox } from 'mva';
import { Strings, Instruments, Tunings } from '../../constants';
import { Create } from '../../actions/instrument';

class CreateInstrument extends React.Component {
    constructor (props) {
        super(props);
        const type = Instruments[0];
        const strings = Strings[Instruments[0]][0];
        const tune = Tunings[type][strings][0];

        this.state = {
            name: 'Awesome Musician',
            type, tune, strings
        };
    }

    render () {
        const { name, type, tune, strings } = this.state;

        const create = () => {
            Create(this.state);
            this.props.close();
        };

        const setField = key => e => {
            this.setState({ [key]: e.target.value });
        };

        const setInstrument = type => {
            const strings = Strings[type][0];
            this.setState({ type, strings, tune: Tunings[type][strings][0] });
        };

        const setStrings = strings => {
            const { type } = this.state;
            this.setState({ strings, tune: Tunings[type][strings][0]})
        };

        const setTune = name => {
            const tune = Tunings[type][strings].filter(t => t.name == name)[0];
            this.setState({ tune });
        };

        return <div>
            <div className="row">
                <label>Name</label>
                <input
                    value={name}
                    onChange={setField('name')}
                />
            </div>
            <div className="row">
                <label>Instrument</label>
                <ComboBox
                    item={type}
                    items={Instruments}
                    select={setInstrument}
                />
            </div>
            <div className="row">
                <label>Strings</label>
                <ComboBox
                    item={strings}
                    items={Strings[type]}
                    select={setStrings}
                />
            </div>
            <div className="row">
                <label>Tuning</label>
                <ComboBox
                    item={tune.name}
                    items={Tunings[type][strings].map(tune => tune.name)}
                    select={setTune}
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
    Component: CreateInstrument,
    title: 'Create Instrument'
}
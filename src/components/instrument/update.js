import { React, ComboBox } from 'mva';
import { Strings, Instruments, Tunings } from '../../constants';
import { Create, Update } from '../../actions/instrument';

export default type => {
    const typeName = type.charAt(0).toUpperCase() + type.slice(1);

    class UpdateInstrument extends React.Component {
        constructor (props) {
            super(props);

            let name = 'Awesome Musician';
            let type = Instruments[0];
            let strings = Strings[Instruments[0]][0];
            let tune = Tunings[type][strings][0];

            if (props.dialogType == 'edit') {
                name = props.instrument.name;
                type = props.instrument.type;
                strings = props.instrument.strings;
                tune = props.instrument.tune;
            }

            this.state = { name, type, tune, strings };
        }

        render () {
            const { name, type, tune, strings } = this.state;

            const fireAction = () => {
                if (this.props.dialogType == 'edit') {
                    Update(this.state);
                } else {
                    Create(this.state);
                }
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
                    <button className="primary" onClick={fireAction}>
                        {typeName}
                    </button>
                </div>
            </div>;
        }
    }

    return {
        Component: UpdateInstrument,
        title: typeName + ' Instrument',
        type: type
    };
}
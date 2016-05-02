import { React } from 'mva'
import { SetAttributes } from '../../actions/instrument';

class InstrumentConf extends React.Component {
    constructor (props) {
        super(props);
        this.state = props.instrument.conf || { gain: 0.2 };
    }

    render () {
        const { gain } = this.state;

        const saveState = () =>{
            SetAttributes(this.state);
            this.props.close();
        };

        const setAttr = field => e => {
            this.setState({ [field]: e.target.value });
        };

        return <div className="form">
            <div className="row">
                <label>Gain</label>
                <input className="double" value={gain} onChange={setAttr('gain')}/>
            </div>
            <div className="buttons">
                <button className="primary" onClick={saveState}>
                    Ok
                </button>
            </div>
        </div>;
    }
}

export default {
    Component: InstrumentConf,
    title: 'Instument Configuration'
};
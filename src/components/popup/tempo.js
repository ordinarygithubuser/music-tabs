import { React, Util } from 'mva';

export default class TempoPopup extends React.Component {
    constructor (props) {
        super(props);
        this.state = { tempo: props.tempo };
    }

    render () {
        const setTempo = () => {
            this.props.update(this.state.tempo);
            this.props.close();
        };

        const updateTempo = ({ target: { value } }) => {
            if (Util.isNumber(value) && value > 0 && value < 300) {
                this.setState({ tempo: value });
            }
        };

        return <div className="form">
            <div className="row">
                <label>Tempo</label>
                <input
                    className="tempo-input"
                    value={this.state.tempo}
                    onChange={updateTempo}
                />
            </div>
            <button className="primary" onClick={setTempo}>
                Set
            </button>
        </div>;
    }
}
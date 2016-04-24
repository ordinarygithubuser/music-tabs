import { React, Util } from 'mva';

export default class BarPopup extends React.Component {
    constructor (props) {
        super(props);
        this.state = { en: props.en };
    }

    render () {
        const setSize = () => {
            this.props.update(this.state.en);
            this.props.close();
        };

        const updateSize = ({ target: { value } }) => {
            if (Util.isNumber(value) && value > 0 && value < 40) {
                this.setState({ en: value });
            }
        };

        return <div className="form">
            <div className="row">
                <label>Measure Bar</label>
                <input
                    className="en-input"
                    value={this.state.en}
                    onChange={updateSize}
                />
                <div className="de-output">
                    / {this.props.de}
                </div>
            </div>
            <button className="primary" onClick={setSize}>
                Set
            </button>
        </div>;
    }
}
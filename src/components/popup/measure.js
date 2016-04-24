import { React } from 'mva';
import Switch from '../switch';
import { Create } from '../../actions/measure';

const ITEMS = ['Before', 'After'];

export default class MeasurePopup extends React.Component {
    constructor (props) {
        super(props);
        this.state = { selected: ITEMS[1] };
    }

    render () {
        const { selected } = this.state;

        const create = () => {
            if (this.state.selected == ITEMS[0]) {
                Create({ pos: this.props.index });
            } else {
                Create({ pos: this.props.index + 1 });
            }
            this.props.close();
        };

        const onChange = item => {
            this.setState({ selected: item });
        };

        return <div className="form">
            <div className="row">
                <label>Insert</label>
                <Switch
                    items={ITEMS}
                    selected={selected}
                    onChange={onChange}
                />
            </div>
            <button className="primary" onClick={create}>Create</button>
        </div>;
    }
}
import { React } from 'mva';

import { Remove } from '../../actions/instrument';

const RemoveInstrument = ({ instrument, close }) => {
    const remove = () => {
        Remove();
        close();
    };

    return <div>
        <p>Are you sure to delete the Instrument <b>{instrument.type} ({instrument.name})</b>?</p>
        <button className="primary" onClick={remove}>Yes</button>
        <button onClick={() => close()}>No</button>
    </div>;
};

export default {
    Component: RemoveInstrument,
    title: 'Delete Instrument'
}
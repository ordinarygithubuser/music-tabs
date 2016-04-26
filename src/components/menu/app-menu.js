import remote from 'remote';
import { React } from 'mva';

import LoadProject from '../project/load';
import CreateProject from '../project/create';
import CreateInstrument from '../instrument/create';
import DevOptions from '../menu/options';

import * as SynthActions from '../../actions/synth';
import { SetDialog } from '../../actions/flow';

const Window = () => {
    const max = () => remote.getCurrentWindow().maximize();
    const min = () => remote.getCurrentWindow().minimize();
    const close = () => remote.getCurrentWindow().close();

    return <div className="window-options">
        <i
            className="fa fa-minus"
            onClick={min}
            title="Minimize Window"
        />
        <i
            className="fa fa-plus"
            onClick={max}
            title="Maximize Window"
        />
        <i
            className="fa fa-times close"
            onClick={close}
            title="Close Application"
        />
    </div>;
};

const MenuEntry = ({ name, active, actions, toggle }) => {
    const renderActions = () => {
        if (name != active) return <noscript />;

        const elements = actions.map((a, i) => {
            const className = a.active() ? '' : 'disabled';
            const onClick = () => {
                if (a.active()) {
                    a.method();
                    toggle(name);
                }
            };

            return <li key={i} className={className} onClick={onClick}>
                <i className={`fa fa-${a.icon}`} />
                <span>{a.name}</span>
            </li>;
        });
        return <ul>{elements}</ul>;
    };

    const className = name == active ? 'active' : '';
    const onClick = () => toggle(name);

    return <div className={`entry ${className}`} onClick={onClick}>
        <div className="title">{name}</div>
        {renderActions()}
    </div>
};

export default class Menu extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            active: null
        }
    };

    render () {
        const { project, instrument } = this.props;
        const { active } = this.state;
        const toggle = item => {
            if (item == active) item = null;
            this.setState({ active: item });
        };

        const PROJECT_ACTIONS = [
            {
                name: 'Load',
                icon: 'external-link',
                method: () => SetDialog(LoadProject),
                active: () => true
            }, {
                name: 'Create',
                icon: 'plus-circle',
                method: () => SetDialog(CreateProject),
                active: () => true
            }, {
                name: 'Delete',
                icon: 'trash-o',
                method: () => {},
                active: () => project
            }
        ];

        const INSTRUMENT_ACTIONS = [
            {
                name: 'Create',
                icon: 'plus-circle',
                method: () => SetDialog(CreateInstrument),
                active: () => project
            }, {
                name: 'Delete',
                icon: 'trash-o',
                method: () => {},
                active: () => instrument
            }
        ];

        const PLAYBACK_ACTIONS = [
            {
                name: 'Start',
                icon: 'play',
                method: SynthActions.Play,
                active: () => instrument
            }, {
                name: 'Stop',
                icon: 'stop',
                method: SynthActions.Stop,
                active: () => instrument
            }
        ];

        const OPTION_ACTIONS = [
            {
                name: 'Libraries',
                icon: 'book',
                method: () => {},
                active: () => true
            }, {
                name: 'Data',
                icon: 'database',
                method: () => SetDialog(DevOptions),
                active: () => true
            }
        ];

        return <div className="menu">
            <MenuEntry
                name="Project"
                active={active}
                toggle={toggle}
                actions={PROJECT_ACTIONS}
            />
            <MenuEntry
                name="Instrument"
                active={active}
                toggle={toggle}
                actions={INSTRUMENT_ACTIONS}
            />
            <MenuEntry
                name="Playback"
                active={active}
                toggle={toggle}
                actions={PLAYBACK_ACTIONS}
            />
            <MenuEntry
                name="Options"
                active={active}
                toggle={toggle}
                actions={OPTION_ACTIONS}
            />
            <i className="space" />
            <Window />
        </div>;
    }
}
import { React } from 'mva';

import Window from './window';
import LoadProject from '../project/load';
import UpdateProject from '../project/update';
import RemoveProject from '../project/remove';
import UpdateInstrument from '../instrument/update';
import RemoveInstrument from '../instrument/remove';
import InstrumentConf from '../instrument/conf';
import DataMenu from '../menu/data-menu';

import * as SynthActions from '../../actions/synth';
import { SetDialog } from '../../actions/flow';

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
        this.state = { active: null };
        this.checkFocus = this.checkFocus.bind(this);
    };

    componentDidMount () {
        document.addEventListener('click', this.checkFocus);
    }

    componentWillUnmount () {
        document.removeEventListener('click', this.checkFocus);
    }

    checkFocus (e) {
        if (!this.refs.menu.contains(e.target)) {
            this.setState({ active: null });
        }
    }

    render () {
        const { project, instrument, synth } = this.props;
        const { active } = this.state;
        const toggle = item => {
            if (item == active) item = null;
            this.setState({ active: item });
        };

        const PROJECT_ACTIONS = [
            {
                name: 'Open',
                icon: 'external-link',
                method: () => SetDialog(LoadProject),
                active: () => true
            }, {
                name: 'New',
                icon: 'plus-circle',
                method: () => SetDialog(UpdateProject('create')),
                active: () => true
            }, {
                name: 'Edit',
                icon: 'edit',
                method: () => SetDialog(UpdateProject('edit')),
                active: () => project
            }, {
                name: 'Delete',
                icon: 'trash-o',
                method: () => SetDialog(RemoveProject),
                active: () => project
            }
        ];

        const INSTRUMENT_ACTIONS = [
            {
                name: 'New',
                icon: 'plus-circle',
                method: () => SetDialog(UpdateInstrument('create')),
                active: () => project
            }, {
                name: 'Edit',
                icon: 'edit',
                method: () => SetDialog(UpdateInstrument('edit')),
                active: () => instrument
            }, {
                name: 'Effects',
                icon: 'cog',
                method: () => SetDialog(InstrumentConf),
                active: () => instrument
            }, {
                name: 'Delete',
                icon: 'trash-o',
                method: () => SetDialog(RemoveInstrument),
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
                active: () => synth.playing
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
                method: () => SetDialog(DataMenu),
                active: () => true
            }
        ];

        return <div className="menu" ref="menu">
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
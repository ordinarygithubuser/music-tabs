import { React } from 'mva';

export default class Popup extends React.Component {
    constructor (props) {
        super(props);
        this.state = { pos: {} };
        this.close = this.close.bind(this);
    }

    componentDidMount () {
        const pos = this.refs.popup.getBoundingClientRect();

        setTimeout(() => {
            document.addEventListener('click', this.close);
        }, 20);
        this.setState({ pos });
    }

    componentWillUnmount () {
        document.removeEventListener('click', this.close);
    }

    close ({ target }) {
        const popup = this.refs.popup;
        if (popup && !popup.contains(target)) {
            this.props.close();
        }
    }

    render () {
        const { Component, data, close } = this.props;
        const style = { left: data.x, top: data.y };

        return <div className="popup-wrapper">
            <div className="popup" ref="popup" style={style}>
                <Component {...data} pos={this.state.pos} close={close} />
            </div>
        </div>;
    }
}
import { React } from 'mva';

export default ({ items, selected, onChange }) => {
    const getClass = item => {
        return item == selected ? 'active' : '';
    };

    const onClick = item => () => {
        onChange(item);
    };

    const elements = items.map((item, i) => {
        return <li key={i} className={getClass(item)} onClick={onClick(item)}>{item}</li>;
    });

    return <ul className="switch">
        {elements}
    </ul>;
};
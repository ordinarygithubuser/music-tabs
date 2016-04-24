import React from 'react';

import { Dialog } from 'mva';
import Popup from './popup/popup';
import { SetDialog, SetPopup } from '../actions/flow';

import Menu from './menu/app-menu';
import Score from './score/score';
import Panel from './instrument/panel';

const renderPopup = popup => {
    if (!popup || !popup.Component) return <noscript />;
    return <Popup {...popup} close={() => SetPopup()} />
};

export default state => {
    return <div className="app">
        <Menu {...state} />
        <div className="main">
            <Score {...state}/>
            <Panel {...state} />
        </div>
        <Dialog
            data={state}
            dialog={state.dialog}
            close={() => SetDialog()}
        />
        {renderPopup(state.popup)}
    </div>;
}
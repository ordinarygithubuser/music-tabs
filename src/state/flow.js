import * as Actions from '../actions/flow';

export default ({ init, on }) => {
    init('dialog', null);
    init('popup', null);

    on(Actions.SetDialog, (dialog, state, update) => {
        update({ dialog });
    });

    on(Actions.SetPopup, (popup, state, update) => {
        update({ popup });
    });
};
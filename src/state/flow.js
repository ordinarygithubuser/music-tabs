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

    on(Actions.ClearStorage, (_, state, update) => {
        localStorage.clear();
        state.projects = [];
        state.instruments = [];
        state.measures = [];
        state.edit.copy = null;

        state.project = null;
        state.instrument = null;
        state.measure = null;
        state.dialog = null;

        update(state);
    });
};
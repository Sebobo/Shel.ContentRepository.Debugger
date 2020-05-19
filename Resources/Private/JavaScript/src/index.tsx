import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import memoize from 'lodash.memoize';
import { hot, setConfig } from 'react-hot-loader';
import { RecoilRoot } from 'recoil';

import { GraphApp } from './components';
import { GraphProvider, IntlProvider, AppThemeProvider, NotifyProvider } from './core';

const withDragDropContext = DragDropContext(HTML5Backend);
declare const module: any;
const GraphAppWithDnd = withDragDropContext(hot(module)(GraphApp));
setConfig({
    showReactDomPatchNotification: false
});

const loadPlugin = async (): Promise<void> => {
    const NeosApi = window.Typo3Neos;

    while (!NeosApi || !NeosApi.I18n.initialized) {
        await new Promise(resolve => setTimeout(resolve, 50));
    }
    const graphAppContainer: HTMLElement = document.getElementById('graphAppContainer');

    if (!graphAppContainer) {
        return;
    }

    const { actions } = JSON.parse(graphAppContainer.dataset.app);
    const { I18n, Notification } = NeosApi;

    const translate = memoize(
        (id, value = null, args = [], packageKey = 'Shel.ContentRepository.Debugger', source = 'Main') => {
            return I18n.translate(id, value, packageKey, source, args);
        }
    );

    ReactDOM.render(
        <IntlProvider translate={translate}>
            <NotifyProvider {...Notification}>
                <AppThemeProvider>
                    <RecoilRoot>
                        <GraphProvider actions={actions}>
                            <GraphAppWithDnd />
                        </GraphProvider>
                    </RecoilRoot>
                </AppThemeProvider>
            </NotifyProvider>
        </IntlProvider>,
        graphAppContainer
    );
};
window.addEventListener('load', loadPlugin, false);

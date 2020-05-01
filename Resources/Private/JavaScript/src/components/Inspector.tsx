import { NodeTypeProfile } from './index';
import * as React from 'react';
import { AppTheme, createUseAppStyles, useGraph } from '../core';

const useStyles = createUseAppStyles((theme: AppTheme) => ({
    inspector: {
        flex: `0 1 ${theme.size.sidebarWidth}`
    }
}));

export default function Inspector() {
    const classes = useStyles();
    const { selectedNodeTypeName } = useGraph();

    return <div className={classes.inspector}>{selectedNodeTypeName && <NodeTypeProfile />}</div>;
}

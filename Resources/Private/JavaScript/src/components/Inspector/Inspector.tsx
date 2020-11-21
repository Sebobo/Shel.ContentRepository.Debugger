import * as React from 'react';

import { AppTheme, createUseAppStyles, useGraph } from '../../core';
import { NodeTypeProfile } from './index';

const useStyles = createUseAppStyles((theme: AppTheme) => ({
    inspector: {
        flex: `0 1 ${theme.size.sidebarWidth}`
    }
}));

const Inspector = () => {
    const classes = useStyles();
    const { selectedNodeTypeName } = useGraph();

    return <div className={classes.inspector}>{selectedNodeTypeName && <NodeTypeProfile />}</div>;
};
export default React.memo(Inspector);

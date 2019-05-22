import * as React from 'react';
import { render } from 'react-dom';
import styled from 'styled-components';

import MainSplitter from './Components/Navigation/MainSplitter';

const Workspace: any = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%; 
    pointer-events: all;
`;

class Main extends React.Component<{}, {}> {
    render() {
        return (
            <Workspace className="workspace">
                <MainSplitter/>
            </Workspace>
        );
    }
}

export default class App {
    static boot(domElementId: string) {
        render(<Main/>, document.getElementById(domElementId));
    }
}
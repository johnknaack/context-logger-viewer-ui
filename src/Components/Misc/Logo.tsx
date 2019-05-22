import * as React from 'react';
import styled from 'styled-components';
const Package = require('../../../package.json');

export interface LogoProps {
    bubble?: any
}

var Wrap:any = styled.div`
    padding: 4px 4px 4px 56px;
    position: relative;
    flex: 1;
    font-size: 1.2em;
    font-weight: 900;
`;

var Image:any = styled.object`
    position: absolute;
    top: 4px;
    left: 4px;
    height: 46px;
`;

export default class Logo extends React.Component<LogoProps, {}> {
    render() {
        return (
            <Wrap>
                Context Log <br/>Viewer v{Package.version}
            </Wrap>
        );
    }
}
import * as React from 'react';
import Logo from './Logo';
import styled from 'styled-components';

export interface HeaderProps {
    bubble: any
}

var Wrap: any = styled.div`
    display: flex;
    flex-direction: column;
    height: 56px;
    margin-bottom: 4px;
    white-space: nowrap;
    overflow: hidden;
`;

export default class Header extends React.Component<HeaderProps, {}> {
    render() {
        return (
            <Wrap className="header">
                <Logo/>
            </Wrap>
        );
    }
}
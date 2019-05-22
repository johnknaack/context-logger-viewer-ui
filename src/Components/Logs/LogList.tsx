import * as React from 'react';
import styled from "styled-components";
import ContextLineItem from './ContextLineItem';

export interface LogListProps {
    logs: any
}

export interface LogListState {
}

var LogListElement: any = styled.div`
    padding: 4px;
`;

export default class LogList extends React.Component<LogListProps, LogListState> {
    constructor(props: any) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <LogListElement>
                { this.props.logs.map((contextGroup) => <ContextLineItem contextGroup={contextGroup} key={contextGroup.contextID} />) }
            </LogListElement>
        );
    }
}
import * as React from 'react';
import styled from "styled-components";

export interface LogEntryLineProps {
    logEntry: any
}

export interface LogEntryLineState {
}

var LogEntryLineElement: any = styled.div`
    padding: 4px 4px 4px 12px;
`;

export default class LogEntryLine extends React.Component<LogEntryLineProps, LogEntryLineState> {
    constructor(props: any) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <LogEntryLineElement>
                [{this.props.logEntry.level}] {this.props.logEntry.message} 
            </LogEntryLineElement>
        );
    }
}
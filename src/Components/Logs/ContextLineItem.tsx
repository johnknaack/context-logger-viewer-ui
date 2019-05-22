import * as React from 'react';
import styled from "styled-components";
import LogEntryLine from './LogEntryLine';

export interface ContextLineItemProps {
    contextGroup: any
}

export interface ContextLineItemState {
}

var ContextLineItemElement: any = styled.div`
    padding: 4px;
`;

export default class LogList extends React.Component<ContextLineItemProps, ContextLineItemState> {
    constructor(props: any) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <ContextLineItemElement>
                { this.props.contextGroup.contextID } <br/>
                { this.props.contextGroup.logs.map((logEntry, i) => <LogEntryLine logEntry={logEntry} key={i} />) }
                <br/>
                <br/>
            </ContextLineItemElement>
        );
    }
}
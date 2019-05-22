import * as React from 'react';
import styled from 'styled-components';
import LogList from './LogList';

export interface LogViewProps {
}

export interface LogViewState {
    logs: any
}

var LogViewElement: any = styled.div`
    padding: 4px;
`;

var GetLogsButtonElement: any = styled.button`
    text-decoration: none;
    cursor: pointer;
    display: inline-block;
`;

export default class LogView extends React.Component<LogViewProps, LogViewState> {
    constructor(props: any) {
        super(props);

        this.state = {
            logs: []
        }
    }

    static groupLogsByContext (logs) {
        const logsAsContextProperties =  logs.reduce((obj, log) => {
            !(obj[log.context.contextID]) && (obj[log.context.contextID] = []);
            obj[log.context.contextID].push(log);
            return obj;
        }, {});
        const logsAsArrayGroupedByContext = [];
        for (let id in logsAsContextProperties) {
            logsAsArrayGroupedByContext.push({
                contextID: id,
                logs: logsAsContextProperties[id]
            });
        }
        return logsAsArrayGroupedByContext;
    }

    onGetLogsClicked () {
        fetch('/getLogs')
            .then((response) => {
                return response.json();
            })
            .then((res) => {
                this.setState({
                    logs: LogView.groupLogsByContext(res.logs)
                });
            });
    }

    render() {
        return (
            <LogViewElement>
                <GetLogsButtonElement href='javascript:void(0)' onClick={this.onGetLogsClicked.bind(this)}>
                    Get Logs
                </GetLogsButtonElement>
                <LogList logs={this.state.logs}/>
            </LogViewElement>
        );
    }
}
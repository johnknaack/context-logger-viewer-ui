import * as React from 'react';
import JqxTabs from '../../Assets/jqwidgets-react/react_jqxtabs.js';
import RawLogsGrid from '../Grids/RawLogsGrid';

export default class LogsTab extends React.Component {
    static singleton;

    constructor (props) {
        super(props);
        // TODO Ensure there is only one copy of this grid
        LogsTab.singleton = this;

        this.state = {
            documents: []
        };
    }

    // TODO Should not be done here, use data source?
    getLogs() {
        fetch('/getLogs')
            .then((response) => {
                return response.json();
            })
            .then((res) => {
                this.refs.grid.updateDocuments(res.logs);
            });
    }

    render () {
        return (
            <JqxTabs
                ref='myTabs'
                width={'100%'}
                height={'100%'}
                theme={'fresh'}
            >
                <ul>
                    <li style={{marginLeft: "30px"}}>Raw Logs</li>
                    <li>Request Logs</li>
                    <li>System Logs</li>
                    <li>Analytics Logs</li>
                </ul>
                <div style={{overflow: 'hidden'}}>
                    <RawLogsGrid ref='grid' documents={this.state.documents}/>
                </div>
                <div style={{overflow: 'hidden'}}>
                    TODO
                </div>
                <div style={{overflow: 'hidden'}}>
                    TODO
                </div>
                <div style={{overflow: 'hidden'}}>
                    TODO
                </div>
            </JqxTabs>
        )
    }
}
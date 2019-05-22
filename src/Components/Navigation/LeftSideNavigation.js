import * as React from 'react';
import JqxNavigationBar from '../../Assets/jqwidgets-react/react_jqxnavigationbar.js';
import LogsTab from './LogsTab';

export default class LeftSideNavigation extends React.Component {
    static singleton;

    constructor(props) {
        super(props);
        // TODO Ensure there is only one copy of this grid
        LeftSideNavigation.singleton = this;
        this.state = {};
    }

    componentDidMount () {
        let getName = (index) => {
            switch (index) {
                case 0:
                    return 'Logs';
                case 1:
                    return 'Tab2';
                case 2:
                    return 'Tab3';
                case 3:
                    return 'Tab4';
            }
        };

        this.refs.jqxNavigationBar.on('expandedItem', (event) => {
            let text = getName(event.item);
            this.props.onChange && this.props.onChange(text);
        });
    }

    onStateChange(event) {
        this.setState({
            selectedStateIndex: event.target.value
        });
    }

    render () {
        return (
            <JqxNavigationBar
                ref={'jqxNavigationBar'}
                width={'100%'}
                height={'100%'}
                expandMode={'singleFitHeight'}
                theme={'fresh'}
            >
                <div>Logs</div>
                <div style={{padding: '8px'}}>
                    <br/>
                    <button style={{width: '100%'}} onClick={this.onGetLogsClicked.bind(this)}>Get Logs</button>
                </div>

                <div>Tab2</div>
                <div style={{padding: '8px'}}>
                    <br/>
                    <span>Not Implemented Yet</span>
                </div>

                <div>Tab3</div>
                <div style={{padding: '8px'}}>
                    <br/>
                    <span>Not Implemented Yet</span>
                </div>

                <div>Tab4</div>
                <div style={{padding: '8px'}}>
                    <br/>
                    <span>Not Implemented Yet</span>
                </div>

            </JqxNavigationBar>
        )
    };

    onGetLogsClicked() {
        LogsTab.singleton.getLogs(); // TODO Bad, should use data source
    }
}
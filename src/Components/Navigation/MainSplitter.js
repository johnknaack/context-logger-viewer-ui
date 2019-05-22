import * as React from 'react';
import JqxSplitter from '../../Assets/jqwidgets-react/react_jqxsplitter.js';
import Header from '../Misc/Header';
import LeftSideNavigation from './LeftSideNavigation';
import LogsTabs from './LogsTab';

export default class MainSplitter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: 'Logs'
        }
    }

    onChange (value) {
        this.setState({
            open: value
        });
    }

    render() {
        return (
            <JqxSplitter
                theme={'fresh'}
                ref='nestedSplitter'
                width={'100%'}
                height={'100%'}
                panels={[{ size: 242 }, { size: '100%' }]}
            >
                <div>
                    <JqxSplitter
                        theme={'fresh'}
                        ref='mainSplitter'
                        width={'100%'} height={'100%'}
                        orientation={'horizontal'}
                        panels={[{ size: 56 }, { size: '100%' }]}
                    >
                        <div className="splitter-panel">
                            <Header/>
                        </div>
                        <div className="splitter-panel">
                            <LeftSideNavigation onChange={this.onChange.bind(this)}/>
                        </div>
                    </JqxSplitter>
                </div>
                <div>
                    <div style={{height: '100%', display: this.state.open === 'Logs' ? 'block' : 'none'}} >
                        <LogsTabs/>
                    </div>
                </div>
            </JqxSplitter>
        )
    }
}
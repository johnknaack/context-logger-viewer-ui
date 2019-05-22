import * as React from 'react';
import JqxGrid from '../../Assets/jqwidgets-react/react_jqxgrid.js';
import UUID from '../Misc/UUID';

// TODO Convert file to Typescript, change class to abstract
export default class Grid extends React.Component {
    // Abstract, Data
    getDataSourceName () { return ''; }
    getDataFields () { return []; }
    getColumns () { return []; }
    isGroupable () { return true; }
    getDefaultGrouping () { return []; } // TODO Get/Save group for user
    mapData (documents) { return documents; }
    isEditable () { return false; }

    // Abstract, Row Details
    hasRowDetails () { return false; }
    initRowDetails () { }
    rowDetailsTemplate () { }

    // Abstract, Context Menu
    hasContextMenu () { return false; }
    renderContextMenu () { return (<div/>); }
    onContextMenuItemClicked (menuItem, selectedRow) { }
    updateContextMenu () {}

    // Abstract, Editing
    onDataChange () {}

    // Abstract, Filters
    applyDefaultFilter() { }

    // Abstract, Selection
    selectionMode () { return 'singlerow'; }

    onDataEdit() {}
    editMode() { return 'dblclick'; }

    constructor (props) {
        super(props);
        this.state = {
            refName: UUID.v4(),
            documents: []
        }
    }

    // Manually handle all data changes
    shouldComponentUpdate (nextProps, nextState) {
        return false;
    }

    componentDidMount () {
        this.refs[this.state.refName].on('contextmenu', () => false); // Disable default context menu

        if (this.hasContextMenu()) {
            this.refs[this.state.refName].on('rowclick', (event) => {
                if (event.args.rightclick) {
                    this.updateContextMenu();
                    this.refs[this.state.refName].selectrow(event.args.rowindex);
                    let scrollTop = $(window).scrollTop();
                    let scrollLeft = $(window).scrollLeft();
                    this.refs.myMenu.open(parseInt(event.args.originalEvent.clientX) + 5 + scrollLeft, parseInt(event.args.originalEvent.clientY) + 5 + scrollTop);
                    return false;
                }
            });

            // TODO Disable/hide menu if grouped row is selected
            // this.refs.myMenu.on('shown', (event) => {
            //     console.log('Showing Menu', event);
            // });

            this.refs.myMenu.on('itemclick', (event) => {
                let args = event.args;
                let rowindex = this.refs[this.state.refName].getselectedrowindex();
                if (rowindex === -1) {
                    // TODO Do Better, currently this is only hit if nothing is selecte, which happens if you right click on a grouped row.
                    //          If you right click a grouped row after selecting a record the this will not be hit and the action will take
                    //          place on the selected records.
                    //alert('This action can not be preformed on a grouped row.');
                } else {
                    this.onContextMenuItemClicked(args, rowindex);
                }
            });
        }

        this.refs[this.state.refName].on('columnresized', (event) => {
            let column = event.args.columntext;
            let newWidth = event.args.newwidth;
            let oldWidth = event.args.oldwidth;
            console.log('Column: ' + column + ', ' + 'New Width: ' + newWidth + ', Old Width: ' + oldWidth);
        });


        this.refs[this.state.refName].on('cellendedit', (event) => {
            this.onDataEdit(event.args.rowindex, event.args.datafield, event.args.value);
        });
    }

    setCount(count) {
        let countSPAN = document.getElementById(this.state.refName + '-count');
        countSPAN && (countSPAN.innerHTML = count);
        // TODO Wont render count if not in view or render hasn't finished
    }

    render () {
        // Initial empty data source
        let source = {
            datatype: 'array',
            datafields: this.getDataFields(),
            localdata: []
        };
        let dataAdapter = new $.jqx.dataAdapter(source);
        let columns = this.getColumns();

        // Status Bar
        // TODO Cleanup
        let renderstatusbar = (statusbar) => {
            // let exportDOM = document.createElement('div');
            // exportDOM.innerHTML = '...';
            // statusbar[0].appendChild(exportDOM);
            // let toXLS = () => {
            //     this.refs[this.state.refName].exportdata('xls', this.getDataSourceName().toLowerCase().replace(/ /g, '_') + '_export_' + Moment().format('YYYYMMDD'));
            // };
            // render((
            //     <div style={{borderTop: '1px solid #b3b3b3'}}>
            //         {this.getDataSourceName()} Count: <span id={this.state.refName + '-count'}>-</span>
            //         {/*<button style={{marginLeft: '64px', height: '14px', fontSize: '0.7em'}} onClick={toXLS.bind(this)}>Export</button>*/}
            //     </div>
            // ), exportDOM);
        }

        this.updateDocuments = (documents) => {
            source.localdata = [];
            this.mapData(documents).forEach((d) => source.localdata.push(d)); // TODO Better way to load source?
            this.refs[this.state.refName].updatebounddata('cells');
            // this.refs[this.state.refName].refreshfilterrow();
            this.setCount(source.localdata.length);
    
            // HACK Quick fix for filter
            setTimeout(() => {
                this.refs[this.state.refName].updatebounddata('cells');
                this.refs[this.state.refName].refreshfilterrow();
                this.refs[this.state.refName].showFilterRow = true;
    
                // TODO Is this the best spot?
                this.applyDefaultFilter();
            }, 2000);
        };

        // Load data
        if (this.props.documents) {
            source.localdata = [];
            this.mapData(this.props.documents).forEach((d) => source.localdata.push(d)); // TODO Better way to load source?
            //this.refs[this.state.refName].updatebounddata('cells');
            this.setCount(source.localdata.length);

            // HACK Quick fix for filter
            setTimeout(() => {
                this.refs[this.state.refName].updatebounddata('cells');
                this.refs[this.state.refName].refreshfilterrow();
                this.refs[this.state.refName].showFilterRow = true;
            }, 2000);
        } else if (this.getDataSourceName() !== '') {
            // DataSource.getByName(this.getDataSourceName()).onData((documents) => {
            //     source.localdata = [];
            //     this.mapData(documents).forEach((d) => source.localdata.push(d)); // TODO Better way to load source?
            //     this.refs[this.state.refName].updatebounddata('cells');
            //     // this.refs[this.state.refName].refreshfilterrow();
            //     this.setCount(source.localdata.length);

            //     // HACK Quick fix for filter
            //     setTimeout(() => {
            //         this.refs[this.state.refName].updatebounddata('cells');
            //         this.refs[this.state.refName].refreshfilterrow();
            //         this.refs[this.state.refName].showFilterRow = true;

            //         // TODO Is this the best spot?
            //         this.applyDefaultFilter();
            //     }, 2000);
            // });
        } else {
            console.error('Grid does not have getDataSourceName or props.documents'); // TODO Better Error Message
        }

        return (
            <div style={{height: '100%', width: '100%'}}>
                <JqxGrid
                    theme={'fresh'}
                    width={'100%'}
                    height={'100%'}
                    source={dataAdapter}
                    columnsresize={true}
                    columns={columns}
                    filterable={true}
                    showfilterrow={false}
                    ref={this.state.refName}
                    sortable={true}
                    statusbarheight={22}
                    showstatusbar={false}
                    renderstatusbar={renderstatusbar}
                    selectionmode={this.selectionMode()}
                    editable={this.isEditable()}
                    editmode={this.editMode()}
                    autoshowcolumnsmenubutton={false}

                    rowdetails={this.hasRowDetails()}
                    initrowdetails={this.initRowDetails}
                    rowdetailstemplate={this.rowDetailsTemplate()}

                    groupable={this.isGroupable()}
                    groups={this.getDefaultGrouping()}

                    // pageable={true}
                    // autoheight={true}
                />
                {this.renderContextMenu()}
            </div>
        );
    }
}
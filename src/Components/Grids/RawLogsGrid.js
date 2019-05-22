import Grid from './Grid';

export default class RawLogsGrid extends Grid {
    static singleton;

    constructor (props) {
        super(props);
        // TODO Ensure there is only one copy of this grid
        RawLogsGrid.singleton = this;
    }

    getDataFields() {
        return [
            { name: 'log_id',       type: 'string'  },
            { name: 'log_time',     type: 'string'  },
            { name: 'level',        type: 'string'  },
            { name: 'contextID',    type: 'string'  },
            { name: 'contextName',  type: 'string'  },
            { name: 'message',      type: 'string'  },
            { name: 'gitBranch',    type: 'string'  },
            { name: 'gitSHA',       type: 'string'  },
            { name: 'system',       type: 'string'  }
        ];
    }

    getColumns() {
        return [
            { text: 'ID',            datafield: 'log_id',        width: 100, minwidth: 100   },
            { text: 'Time',          datafield: 'log_time',      width: 200, minwidth: 200   },
            { text: 'Level',         datafield: 'level',         width: 80,  minwidth:  80   },
            { text: 'Context ID',    datafield: 'contextID',     width: 100, minwidth: 100   },
            { text: 'Context Name',  datafield: 'contextName',   width: 120, minwidth: 120   },
            { text: 'Message',       datafield: 'message',       width: 200, minwidth: 200   },
            { text: 'Git Branch',    datafield: 'gitBranch',     width: 80,  minwidth: 80    },
            { text: 'Git Hash',      datafield: 'gitSHA',        width: 200, minwidth: 200   },
            { text: 'System',        datafield: 'system',        width: 100, minwidth: 100   }
        ];
    }

    mapData(documents) {
        return documents.map((log) => {
            return {
                log_id: log.log_id,
                log_time: log.log_time,
                level: log.level,
                contextID: log.context.contextID,
                contextName: log.context.contextName,
                message: log.message,
                gitBranch: log.git.branch,
                gitSHA: log.git.sha,
                system: log.system.hostname
            };
        });
    }

    hasContextMenu() {
        return false;
    }
}
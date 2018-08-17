export default function MonitorReducer(state = {}, action) {
    switch (action.type) {
        case "updateActiveSessions":
            return Object.assign({}, state, { activeSessions: action.activeSessions });
        case "updateHistorySessions":
            return Object.assign({}, state, { historySessions: action.historySessions });
        case "filterData":
            return Object.assign({}, state, { filterData: action.filterData });
        case "filHistorySessions":
            return Object.assign({}, state, { filHistorySessions: action.filHistorySessions });
        case "updateSessionDetail":
            return Object.assign({}, state, { sessionDetail: action.sessionDetail });
        default:
            return state;
    }
}
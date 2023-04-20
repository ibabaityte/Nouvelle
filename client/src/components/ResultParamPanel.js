import SortPanel from "./SortPanel/SortPanel";
import PageSizePanel from "./PageSizePanel";
import {resultParamPanel} from "../styles/ResultParamPanelStyles";

const ResultParamPanel = (props) => {
    const {
        results,
        setResults,
        sortParam,
        setSortParam,
        query,
        setActivePage,
        getProductPages,
        windowSize,
        changePageSize,
        pageSize
    } = props;

    return (
        <div style={resultParamPanel}>
            <SortPanel
                results={results}
                setResults={setResults}
                sortParam={sortParam}
                setSortParam={setSortParam}
                query={query}
                setActivePage={setActivePage}
                getProductPages={getProductPages}
                pageSize={pageSize}
                windowSize={windowSize}
            />
            <PageSizePanel
                changePageSize={changePageSize}
                pageSize={pageSize}
            />
        </div>
    );
}

export default ResultParamPanel;

import { AgGridReact } from 'ag-grid-react';

const Grid = ({ rowData, colDefs }) => {
    return (
        <div className="ag-theme-quartz" style={{ height: '70vh', width: '100%', marginTop: '20px' }}>
            <AgGridReact rowData={rowData} columnDefs={colDefs} pagination={true}/>
        </div>
    );
};

export default Grid;

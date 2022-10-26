import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector} from '@mui/x-data-grid';
import LinearProgress from "@mui/material/LinearProgress";
import { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { GridFilterModel } from '@mui/x-data-grid';

export default function CustomDataGrid({
  rows,
  columns,
  loading = false,
  accessoryButton,
  onRowsDelete,
  filterModel
}: {
  rows: any[],
  columns: any[], 
  loading?: boolean,
  accessoryButton: JSX.Element,
  filterModel?: GridFilterModel,
  onRowsDelete: (rows: any[]) => void
}) {

  const [selectedRows, setSelectedRows] = useState<any[]>([]);

  function CustomToolbar() {

    return (
      <GridToolbarContainer>
        {accessoryButton}
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport />
        {
          selectedRows.length > 0
          &&
        <IconButton
        color='primary'
        size='small'
        sx={{ml: 2}}
         onClick={() =>{
          onRowsDelete(selectedRows);
        }}>
          <DeleteIcon/>
        </IconButton>
        }
      </GridToolbarContainer>
    );
  }

  return (
    <div style={{ height: 600, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        initialState={{
          filter: {
            filterModel
          }}}
        onSelectionModelChange = {(models: any[]) =>{
            setSelectedRows(models);
        }}
        density='comfortable'
        disableSelectionOnClick
        checkboxSelection={true}
        components={{ Toolbar: CustomToolbar,
          LoadingOverlay: LinearProgress,
          
        }}
      />
    </div>
  );
}

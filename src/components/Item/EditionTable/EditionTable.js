import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Paper } from '@material-ui/core';
import HeaderBar from './HeaderBar/HeaderBar';
import TableEdition from './TableEdition/TableEdition';
import TableEdition1 from './TableEdition/TableEdition1';
import TableEdition2 from './TableEdition/TableEdition2';
const EditionTable = ({
  allItemsData,
  setAllItemsData,
  setBackupAllItemsData,
  backupAllItemsData,
  categories,
  categoryValue,
  setCategoryValue,
  showEditDataFromTable,
  setShowEditDataFromTable,
  query,
  setQuery,
}) => {
  return (
    <Grid container md={12} sm={12} style={{ width: '100%' }} item>
      <Paper style={{ width: '100%' }}>
        <TableEdition2
          allItemsData={allItemsData}
          setAllItemsData={setAllItemsData}
          setBackupAllItemsData={setBackupAllItemsData}
          backupAllItemsData={backupAllItemsData}
          categories={categories}
          categoryValue={categoryValue}
          setCategoryValue={setCategoryValue}
          showEditDataFromTable={showEditDataFromTable}
          setShowEditDataFromTable={setShowEditDataFromTable}
          query={query}
          setQuery={setQuery}
        />
      </Paper>
    </Grid>
  );
};

export default EditionTable;

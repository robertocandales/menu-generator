import React from 'react';

import dynamic from 'next/dynamic';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import DataGridTable from './DataGridTable';

const DataGridModal = ({ openDataGrid, setOpenDataGrid, dataGridOpen }) => {
  return (
    <div>
      <Dialog
        fullWidth
        maxWidth={'lg'}
        open={openDataGrid}
        onClose={() => setOpenDataGrid}
        aria-labelledby='max-width-dialog-title'
        disableBackdropClick>
        <DialogTitle id='max-width-dialog-title'>Update</DialogTitle>
        <DialogContent>
          <div>
            {/*<DataGridTable />*/}
            {/*<ReactDataGrid
                columns={columns}
                rowGetter={(i) => {
                  let row = massiveEditionData[i];

                  if (i >= 0) {
                    row = {
                      ...row,
                      isVisibleTakeAway: row.isVisibleTakeAway === true ? 'Yes' : 'No',
                      isVisibleDigitalMenu: row.isVisibleDigitalMenu === true ? 'Yes' : 'No',
                    };
                  }
                  return row;
                }}
                rowsCount={massiveEditionData.length}
                enableCellSelect={true}
                enableCellCopyPaste={true}
                enableCellAutoFocus={true}
                onGridRowsUpdated={({ fromRow, toRow, updated }) => {
                  setMassiveEditionData((prevState) => {
                    const rows = [...prevState];
                    for (let i = fromRow; i <= toRow; i++) {
                      console.log(updated);
                      const key = Object.keys(updated)[0];
                      rows[i] = {
                        ...rows[i],
                        ...updated,
                        [key]: String(updated[key]).toLowerCase() === 'yes' ? true : false,
                      };
                    }
                    return rows;
                  });
                }}
                onGridSort={(sortColumn, sortDirection) => {
                  setMassiveEditionData((prevState) => {
                    const rows = [...prevState];
                    const comparer = (a, b) => {
                      if (sortDirection === 'ASC') {
                        return a[sortColumn] > b[sortColumn] ? 1 : -1;
                      } else if (sortDirection === 'DESC') {
                        return a[sortColumn] < b[sortColumn] ? 1 : -1;
                      }
                    };
                    return sortDirection === 'NONE' ? massiveEditionData : [...rows].sort(comparer);
                  });
                }}
              />*/}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={dataGridOpen} color='primary' size='large' variant='outlined'>
            Close
          </Button>
          <Button
            //  onClick={() => {
            //    toggleMassiveEditionModal();
            //    const updateArr = (o, arrToLoop, setFunc) => {
            //      arrToLoop.forEach((p, pIndex) => {
            //        if (p.id === o?.id) {
            //          setFunc((prevState) => {
            //            const prevData = [...prevState];
            //            prevData[pIndex] = { ...p, ...o };
            //            prevData.splice(pIndex, 1, { ...p, ...o });
            //            return prevData;
            //          });
            //        }
            //      });
            //    };

            //massiveEditionData.forEach((o) => {
            //  updateArr(o, allItemsData, setAllItemsData);
            //  updateArr(o, backupAllItemsData, setBackupAllItemsData);
            //  updateArr(o, selectedRows, setSelectedRows);
            //});
            // }}
            color='primary'
            size='large'
            variant='contained'>
            'save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DataGridModal;

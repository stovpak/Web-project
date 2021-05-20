import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
} from '@material-ui/core';
import { AlertStyle } from 'components/Material UI/materialStyle';

const Delete = ({ open, handleClose, handleDelete, topicName }) => (
  <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
    <DialogContent>
      <DialogContentText id="alert-dialog-description" style={AlertStyle}>
        Вы уверенны что хотите удалить : {'"' + topicName + '"'}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleDelete} color="primary">
        Да
      </Button>
      <Button onClick={handleClose} color="" autoFocus>
        Нет
      </Button>
    </DialogActions>
  </Dialog>
);
export default Delete;

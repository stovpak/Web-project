import React from 'react';

import { Dialog, DialogContent, DialogContentText } from '@material-ui/core';
import { AlertStyle } from 'components/Material UI/materialStyle';
import { redirectToUrl } from 'utils/baseAPI';

const UnAuthorized = ({ open, handleClose }) => (
  <Dialog open={open} fullWidth maxWidth="xs" onClose={handleClose}>
    <DialogContent>
      <DialogContentText id="alert-dialog-description" style={AlertStyle}>
        Для того что бы продолжить, пожалуйста войдите
      </DialogContentText>
      <button
        className="btn btn-warning form-control"
        onClick={() => {
          redirectToUrl('user/sign-in');
        }}
      >
        Войти
      </button>
    </DialogContent>
  </Dialog>
);

export default UnAuthorized;

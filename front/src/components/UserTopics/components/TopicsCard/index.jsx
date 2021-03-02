import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import { CardContent, Divider, Fab, Grid } from '@material-ui/core';
import {
  BoxStyle,
  cardHeaderStyle,
  GridStyle,
} from '../../../Material UI/materialStyle';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import { AlertWindow } from '../../../AlertWindow/Delete';

const TopicsCard = ({
  item,
  isDelete,
  handleClose,
  handleDelete,
  deleteTopic,
}) => (
  <>
    <Card>
      <Grid style={GridStyle}>
        <Grid item xs={6}>
          <Typography variant="h4" style={cardHeaderStyle}>
            {item.creator_name}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Fab
            color="secondary"
            aria-label="edit"
            size="small"
            style={BoxStyle}
            onClick={() => handleDelete(item.id)}
          >
            <DeleteIcon />
          </Fab>
        </Grid>
      </Grid>
      <Divider />
      <CardContent>
        <Typography variant="h5" component="h5">
          {item.topic_name}
        </Typography>
      </CardContent>
      {/*      {isDelete && (
        <AlertWindow
          open={isDelete}
          topicName={item.topic_name}
          handleClose={handleClose}
          handleDelete={handleDelete}
        />
      )}*/}
    </Card>
  </>
);

export default TopicsCard;

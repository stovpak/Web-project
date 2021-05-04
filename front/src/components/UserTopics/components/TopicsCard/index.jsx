import React from 'react';
import Card from '@material-ui/core/Card';
import { CardContent, Divider, Fab, Grid } from '@material-ui/core';
import {
  BoxStyle,
  cardHeaderStyle,
  GridStyle,
} from 'components/Material UI/materialStyle';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';

const TopicsCard = ({ item, openConfirmDelete }) => (
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
          onClick={() => openConfirmDelete(item.id, item.topic_name)}
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
  </Card>
);

export default TopicsCard;

import React, { Component } from "react";
import NavBar from "../navBar/NavBar";
import { getJwt } from "../helpers/userService";
import AuthApi from "../helpers/authApi";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import {
  GridStyle,
  BoxStyle,
  cardHeaderStyle,
} from "../Material UI/materialStyle";
import { CardContent, Divider, Fab, Grid } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { AlertDelete } from "../AlertWindow/AlertWindowDelete";

class UserTopics extends Component {
  state = {
    userTopics: [],
    isDelete: false,
    deleteTopicId: null,
  };

  componentDidMount() {
    AuthApi.getUserTopics(getJwt())
      .then((res) => {
        this.setState({ userTopics: res });
      })
      .catch((err) => console.log(err));
  }
  deleteTopic = (id) => {
    this.setState({ isDelete: true, deleteTopicId: id });
  };
  handleClose = () => {
    this.setState({ isDelete: false });
  };
  handleDelete = () => {
    const { deleteTopicId: id } = this.state;
    console.log("id", id);
    AuthApi.deleteTopic(id).then((res) => {
      this.setState({ isDelete: false });
    }).catch(err=>console.log(err));
  };

  render() {
    return (
      <div>
        <NavBar />
        <div className="container">
          {this.state.userTopics[0] &&
            this.state.userTopics.map((item, key) => (
              <div className="mb-5" key={key}>
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
                        onClick={() => this.deleteTopic(item.id)}
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
                {this.state.isDelete && (
                  <AlertDelete
                    open={this.state.isDelete}
                    topicName={item.topic_name}
                    handleClose={this.handleClose}
                    handleDelete={this.handleDelete}
                  />
                )}
              </div>
            ))}
        </div>
      </div>
    );
  }
}

export default UserTopics;

import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

import axios from '../../config/axios';
import { connect } from 'react-redux';

import * as AuthActions from '../../state/actions/auth/actions';

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
});
class SignInComponent extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      users: []
    }
  }

  componentDidMount() {
    axios.get('/users').then((response) => {
      this.setState({
        users: response.data.users
      });
    });
    
  }

  handleSignIn = (user) => {
    this.props.signIn({user: {id: user.id}});
  }
  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <h2>Login as : </h2>
        <List component="nav" className={classes.root}>
            {
              this.state.users.map((user, index) => {
                return (
                  <React.Fragment key={index}>
                    <ListItem button onClick={() => this.handleSignIn(user)}>
                      <ListItemAvatar>
                      <Avatar className={classes.avatar}>U</Avatar>
                      </ListItemAvatar>
                      <ListItemText inset primary={user.username} />
                    </ListItem>
                  </React.Fragment>
                )
              })
            }
            
        </List>
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signIn : (userId) => dispatch(AuthActions.signIn(userId))
  }
}
export default connect(null, mapDispatchToProps)(withStyles(styles)(SignInComponent));

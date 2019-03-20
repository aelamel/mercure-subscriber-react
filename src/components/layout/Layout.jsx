import React from 'react';
import {connect} from 'react-redux';

import PropTypes from 'prop-types';
import {Switch, Route} from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import Header from './header/Header';
import Footer from './footer/Footer';

import SecuredRoute from '../SecuredRoute';

import HomeComponent from '../HomeComponent';
import PostsComponent from '../posts/PostsComponent';
import SignInComponent from '../auth/SignInComponent';

import * as AuthActions from '../../state/actions/auth/actions';
import * as UserActions from '../../state/actions/user/actions';

const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: '#eee',
    },
  },
  appBar: {
    position: 'relative',
  },
  toolbarTitle: {
    flex: 1,
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
    
  },
  footer: {
    marginTop: theme.spacing.unit * 8,
    borderTop: `1px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit * 6}px 0`,
  },
});

class Layout extends React.Component {

  state = {
    msg: ''
  }
  constructor(props) {
    super(props);
    this.eventSource = null;
  }
  componentDidMount() {
    // const url = new URL('http://localhost:3333/hub');
    // url.searchParams.append('topic', 'http://local.dev/notifications');
    
    // this.eventSource = new EventSource(url, {withCredentials: true});
    
    // // The callback will be called every time an update is published
    // this.eventSource.onmessage = (e) => {
    //     console.log(e);
    //     this.setState({
    //         msg: JSON.parse(e.data).message
    //     });

    //     setTimeout(() => {
    //         this.setState({
    //             msg: ''
    //         });
    //     }, 2000);
    // }
    this.props.connectToHub();
  }

  componentWillUpdate() {
    console.log('test');
  }

  componentWillUnmount() {
    // this.eventSource.close();
  }

  render() {
    const { classes, authenticated, checked } = this.props;

    return (
      <React.Fragment>
        <CssBaseline />
        <Header {...this.props} onSignOut={this.props.signOut} />
        <main className={classes.layout}>
          <h1>{this.props.notification}</h1>
          { checked &&
            <React.Fragment>
              <Switch>
                <Route path="/signin" name="Sign In" component={SignInComponent} />
                <SecuredRoute path="/posts" component={PostsComponent} authenticated={authenticated} loginPath="/signin"/>
                <Route path="**" name="Home" component={HomeComponent} />  
              </Switch>
            </React.Fragment>
          }
        </main>
      <Footer  classes={classes} />
      </React.Fragment>
    );
  }
}

Layout.propTypes = {
  classes: PropTypes.object.isRequired,
  authenticated: PropTypes.bool,
  checked: PropTypes.bool
};

const mapStateToProps = ({session, ...state}) => {
  return {
    checked: session.checked,
    authenticated: session.authenticated,
    auth: state.authState,
    notification: state.notification
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(AuthActions.signOut()),
    connectToHub: () => dispatch(AuthActions.connectToHub()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Layout));
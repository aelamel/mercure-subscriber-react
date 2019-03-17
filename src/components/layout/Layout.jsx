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

  render() {
    const { classes, authenticated, checked } = this.props;

    return (
      <React.Fragment>
        <CssBaseline />
        <Header {...this.props} onSignOut={this.props.signOut} />
        <main className={classes.layout}>
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
    auth: state.authState
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(AuthActions.signOut())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Layout));
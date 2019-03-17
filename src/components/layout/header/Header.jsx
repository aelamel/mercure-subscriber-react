import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';

export default function Header({classes, authenticated, ...props}) {
  return (
    <React.Fragment>
        <AppBar position="static" color="default" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
            <Link to="/"> Logo </Link>
          </Typography>
          {(authenticated) ? (<Link to="/posts"><Button>Posts</Button></Link>) : null} 
          {(authenticated) ? (<Button onClick={props.onSignOut}>Logout</Button>) : null} 
          {(!authenticated) ? (<Link to="/signin"><Button>Sign In</Button></Link>) : null} 
         
        </Toolbar>
      </AppBar>
    </React.Fragment>
  )
}

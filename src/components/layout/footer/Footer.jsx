import React from 'react'
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';

export default function Footer({classes}) {
  
  return (
    <React.Fragment>
       {/* Footer */}
       <footer className={classNames(classes.footer, classes.layout)}>
        <Typography variant="caption" align="center">
            Footer text goes here !
        </Typography>
       </footer>
      {/* End footer */}
    </React.Fragment>
  )
}

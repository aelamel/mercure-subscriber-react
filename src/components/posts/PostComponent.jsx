import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
};
function PostComponent(props) {
  const { classes } = props;

  return (
    <React.Fragment>
      <Card className={classes.card}>
      <CardActionArea>
       
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.post.title}
          </Typography>
          <Typography component="p">
            {props.post.content}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {
          (!props.post.subscribedTo) ? (
            <Button size="small" color="primary" onClick={() => props.onSubscribe(props.post)}>
              Subscribe
            </Button>
          ): null
        }
        {
          (props.post.subscribedTo) ? (
            <Button size="small" color="primary" onClick={() => props.onUnSubscribe(props.post)}>
              UnSubscribe
            </Button>
          ): null
        }
      </CardActions>
    </Card>
    </React.Fragment>
  )
}
export default withStyles(styles)(PostComponent);


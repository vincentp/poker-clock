import React, { Component } from "react";
import styles from "./styles";
// @ts-ignore
import withStyles from "react-jss";
import { ClockComponent } from "../clock/clock";
import Sidebar from "../sidebar/sidebar";
import { connect } from "react-redux";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

interface ComponentProps {
  classes: any;
}

interface ComponentState {  
}

@withStyles(styles)
class App extends Component <ComponentProps, ComponentState> {

  constructor(props: ComponentProps) {
    super(props);
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.app}>
        <header>
          <Typography className={classes.name}>Poker Clock</Typography>
        </header>
        <Grid container spacing={0}>
          <Grid item lg={4}>
            <Sidebar />
          </Grid>
          <Grid item id="clockColumn" lg={12}>
            <ClockComponent />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default connect(
  null,
  null
)(App);
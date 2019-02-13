import React, { Component } from "react";
import styles from "./styles";
// @ts-ignore
import withStyles from "react-jss";
import { Clock } from "../clock/clock";
import Sidebar from "../sidebar/sidebar";
import { connect } from "react-redux";
import { Grid } from "semantic-ui-react";

interface ComponentProps {
  classes?: any;
}

interface ComponentState {  
}

const mapStateToProps = (state: ComponentState) => {
  return {};
};

const mapDispatchToProps = (dispatch: any) => {
  return {};
};

@withStyles(styles)
class App extends Component <ComponentProps, ComponentState> {

  constructor(props: ComponentProps) {
    super(props);
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.app}>
        <header className={classes.header}>
          <span>Poker Clock</span>
        </header>
        <Grid>
          <Grid.Column computer={4}>
            <Sidebar />
          </Grid.Column>
          <Grid.Column id="clockColumn" computer={12}>
            <Clock />
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
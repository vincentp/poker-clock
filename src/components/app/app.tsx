import React, { Component } from "react";
import styles from "./styles";
// @ts-ignore
import withStyles from "react-jss";
import Clock from "../../components/clock/clock";
import { connect } from "react-redux";

interface ComponentProps {
  classes: any;
}

interface ComponentState {  
}

const mapStateToProps = (state: ComponentState) => {
  return {};
};

const mapDispatchToProps = (dispatch: any) => {
  return {};
};

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
        <Clock />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(App));
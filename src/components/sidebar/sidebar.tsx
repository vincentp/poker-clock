import React, { Component } from "react";
import styles from "./styles";
// @ts-ignore
import withStyles from "react-jss";
import Timers from "../timers/timers";
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

class Sidebar extends Component <ComponentProps, ComponentState> {

  constructor(props: ComponentProps) {
    super(props);
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.sidebar}>
        <Timers />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Sidebar));
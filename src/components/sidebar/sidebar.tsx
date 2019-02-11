import React, { Component } from "react";
import styles from "./styles";
// @ts-ignore
import withStyles from "react-jss";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

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
       <Link to="/timers">Settings</Link>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Sidebar));
import React, { Component } from "react";
import styles from "./styles";
// @ts-ignore
import withStyles from "react-jss";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { AppState, Timer, Clock } from "../../common/types";
import { Table } from "semantic-ui-react";

interface ComponentProps {
  timers: Timer[];
  activeTimer: number;
  classes: any;
}

interface ComponentState {
  timers: Timer[];
  activeTimer: number;
}

const mapStateToProps = (state: AppState) => {
  return { 
    activeTimer: state.clock.activeTimer,
    timers: state.clock.timers 
  };
};

class Sidebar extends Component<ComponentProps, ComponentState> {
  constructor(props: ComponentProps) {
    super(props);
  }

  timerStatusClassName(id: number) {
    return this.props.activeTimer === id ? 'active' : '';
  }

  render() {
    const { classes, timers } = this.props;

    let timersEl = timers.map((timer, i) => {
      return (
        <Table.Row key={i} className={this.timerStatusClassName(i)}>
          <Table.Cell>
            <span>{i + 1}</span>
          </Table.Cell>
          <Table.Cell>{timer.minutes + "min"}</Table.Cell>
          {!timer.break ? (
            <>
              <Table.Cell>
                <i className="fas fa-coins" />
                {timer.smallBlind}
              </Table.Cell>
              <Table.Cell>
                <i className="fas fa-coins" />
                {timer.bigBlind}
              </Table.Cell>
            </>
          ) : (
            <Table.Cell colSpan="2" className="ui center aligned">
              BREAK
            </Table.Cell>
          )}
        </Table.Row>
      );
    });

    return (
      <div className={classes.sidebar}>
        <Table className={classes.timers}>
          <Table.Body>{timersEl}</Table.Body>
          <Table.Footer>
            <Table.Row>
              <Table.Cell colSpan="4">
                <Link to="/timers">Settings</Link>
              </Table.Cell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  null
)(withStyles(styles)(Sidebar));

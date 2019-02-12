import React, { Component } from "react";
import styles from "./styles";
// @ts-ignore
import withStyles from "react-jss";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Timer } from "../../common/types"
import { Table } from "semantic-ui-react";

interface ComponentProps {
  timers: Timer[];
  classes: any;
}

interface ComponentState {
  clock?: any;
  timers: Timer[];
}

const mapStateToProps = (state: ComponentState) => {
  return { timers: state.clock.timers };
};

class Sidebar extends Component <ComponentProps, ComponentState> {

  constructor(props: ComponentProps) {
    super(props);
  }

  render() {
    const { classes, timers } = this.props;

    let timersEl = timers.map((timer, i) => {
      return (
        <Table.Row key={i}>
          <Table.Cell>
            <span>{i + 1}</span>
          </Table.Cell>
          <Table.Cell>
            {!timer.break ? ( 
              timer.minutes + 'min'
            ) : (
              'BREAK'
            )}
          </Table.Cell>
          <Table.Cell>
            {timer.break === false &&
              <span>
                <i className="fas fa-coins"></i>
                {timer.smallBlind}
              </span>
            }
          </Table.Cell>
          <Table.Cell>
            {timer.break === false &&
              <span>
                <i className="fas fa-coins"></i>
                {timer.bigBlind}
              </span>
            }
          </Table.Cell>
        </Table.Row>
      );
    });

    return (
      <div className={classes.sidebar}>
       <Link to="/timers">Settings</Link>
        <Table>
          <Table.Body>
            {timersEl}
           </Table.Body>
        </Table>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  null
)(withStyles(styles)(Sidebar));
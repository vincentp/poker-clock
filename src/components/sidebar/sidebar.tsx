import React, { Component } from "react";
import styles from "./styles";
// @ts-ignore
import { withStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { AppState, Timer, Clock } from "../../common/types";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableFooter from "@material-ui/core/TableFooter";
import Link from '@material-ui/core/Link';

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

  timerStatusClassName(id: number, cssClass: any) {
    return this.props.activeTimer === id ? cssClass : '';
  }

  render() {
    const { classes, timers } = this.props;

    let timersEl = timers.map((timer, i) => {
      return (
        <TableRow key={i} className={this.timerStatusClassName(i, classes.selected)}>
          <TableCell padding="dense" className={classes.cell}>
            {i + 1}
          </TableCell>
          <TableCell padding="dense" className={classes.cell}>{timer.minutes + "min"}</TableCell>
          {!timer.break ? (
            <>
              <TableCell padding="dense" className={classes.cell}>
                <i className="fas fa-coins" />
                {timer.smallBlind}
              </TableCell>
              <TableCell padding="dense" className={classes.cell}>
                <i className="fas fa-coins" />
                {timer.bigBlind}
              </TableCell>
            </>
          ) : (
            <TableCell padding="dense" className={classes.cell} colSpan={2} align="center">
              BREAK
            </TableCell>
          )}
        </TableRow>
      );
    });

    const LinkToTimers = (props: any) => <RouterLink to="/timers" {...props} />;

    return (
      <div className={classes.sidebar}>
        <Table className={classes.timers}>
          <TableBody>{timersEl}</TableBody>
          <TableFooter>
            <TableRow>
              <TableCell className={classes.cell} colSpan={4}>
                <Link component={LinkToTimers} className={classes.settings}>Settings</Link>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  null
)(withStyles(styles)(Sidebar));

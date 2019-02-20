import cloneDeep from 'lodash/cloneDeep';
import React, { Component } from "react";
import styles from "./styles";
// @ts-ignore
import withStyles from "react-jss";
import { connect } from "react-redux";
import { UPDATE_TIMERS, RESET_STATE, PAUSE_CLOCK } from "../../actions/actionTypes";
import { AppState, Timer, Clock } from "../../common/types"
import { BrowserRouter as Router, Route, Link, withRouter } from "react-router-dom";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableFooter from "@material-ui/core/TableFooter";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

interface ComponentProps {
  updateTimers: (timers: Timer[]) => void;
  addTimer: (timer: Timer) => void;
  resetTimers: () => void;
  pauseClock: () => void;
  timers: Timer[];
  classes: any;
  history: any;
}

interface ComponentState {
  timers: Timer[];
}

const mapStateToProps = (state: AppState) => {
  return { timers: state.clock.timers };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    updateTimers: (timers: Timer[]) => dispatch({ type: UPDATE_TIMERS, timers: timers }),
    resetTimers: () => dispatch({ type: RESET_STATE }),
    pauseClock: () => dispatch({ type: PAUSE_CLOCK })    
  };
};

class Timers extends Component<ComponentProps, ComponentState> {
  constructor(props: ComponentProps) {
    super(props);
    this.state = {
      timers: props.timers
    };
  }

  handleSubmit(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    this.props.updateTimers(this.state.timers);
    this.redirectToHome();
    event.preventDefault();
  }

  handleChange(id: number, field: string, event: React.ChangeEvent<HTMLInputElement>) {
    let newState = cloneDeep(this.state);

    if (field === 'minutes') {
      newState.timers[id].minutes = Number(event.target.value);
      newState.timers[id].secondsLeft = newState.timers[id].minutes * 60;
    } else if (field === 'smallBlind') {
      newState.timers[id].smallBlind = Number(event.target.value);
    } else if (field === 'bigBlind') {
      newState.timers[id].bigBlind = Number(event.target.value);
    }

    this.setState(newState);
    event.preventDefault();
  }

  addTimerBreak() {
    let lastTimer = this.props.timers.slice().reverse().find(timer => timer.break);
    if (lastTimer) this.addTimer(lastTimer);
  }

  addTimerBlind() {
    let lastTimer = this.props.timers.slice().reverse().find(timer => !timer.break);
    if (lastTimer) this.addTimer(lastTimer);
  }

  addTimer(timer: Timer) {
    let newState = cloneDeep(this.state);
    
    newState.timers.push({
      secondsLeft: timer.secondsLeft,
      minutes: timer.minutes,
      break: timer.break,
      smallBlind: timer.smallBlind,
      bigBlind: timer.bigBlind
    } as Timer);

    this.setState(newState);
  }

  removeTimer(id: number) {
    let newState = cloneDeep(this.state);   
    newState.timers.splice(id, 1);
    this.setState(newState);
  }

  handleCancel() {
    this.redirectToHome();
  }

  componentWillReceiveProps(nextProps: ComponentProps) {
    this.setState({
      timers: nextProps.timers
    });
  }

  componentDidMount() {
    this.props.pauseClock();
  }

  handleReset() {
    this.props.resetTimers();
  }

  redirectToHome() {
    this.props.history.push({
       pathname: '/'
    });    
  }

  render() {
    const { classes } = this.props;

    let timersEl = this.state.timers.map((timer, i) => {
      return (
        <TableRow key={i}>
          <TableCell>
            <span>{i + 1}</span>
          </TableCell>
          {!timer.break ? ( 
            <>
              <TableCell>
                <TextField value={timer.minutes.toString()} onChange={this.handleChange.bind(this, i, 'minutes')} />
              </TableCell>
              <TableCell>
                <TextField value={timer.smallBlind.toString()} onChange={this.handleChange.bind(this, i, 'smallBlind')} />
              </TableCell>
              <TableCell>
                <TextField value={timer.bigBlind.toString()} onChange={this.handleChange.bind(this, i, 'bigBlind')} />
              </TableCell>
            </>
          ) : (
            <TableCell colSpan={3}>
              BREAK
            </TableCell>
          )}
          <TableCell>
            <Button onClick={this.removeTimer.bind(this, i)}>Remove</Button>
          </TableCell>
        </TableRow>
      );
    });

    return (
      <div className={classes.timers}>
        <Link to="/" className={classes.back}>
          <i className="fas fa-chevron-left"></i>
          Back
        </Link>
        <form>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Level</TableCell>
                <TableCell>Duration</TableCell>
                <TableCell>Small Blind</TableCell>
                <TableCell>Big Blind</TableCell>
                <TableCell></TableCell>
              </TableRow>
             </TableHead>
            <TableBody>
              {timersEl}
             </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell></TableCell>
                <TableCell colSpan={3}>
                  <Button onClick={this.addTimerBlind.bind(this)}>Add Blind</Button>
                  <Button onClick={this.addTimerBreak.bind(this)}>Add Break</Button>
                </TableCell>
                <TableCell>
                  <Button onClick={this.handleReset.bind(this)}>Reset all</Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell></TableCell>
                <TableCell colSpan={4}>
                  <Button onClick={this.handleSubmit.bind(this)} type='submit' className="primary">Save</Button>
                  <Button onClick={this.handleCancel.bind(this)}>Cancel</Button>
                </TableCell>
              </TableRow>
            </TableFooter>             
          </Table>
        </form>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withStyles(styles)(Timers)));

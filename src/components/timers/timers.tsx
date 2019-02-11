import React, { Component } from "react";
import styles from "./styles";
// @ts-ignore
import withStyles from "react-jss";
import { connect } from "react-redux";
import { Form, Button, Table } from "semantic-ui-react";
import { UPDATE_TIMERS, RESET_STATE } from "../../actions/actionTypes";
import { Timer } from "../../common/types"
import { BrowserRouter as Router, Route, Link, withRouter } from "react-router-dom";

interface ComponentProps {
  updateTimers: (timers: Timer[]) => void;
  addTimer: (timer: Timer) => void;
  resetTimers: () => any;
  timers: Timer[];
  classes: any;
  history: any;
}

interface ComponentState {
  clock?: any;
  timers: Timer[];
}

const mapStateToProps = (state: ComponentState) => {
  return { timers: state.clock.timers };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    updateTimers: (timers: Timer[]) => dispatch({ type: UPDATE_TIMERS, timers: timers }),
    resetTimers: () => dispatch({ type: RESET_STATE })    
  };
};

class Timers extends Component<ComponentProps, ComponentState> {
  constructor(props: ComponentProps) {
    super(props);
    this.state = {
      timers: props.timers
    };
  }

  handleSubmit(event: any) {
    this.props.updateTimers(this.state.timers);
    this.redirectToHome();
    event.preventDefault();
  }

  handleChange(id: number, event: any) {
    let newState = Object.assign({}, this.state);
    newState.timers[id].minutes = Math.floor(event.target.value);
    newState.timers[id].secondsLeft = newState.timers[id].minutes * 60;
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
    let newState = Object.assign({}, this.state);
    
    newState.timers.push({
      secondsLeft: timer.secondsLeft,
      minutes: timer.minutes,
      break: timer.break,
      smallBlind: timer.smallBlind,
      bigBlind: timer.bigBlind
    } as Timer);

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

  handleReset() {
    this.props.resetTimers();
  }

  redirectToHome() {
    this.props.history.push({
       pathname: '/'
    });    
  }

  render() {
    const { classes, timers } = this.props;

    let timersEl = this.state.timers.map((timer, i) => {
      return (
        <Table.Row key={i}>
          <Table.Cell>
            <span>{i + 1}</span>
          </Table.Cell>
          <Table.Cell>
            {!timer.break ? ( 
              <Form.Field>
                <input value={(timer.minutes).toString()} onChange={this.handleChange.bind(this, i)} />
              </Form.Field>
            ) : (
              'BREAK'
            )}
          </Table.Cell>
        </Table.Row>
      );
    });

    return (
      <div className={classes.timers}>
         <Link to="/">Back</Link>
        <Form>
          <Table>
            <Table.Body>
              {timersEl}
             </Table.Body>
          </Table>
          <Button onClick={this.addTimerBlind.bind(this)}>Add Blind</Button>
          <Button onClick={this.addTimerBreak.bind(this)}>Add Break</Button>
          <Button onClick={this.handleSubmit.bind(this)} type='submit'>Save</Button>
          <Button onClick={this.handleCancel.bind(this)}>Cancel</Button>
          <Button onClick={this.handleReset.bind(this)}>Reset</Button>
        </Form>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withStyles(styles)(Timers)));

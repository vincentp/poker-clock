import React, { Component } from "react";
import styles from "./styles";
// @ts-ignore
import withStyles from "react-jss";
import { connect } from "react-redux";
import { Form, Button, Table } from "semantic-ui-react";
import { UPDATE_TIMERS } from "../../actions/actionTypes";
import { Timer } from "../../common/types"

interface ComponentProps {
  updateTimers: (timers: Timer[]) => void;
  addTimer: (timer: Timer) => void;
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

const mapDispatchToProps = (dispatch: any) => {
  return {
    updateTimers: (timers: Timer[]) => dispatch({ type: UPDATE_TIMERS, timers: timers })
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
    event.preventDefault();
  }

  handleChange(id: number, event: any) {
    let newState = Object.assign({}, this.state);
    newState.timers[id].minutes = Math.floor(event.target.value);
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
        <Form>
          <Table>
            <Table.Body>
              {timersEl}
             </Table.Body>
          </Table>
          <Button onClick={this.addTimerBlind.bind(this)}>Add Blind</Button>
          <Button onClick={this.addTimerBreak.bind(this)}>Add Break</Button>
          <Button onClick={this.handleSubmit.bind(this)} type='submit'>Save</Button>
        </Form>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Timers));

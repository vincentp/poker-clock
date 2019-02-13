import cloneDeep from 'lodash/cloneDeep';
import React, { Component } from "react";
import styles from "./styles";
// @ts-ignore
import withStyles from "react-jss";
import { connect } from "react-redux";
import { Form, Button, Table, Container } from "semantic-ui-react";
import { UPDATE_TIMERS, RESET_STATE, PAUSE_CLOCK } from "../../actions/actionTypes";
import { Timer } from "../../common/types"
import { BrowserRouter as Router, Route, Link, withRouter } from "react-router-dom";

interface ComponentProps {
  updateTimers: (timers: Timer[]) => void;
  addTimer: (timer: Timer) => void;
  resetTimers: () => any;
  pauseClock: () => any;
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

  handleSubmit(event: any) {
    this.props.updateTimers(this.state.timers);
    this.redirectToHome();
    event.preventDefault();
  }

  handleChange(id: number, field: string, event: any) {
    let newState = cloneDeep(this.state);

    if (field === 'minutes') {
      newState.timers[id].minutes = Math.floor(event.target.value);
      newState.timers[id].secondsLeft = newState.timers[id].minutes * 60;
    } else if (field === 'smallBlind') {
      newState.timers[id].smallBlind = Math.floor(event.target.value);
    } else if (field === 'bigBlind') {
      newState.timers[id].bigBlind = Math.floor(event.target.value);
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
        <Table.Row key={i}>
          <Table.Cell>
            <span>{i + 1}</span>
          </Table.Cell>
          {!timer.break ? ( 
            <>
              <Table.Cell>
                <Form.Field>
                  <input value={timer.minutes.toString()} onChange={this.handleChange.bind(this, i, 'minutes')} />
                </Form.Field>
              </Table.Cell>
              <Table.Cell>
                <Form.Field>
                  <input value={timer.smallBlind.toString()} onChange={this.handleChange.bind(this, i, 'smallBlind')} />
                </Form.Field>
              </Table.Cell>
              <Table.Cell>
                <Form.Field>
                  <input value={timer.bigBlind.toString()} onChange={this.handleChange.bind(this, i, 'bigBlind')} />
                </Form.Field>
              </Table.Cell>
            </>
          ) : (
            <Table.Cell colSpan="3">
              BREAK
            </Table.Cell>
          )}
          <Table.Cell>
            <Button onClick={this.removeTimer.bind(this, i)}>Remove</Button>
          </Table.Cell>
        </Table.Row>
      );
    });

    return (
      <div className={classes.timers}>
        <Container>
          <Link to="/" className={classes.back}>
            <i className="fas fa-chevron-left"></i>
            Back
          </Link>
          <Form>
            <Table>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Level</Table.HeaderCell>
                  <Table.HeaderCell>Duration</Table.HeaderCell>
                  <Table.HeaderCell>Small Blind</Table.HeaderCell>
                  <Table.HeaderCell>Big Blind</Table.HeaderCell>
                  <Table.HeaderCell></Table.HeaderCell>
                </Table.Row>
               </Table.Header>
              <Table.Body>
                {timersEl}
               </Table.Body>
              <Table.Footer>
                <Table.Row>
                  <Table.Cell></Table.Cell>
                  <Table.Cell colSpan="3">
                    <Button onClick={this.addTimerBlind.bind(this)}>Add Blind</Button>
                    <Button onClick={this.addTimerBreak.bind(this)}>Add Break</Button>
                  </Table.Cell>
                  <Table.Cell>
                    <Button onClick={this.handleReset.bind(this)}>Reset all</Button>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell></Table.Cell>
                  <Table.Cell colSpan="4">
                    <Button onClick={this.handleSubmit.bind(this)} type='submit' className="primary">Save</Button>
                    <Button onClick={this.handleCancel.bind(this)}>Cancel</Button>
                  </Table.Cell>
                </Table.Row>
              </Table.Footer>             
            </Table>
          </Form>
        </Container>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withStyles(styles)(Timers)));

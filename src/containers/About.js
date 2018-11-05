import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../styles/about.css'
import * as actions from '../redux/actions';

class About extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  componentWillMount = () => {
    this.props.setMountedComp('user');
  }

  render() {
    return (
      <main className={'About'}>
        test
      </main>
    )
  }
}
const mapStateToProps = (state) => {
  return {}
}
const mapDispatchToProps = (dispatch) => {
  return {
    setMountedComp: (value) => {
      dispatch({type:actions.SET_MOUNTED_COMP, value});
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(About);
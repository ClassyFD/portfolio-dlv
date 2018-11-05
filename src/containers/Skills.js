import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../styles/skills.css'
import * as actions from '../redux/actions';

class Skills extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  componentWillMount = () => {
    this.props.setMountedComp('cog');
  }

  render() {
    return (
      <main className={'Skills'}>
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
)(Skills);
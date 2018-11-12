import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../styles/projects.css'
import * as actions from '../redux/actions';
import AnimateHOC from '../hocs/Animate';

class Projects extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  componentWillMount = () => {
    this.props.setMountedComp('eye');
  }

  render() {
    return (
      <main className={'Projects'}>
        Projects
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

const animatedProject = AnimateHOC()(Projects);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(animatedProject);
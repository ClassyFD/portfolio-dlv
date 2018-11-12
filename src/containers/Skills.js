import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../styles/skills.css'
import * as actions from '../redux/actions';
import AnimateHOC from '../hocs/Animate';

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
        Skills
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

const animatedSkills = AnimateHOC()(Skills)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(animatedSkills);
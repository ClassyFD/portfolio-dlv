import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../styles/contact.css'
import * as actions from '../redux/actions';

class Contact extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  componentWillMount = () => {
    this.props.setMountedComp('envelope');
  }

  render() {
    return (
      <main className={'Contact'}>
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
)(Contact);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../styles/home.css'
import * as actions from '../redux/actions';
import { TweenMax } from 'gsap'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  componentWillMount = () => {
    this.props.setMountedComp('home');
  }

  componentDidMount = () => {

  }

  render = () => {
    return (
      <main className={'Home'}>
        <section>
          
        </section>
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
)(Home);
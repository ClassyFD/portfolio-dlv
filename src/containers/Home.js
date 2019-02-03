import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TweenMax, TimelineMax, Power1 } from 'gsap';
import { Link } from 'react-router-dom';
import FLogo from '../res/f_logo.png'
import { ReactComponent as TestLogo} from '../res/f_logo.svg';
import * as actions from '../redux/actions/nav.actions';
import '../styles/home.css';
import AnimateHOC from '../hocs/Animate';
import { debounce } from '../utility/utility';

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
    const tl = new TimelineMax();
    tl.to('tl-delay', .3, {opacity: 0})
      .to('.home-searching', .4, {opacity: 1})
      .staggerTo('.home-slide', .4, {left: 0, opacity: 1}, .4)
      // .from('.span-e', .4, {left: 100, top: 0})
      // .from('.span-e2', .4, {left: 127, top: 0}, '-=.4')
      
  }

  render = () => {
    const { state } = this;
    return (
      <main className={'Home'}>
        <section className="home-intro-section">
          <h2 className="home-h2 home-searching">Searching for a</h2>
          <h2 className="home-h2 home-slide home-motivated"><span className="home-span span-m">m</span>otivated</h2>
          <h2 className="home-h2 home-slide home-eager"><span className="home-span span-e">e</span>fficient</h2>
          <h2 className="home-h2 home-slide home-efficient"><span className="home-span span-e2">e</span>nthusiastic</h2>
          <h2 className="home-h2 home-slide home-thinker"><span className="home-span span-t">t</span>hinker?</h2>
          <h2 className="home-h2 home-meet">meet</h2>
          <h2 className="home-h2 home-fernando">Fernando.</h2>
        </section>
      </main>
    )
  }
}
const mapStateToProps = () => {
  return {}
}
const mapDispatchToProps = (dispatch) => {
  return {
    setMountedComp: (value) => {
      dispatch({
        type: actions.SET_MOUNTED_COMP, 
        value
      });
    },
    setAnimatedComp: (route) => {
      dispatch({
        type: actions.SET_ANIMATED_COMP,
        animatedComp: {
          status: false,
          route
        },
      })
    }
  }
}

const AnimatedHome = AnimateHOC()(Home);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnimatedHome);
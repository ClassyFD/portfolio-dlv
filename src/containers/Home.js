import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TweenMax, TimelineMax, Power1, Bounce, Elastic, Power4 } from 'gsap';

import * as actions from '../redux/actions/nav.actions';
import '../styles/home.css';
import AnimateHOC from '../hocs/Animate';

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
      .staggerTo('.home-slide', .4, {left: 0, opacity: 1}, .6)
      .to('.home-span', 0, {opacity: 1})
      .to('.home-m-span', 0, {opacity: 1})
      .to('.home-slide', .4, {opacity:0}) 
      .to('.home-e-span', .4, {top: 0, left: 57})
      .to('.home-e2-span', .4, {top: 0, left: 91}, '-=.4')
      .to('.home-t-span', .4, {top: 0, left: 122}, '-=.4')
      .to('.home-slide', 0, {display: 'none'})
      .to('.home-fernando', .4, {opacity: 1})
  }

  enterButton = (type) => {
    TweenMax.to('.home-button-projects', .5, {color: 'black'})
    TweenMax.to(`.home-button-bg-${type}`, 1.8, type==='projects'? {top: -50, left: 0, ease: Elastic.easeOut} : {})
  }
  leaveButton = (type) => {
    TweenMax.to('.home-button-projects', .5, {color: '#BCDEFA'})
    TweenMax.to(`.home-button-bg-${type}`, .5, type==='projects'? {left: -120, top: 30, ease: Power4.easeOut} : {})  
  }

  render = () => {
    const { state } = this;
    return (
      <main className={'Home'}>
        <article className="home-intro-article">
          <header className="home-header">
            <h2 className="home-h2 home-slide home-motivated">Motivated</h2>
            <h2 className="home-h2 home-slide home-efficient">efficient</h2>
            <h2 className="home-h2 home-slide home-enthusiastic">enthusiastic</h2>
            <h2 className="home-h2 home-slide home-thinker">thinker.</h2>
            <h2 className="home-h2 home-meet">
              <span className="home-m-span">M</span>
              <span className="home-span home-e-span">e</span>
              <span className="home-span home-e2-span">e</span>
              <span className="home-span home-t-span">t</span>
            </h2>
            <h2 className="home-h2 home-fernando">Fernando.</h2>
          </header>
          <section className="home-button-container">
            <button onMouseLeave={()=>{this.leaveButton('projects')}} onMouseEnter={()=>{this.enterButton('projects')}} className="home-button home-button-projects">
              <p style={{position:'relative', zIndex:5}}>View Projects</p>
              <span className="home-button-bg home-button-bg-projects"/>
            </button>
            <button className="home-button">Download Resume</button>
          </section>
        </article>
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
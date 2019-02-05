import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TweenMax, TimelineMax, Elastic, Power4 } from 'gsap';
import * as actions from '../redux/actions/nav.actions';
import '../styles/home.css';
import AnimateHOC from '../hocs/Animate';
import clone from 'clone';

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      softSkills1: [],
      softSkills2: [],
      softSkillOption: 1
    }
  }

  componentWillMount = () => {
    this.props.setMountedComp('home');
    const softSkills = ['Leadership', 'Critical thinking', 'Communication', 'Patience', 'Problem solving', 'Accountability', 'Creativity', 'Motivated', 'Efficient', 'Enthusiastic', 'Curiosity', 'Thinker', 'Disciplined'];
    const softSkillElements = softSkills.map((ssEL, ssIndex)=>{
      return (
        <div onClick={()=>{this.clickSoftSkill(ssIndex)}} onMouseLeave={()=>{this.leaveSoftSkill(ssIndex)}} onMouseEnter={()=>{this.enterSoftSkill(ssIndex)}} key={`${ssIndex}-soft-skill`} className={`home-soft-skill home-soft-skill-${ssIndex}`}>
          <svg key={`${ssIndex}-soft-skill-svg-2`} style={{position: 'absolute'}} stroke="black" strokeWidth="3" strokeDasharray="100" strokeDashoffset="100" fill="none" className={`soft-skill-svg-${ssIndex}`}>
            <path d="M210 50 L220 60, 240 40"></path>
          </svg>
          <svg key={`${ssIndex}-soft-skill-svg`} style={{position: 'absolute'}} stroke="#0ec704" strokeWidth="2" strokeDasharray="100" strokeDashoffset="100" fill="none" className={`soft-skill-svg-${ssIndex}`}>
            <path d="M210 50 L220 60, 240 40"></path>
          </svg>
          <p key={`${ssIndex}-soft-skill-p`} style={{flexWrap: 'nowrap'}}>{ssEL}</p>
        </div>
      )
    })
    this.setState({
      softSkills1: softSkillElements
    })
  }

  componentDidMount = () => {
    const tl = new TimelineMax();
    tl.to('tl-delay', .3, {opacity: 0})
      .staggerTo('.home-slide', .4, {left: 0, opacity: 1}, .6)
      .to('.home-span', 0, {opacity: 1})
      .to('.home-m-span', 0, {opacity: 1})
      .to('.home-slide', .4, {opacity:0}) 
      .to('.home-e-span', 2, {top: 0, left: 57, ease: Elastic.easeOut}, '-=.3')
      .to('.home-e2-span', 2, {top: 0, left: 91, ease: Elastic.easeOut}, '-=2')
      .to('.home-t-span', 2, {top: 0, left: 122, ease: Elastic.easeOut}, '-=2')
      .to('.home-slide', 0, {display: 'none'}, '-=1.5')
      .to('.home-fernando', .4, {opacity: 1, left: 0}, '-=1.5')
      .to('.home-paragraph', .4, {opacity: 1}, '-=1')
      .to('.home-button-container', 0, {display: 'flex'}, '-=1')
      .to('.home-button-container', .4, {opacity: 1}, '-=1')
      .call(()=>{this.animateSoftSkills()}, null, null, '-=.5')
  }

  animateSoftSkills = () => {
    const softSkill = this.state[`softSkills${[this.state.softSkillOption]}`]
    const softSkillLength = softSkill.length;
    if (softSkillLength > 0) {
      const randNum = Math.floor(Math.random() * softSkillLength-1) + 1;
      const tl = new TimelineMax();
      const key = softSkill[randNum].key.split('-')[0]
      const homeSkill = `.home-soft-skill-${key}`;
      const skillSVG = `.soft-skill-svg-${key}`;
      tl.to(homeSkill, 0, {display: 'flex'})
        .to(homeSkill, 1, {opacity: 1})
        .to(homeSkill, 1, {height: 50, ease:Elastic.easeOut}, '-=1')
        .to(homeSkill, .5, {bottom: 50}, '-=1')
        .to(skillSVG, .5, {strokeDashoffset: 50}, '-=.3')
        .to(homeSkill, 1, {rotation: 90, right: -200, bottom:50, opacity: 0})
        .to(homeSkill, 0, {right: 0, bottom: 0, rotation: 0, display: 'none'})
        .call(()=>{finishAnimation()});
      const finishAnimation = () => {
        let newSoftSkills1 = clone(this.state.softSkills1);
        let newSoftSkills2 = clone(this.state.softSkills2);
        if (this.state.softSkillOption === 1) {
          newSoftSkills2.push(newSoftSkills1.splice(randNum, 1)[0]);
        } else {
          newSoftSkills1.push(newSoftSkills2.splice(randNum, 1)[0])
        }
        this.setState({
          softSkills1: newSoftSkills1,
          softSkills2: newSoftSkills2
        }, ()=>{this.animateSoftSkills()})
      }
    } else {
      this.setState({
        softSkillOption: this.state.softSkillOption===1? 2 : 1
      }, ()=>this.animateSoftSkills())
    }
  }

  enterButton = (type) => {
    TweenMax.to(`.home-button-${type}`, .5, {color: 'black'})
    TweenMax.to(`.home-button-bg-${type}`, 1.8, type==='projects'? {top: -50, left: 0, ease: Elastic.easeOut} : {top: -60, left: 0, ease: Elastic.easeOut})
  }
  leaveButton = (type) => {
    TweenMax.to(`.home-button-${type}`, .5, {color: '#bcdefa'})
    TweenMax.to(`.home-button-bg-${type}`, .5, type==='projects'? {left: -120, top: 30, ease: Power4.easeOut} : {left: -130, top: 20, ease: Power4.easeOut})  
  }
  clickButton = (type) => {
    const tl = new TimelineMax();
    tl.to(`.home-button-${type}`, .1, {height: 28.6, top: 10})
      .to(`.home-button-${type}`, 1, {height: 38.6, top: 0, ease: Elastic.easeOut})  
  }

  enterSoftSkill = (type) => {
    TweenMax.to(`.home-soft-skill-${type}`, .5, {backgroundColor: 'transparent'})
    TweenMax.to(`.home-soft-skill-${type}`, .5, {color: '#BCDEFA'})
  }
  leaveSoftSkill = (type) => {
    TweenMax.to(`.home-soft-skill-${type}`, .5, {backgroundColor: '#6CB2EB'})
    TweenMax.to(`.home-soft-skill-${type}`, .5, {color: 'black'})
  }
  clickSoftSkill = (type) => {
    const tl = new TimelineMax();
    tl.to(`.home-soft-skill-${type}`, .1, {height: 30})
      .to(`.home-soft-skill-${type}`, 1, {height: 50, ease: Elastic.easeOut});
  }

  render = () => {
    const { state } = this;
    const softSkills = state[`softSkills${[this.state.softSkillOption]}`];
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
          <p className="home-paragraph">
            Software Developer || ReactJS | Redux | HTML | CSS | JS 
          </p>
          <section className="home-button-container">
            <button onClick={()=>{this.clickButton('projects')}} onMouseLeave={()=>{this.leaveButton('projects')}} onMouseEnter={()=>{this.enterButton('projects')}} className="home-button home-button-projects">
              <p style={{position:'relative', zIndex:5}}>View Projects</p>
              <span className="home-button-bg home-button-bg-projects"/>
            </button>
            <button onClick={()=>{this.clickButton('resume')}} onMouseLeave={()=>{this.leaveButton('resume')}} onMouseEnter={()=>{this.enterButton('resume')}} className="home-button home-button-resume">
              <p style={{position:'relative', zIndex:5}}>Download Resume</p>
              <span className="home-button-bg home-button-bg-resume"/>
            </button>
          </section>
        </article>
        <article className="home-soft-skills-section">
          {softSkills}
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
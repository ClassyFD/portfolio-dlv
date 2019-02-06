import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../styles/about.css'
import * as actions from '../redux/actions/nav.actions';
import Profile from '../res/profile_picture.png';
import AnimateHOC from '../hocs/Animate';
import { TimelineMax, Power1, TweenMax } from 'gsap';

class About extends Component {
  constructor(props) {
    super(props)
    this.state = {
      introText: "About me",
    }
  }

  componentWillMount = () => {
    this.props.setMountedComp('about');
  }
  componentDidMount = () => {

  }

  enterIT = (type, index) => {
    const tl = new TimelineMax();
    tl.to(`.about_${type}_${index}`, .1, {color: '#59bd8e'});
    tl.to(`.about_${type}_${index}`, .3, {fontSize: '56px', color: '#59bd8e', ease: Power1.easeOut}, '-=.1');
  } 

  leaveIT = (type, index) => {
    const tl = new TimelineMax();
    tl.to(`.about_${type}_${index}`, .5, {color:'#ffffff'});
    tl.to(`.about_${type}_${index}`, .5, {fontSize: '48px', ease: Power1.easeOut}, '-=.3');
  }
  enterButtons = (type) => {
    TweenMax.to(`.fa-${type}-about`, .4, {color: 'white'});
  }
  leaveButtons = (type) => {
    TweenMax.to(`.fa-${type}-about`, .4, {color: '#59bd8e'});
  }
  enterLink = (type) => {
    TweenMax.to(`.about_link_${type}`, .4, {color: 'white'});
  }
  leaveLink = (type) => {
    TweenMax.to(`.about_link_${type}`, .4, {color: '#59bd8e'});
  }

  render = () => {
    return (
      <main className="About">
        <aside className="about-left-side">
          <div className="about-left-border"/>
          <heading className="about-heading">
            <h1>About me</h1>
          </heading>
        </aside>
        <article className="about-article">
          <section className="about-intro-section">
            <p className="about-paragraph">I began learning to code in 2017, at <a onMouseEnter={()=>{this.enterLink('code')}} onMouseLeave={()=>{this.leaveLink('code')}} className="about_link about_link_code" href="https://freecodecamp.org" target="_blank" rel="noopener noreferrer">freecodecamp.org</a>. There, I taught myself the basics of HTML, CSS and JavaScript. I also created some of my first projects: A <a onMouseEnter={()=>{this.enterLink('poke')}} onMouseLeave={()=>{this.leaveLink('poke')}} className="about_link about_link_poke" href="https://pokedex-dlv.firebaseapp.com/" target="_blank" rel="noopener noreferrer">Pokedex</a> and the <a onMouseEnter={()=>{this.enterLink('gol')}} onMouseLeave={()=>{this.leaveLink('gol')}} className="about_link about_link_gol" href="https://game-of-life-dlv.firebaseapp.com/" target="_blank" rel="noopener noreferrer">Game of life.</a> They weren't perfect, but they were fun to make. It definitely set the path to pursuing a career in software development!</p>
            <p className="about-paragraph">Later that same year, I attended <a onMouseEnter={()=>{this.enterLink('dev')}} onMouseLeave={()=>{this.leaveLink('dev')}} className="about_link about_link_dev" href="https://devmountain.com" target="_blank" rel="noopener noreferrer">DevMountain</a>, an intense 13 week coding bootcamp. While there, I started learning fullstack web development, specifically with ReactJS. I spent 900+ hours learning new technologies and developing personal projects.</p>
            <p className="about-paragraph">After graduating from the bootcamp and receiving my Javascript Web Development <a onMouseEnter={()=>{this.enterLink('cert')}} onMouseLeave={()=>{this.leaveLink('cert')}} className="about_link about_link_cert" href="https://www.youracclaim.com/badges/a02aa461-981c-4ca2-a195-1df270e5716f" target="_blank" rel="noopener noreferrer">Badge</a>, I joined a startup company named <a onMouseEnter={()=>{this.enterLink('vibix')}} onMouseLeave={()=>{this.leaveLink('vibix')}} className="about_link about_link_vibix" href="https://vibix-web.firebaseapp.com/" target="_blank" rel="noopener noreferrer">Vibix</a>. We worked on developing shopify apps to automate users' daily time-consuming tasks. I was solely responsible to build the web presence of the company by utilizing the latest technology (ReactJS/Redux/Cloud Functions/Firebase).</p>
            <p className="about-paragraph">I don't just code, music and fitness are also a big part of my life! If you would like to see more, check out my social media!</p>
          </section>
          {/* <img alt="Profile pic of me" className="about_profile" height={32} width={32} src={Profile}/> */} 
        </article>
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
      dispatch({
        type:actions.SET_MOUNTED_COMP, value
      });
    }
  }
}
const AnimatedAbout = AnimateHOC()(About);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnimatedAbout);
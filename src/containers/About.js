import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../styles/about.css'
import * as actions from '../redux/actions/nav.actions';
import Profile from '../res/profile_picture.png';
import AnimateHOC from '../hocs/Animate';
import { TimelineMax, Power1, TweenMax } from 'gsap';
import { debounce } from '../utility/utility';

class About extends Component {
  constructor(props) {
    super(props)
    this.state = {
      introText: "About me",
    }
  }

  componentWillMount = () => {
    this.props.setMountedComp('user');
  }
  componentDidMount = () => {
    const tl = new TimelineMax(); // heading
    
    this.windowResize(true);
    tl.staggerFrom('.about_it', 1, {opacity: 0}, .05, '+=.2')
    .staggerTo('.about_it', .1, {color: '#59bd8e'}, .05, '-=1.3')
    .staggerTo('.about_it', .3, {fontSize: '56px', ease: Power1.easeOut}, .05, '-=1.3')
    .staggerTo('.about_it', .5, {color:'#ffffff'}, .03, '-=1')
      .staggerTo('.about_it', .5, {fontSize: '48px', ease: Power1.easeOut}, .03, '-=.8');
      
    const ttl = new TimelineMax(); // text
    ttl.fromTo('.about_p', 1, {opacity:0}, {opacity:1}, '+=.2')
      .fromTo('.about_span', 1, {opacity:0}, {opacity:1}, '-=1');
    
    const ptl = new TimelineMax(); // picture
    ptl.fromTo('.about_profile', 1, {opacity:0}, {opacity:1}, '+=.2')
      .fromTo('.about_profile_mobile', 1, {opacity:0}, {opacity:1}, '-=1')

    window.onresize = debounce(this.windowResize, 50, 200);
  }

  windowResize = (immediate) => {
    let ease = Power1.easeOut;
    let textLeft;
    let textTop;
    let textPadding;
    let textMargin;
    let textWidth;
    let textStyle;
    let time = immediate? 0 : .3;
    const innerWidth = window.innerWidth;
    if (innerWidth > 1100) {
      textLeft = 0;
      textTop = 0;
      textPadding = '0 0 0 100px';
      textWidth = '600px';
      textMargin = 0;
    }
    if (innerWidth <= 1100) {
      textLeft = 0;
      textTop = 70;
      textPadding = '0 0 0 20px';
      textWidth = '600px';
      textMargin = 0;
    }
    if (innerWidth < 1000) {
      textLeft = 0;
      textTop = 70;
      textPadding = 0;
      textWidth = '500px';
      textMargin = '0 auto'
    }
    if (innerWidth < 700) {
      textLeft = 0;
      textTop = 70;
      textPadding = 0;
      textWidth = '400px';
      textMargin = '0 auto'
    }
    if (innerWidth < 500) {
      textLeft = 0;
      textTop = 70;
      textPadding = 0;
      textWidth = '350px';
      textMargin = '0 auto'
    }
    if (innerWidth < 420) {
      textLeft = 0;
      textTop = 70;
      textPadding = 0;
      textWidth = '80%';
      textMargin = '0 auto'
    }
    textStyle = {
      left: textLeft,
      marginTop: textTop,
      padding: textPadding,
      width: textWidth,
      margin: textMargin,
      ease,
    }

    TweenMax.to('.about_intro_section', time, textStyle);
    
    let pSize;
    let pStyle;
    if (innerWidth >= 420) {
      pSize = '16px';
    }
    if (innerWidth < 420) {
      pSize = '12px';
    }
    pStyle = {
      fontSize: pSize
    }
    TweenMax.to('.about_p', time, pStyle);
    TweenMax.to('.about_span', time, pStyle);

    let imageHeight;
    let imageWidth;
    let imageLeft;

    if (innerWidth >= 1250) {
      imageHeight = 400;
      imageWidth = 400;
      imageLeft = '5%';
    }

    if (innerWidth < 1250) {
      imageHeight = 300;
      imageWidth = 300;
      imageLeft = '2%';
    }
    if (innerWidth < 1100) {
      imageHeight = 300;
      imageWidth = 300;
      imageLeft = '5%';
    }

    let imageStyle = {
      height: imageHeight,
      width: imageWidth,
      left: imageLeft,
      ease,
    };

    TweenMax.to('.about_profile', time, imageStyle);
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
    const { state } = this;
    let introText;
    introText = state.introText.split('');
    introText = introText.map((el, i)=>{
      return (
        <h1 key={i} onMouseEnter={()=>{this.enterIT('it', i)}} onMouseLeave={()=>{this.leaveIT('it', i)}} className={` about_it about_it_${i}`}>{el}{el===' ' ? '\xa0':''}</h1>
      )
    })
    const socialMedia = [
      <a key={'about_ig'} className="about_social_media" href="https://www.instagram.com/f.dlv" rel="noopener noreferrer" target="_blank"><i onMouseEnter={()=>{this.enterButtons('instagram')}} onMouseLeave={()=>{this.leaveButtons('instagram')}} className="fab fa-instagram fa-instagram-about"/></a>,
      <a key={'about_gb'} className="about_social_media" href="https://www.facebook.com/fernandodlv32" rel="noopener noreferrer" target="_blank"><i onMouseEnter={()=>{this.enterButtons('facebook')}} onMouseLeave={()=>{this.leaveButtons('facebook')}} className="fab fa-facebook fa-facebook-about"/></a>,
      <a key={'about_li'} className="about_social_media" href="https://www.linkedin.com/in/fernandodlv" rel="noopener noreferrer" target="_blank"><i onMouseEnter={()=>{this.enterButtons('linkedin')}} onMouseLeave={()=>{this.leaveButtons('linkedin')}} className="fab fa-linkedin fa-linkedin-about"/></a>
    ]
    return (
      <main className={'About'}>
        <section className="about_intro_section">
          <span className="about_body_span about_span">{"<body>"}</span>
            <span className="about_h1_span about_span">{"<h1>"}</span>
              <aside>
              {introText}
              <img src={Profile} className="about_profile_mobile"/>
              </aside>
            <span className="about_h1_span about_span">{"<h1/>"}</span>
            <span className="about_p_span about_span">{"<p>"}</span>
              <p className="about_p">I began learning to code in 2017, at <a onMouseEnter={()=>{this.enterLink('code')}} onMouseLeave={()=>{this.leaveLink('code')}} className="about_link about_link_code" href="https://freecodecamp.org" target="_blank" rel="noopener noreferrer">freecodecamp.org</a>. There, I taught myself the basics of HTML, CSS and JavaScript. I also created some of my first projects: A <a onMouseEnter={()=>{this.enterLink('poke')}} onMouseLeave={()=>{this.leaveLink('poke')}} className="about_link about_link_poke" href="https://pokedex-dlv.firebaseapp.com/" target="_blank" rel="noopener noreferrer">Pokedex</a> and the <a onMouseEnter={()=>{this.enterLink('gol')}} onMouseLeave={()=>{this.leaveLink('gol')}} className="about_link about_link_gol" href="https://game-of-life-dlv.firebaseapp.com/" target="_blank" rel="noopener noreferrer">Game of life.</a> They weren't perfect, but they were fun to make. It definitely set the path to pursuing a career in software development!</p>
              <span className="about_br_span about_span">{"<br/>"}</span>
              <p className="about_p">Later that same year, I attended <a onMouseEnter={()=>{this.enterLink('dev')}} onMouseLeave={()=>{this.leaveLink('dev')}} className="about_link about_link_dev" href="https://devmountain.com" target="_blank" rel="noopener noreferrer">DevMountain</a>, an intense 13 week coding bootcamp. While there, I started learning fullstack web development, specifically with ReactJS. I spent 900+ hours learning new technologies and developing personal projects.</p>
              <span className="about_br_span about_span">{"<br/>"}</span>
              <p className="about_p">After graduating from the bootcamp and receiving my Javascript Web Development <a onMouseEnter={()=>{this.enterLink('cert')}} onMouseLeave={()=>{this.leaveLink('cert')}} className="about_link about_link_cert" href="https://www.youracclaim.com/badges/a02aa461-981c-4ca2-a195-1df270e5716f" target="_blank" rel="noopener noreferrer">Badge</a>, I joined a startup company named <a onMouseEnter={()=>{this.enterLink('vibix')}} onMouseLeave={()=>{this.leaveLink('vibix')}} className="about_link about_link_vibix" href="https://vibix-web.firebaseapp.com/" target="_blank" rel="noopener noreferrer">Vibix</a>. We worked on developing shopify apps to automate users' daily time-consuming tasks. I was solely responsible to build the web presence of the company by utilizing the latest technology (ReactJS/Redux/Cloud Functions/Firebase).</p>
              <span className="about_br_span about_span">{"<br/>"}</span>
              <p className="about_p">I don't just code, music and fitness are also a big part of my life! If you would like to see more, check out my social media! {socialMedia}</p>
            <span className="about_p_span about_span">{"</p>"}</span>
          <span className="about_body_span about_span">{"</body>"}</span>
        </section>
        <img className="about_profile" src={Profile}/>
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
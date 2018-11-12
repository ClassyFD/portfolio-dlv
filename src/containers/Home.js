import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TweenMax, TimelineMax, Power1 } from 'gsap';
import { Link } from 'react-router-dom';
import FLogo from '../res/f_logo.png'
import Portrait from '../res/portrait.png';
import * as actions from '../redux/actions/nav.actions';
import '../styles/home.css';
import AnimateHOC from '../hocs/Animate';
import { debounce } from '../utility/utility';

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      introText1: "Hi,",
      introText2: "I'm Fernando,",
      introText3: "web developer.",
    }
  }

  componentWillMount = () => {
    this.props.setMountedComp('home');
  }

  componentDidMount = () => {
    const tl = new TimelineMax();
    const ptl = new TimelineMax();
    const sptl = new TimelineMax();
    const btl = new TimelineMax();
    const ltl = new TimelineMax();
    let largeFont = '56px';
    let smallFont = '48px';

    tl.staggerFrom('.home_it1', 1, {opacity: 0}, .05, '+=.3')
      .staggerTo('.home_it1', .1, {color: '#59bd8e'}, .05, '-=1.4')
      .staggerTo('.home_it1', .3, {fontSize: largeFont, ease: Power1.easeOut}, .05, '-=1.4')
      .staggerTo('.home_it1', .5, {color:'#ffffff'}, .03, '-=1')
      .staggerTo('.home_it1', .5, {fontSize: smallFont, ease: Power1.easeOut}, .03, '-=.8');
      
    tl.staggerFrom('.home_it2', 1, {opacity: 0}, .05, '-=.6')
      .staggerTo('.home_it2', .1, {color: '#59bd8e'}, .05, '-=1.6')
      .staggerTo('.home_it2', .3, {fontSize: largeFont, ease: Power1.easeOut}, .05, '-=1.6')
      .staggerTo('.home_it2', .5, {color:'#ffffff'}, .03, '-=1.3')
      .staggerTo('.home_it2', .5, {fontSize: smallFont, ease: Power1.easeOut}, .03, '-=1.3');

    tl.staggerFrom('.home_it3', 1, {opacity: 0}, .05, '-=.8')
      .staggerTo('.home_it3', .1, {color: '#59bd8e'}, .05, '-=1.9')
      .staggerTo('.home_it3', .3, {fontSize: largeFont, ease: Power1.easeOut}, .05, '-=1.9')
      .staggerTo('.home_it3', .5, {color:'#ffffff'}, .03, '-=1.5')
      .staggerTo('.home_it3', .5, {fontSize: smallFont, ease: Power1.easeOut}, .04, '-=1.7');

    ptl.from('.home_p', 1, {opacity: 0}, '+=2');
    sptl.from('.home_h1_span', 1, {opacity: 0}, '+=2');
    ltl.from('.home_logo', 1, {opacity: 0}, '+=2')
    btl.from('.home_button', 1, {opacity: 0}, '+=2')
      .from('.home_button_span', 1, {opacity: 0}, '-=1');

    this.windowResize();
    window.onresize = debounce(this.windowResize, 50, 200);
  }

  windowResize = () => {
    let logoHeight;
    let logoTop;
    let logoLeft;
    let ease = Power1.easeOut;
    let logoStyle;
    const innerWidth = window.innerWidth;
    if (innerWidth >= 1290) {
      logoHeight = 600;
      logoTop = '10vh';
      logoLeft = '55%';
    }
    if (innerWidth < 1290) {
      logoHeight = 500;
      logoTop = '17vh';
      logoLeft = '60%';
    }
    if (innerWidth < 1188) {
      logoHeight = 400;
      logoTop = '24vh';
      logoLeft = '65%';
    }
    if (innerWidth < 1100) {
      logoLeft = '55%'
    }
    if (innerWidth < 800) {
      logoLeft = '60%'
      logoHeight = 300;

    }
    if (innerWidth < 740) {
      logoLeft = '55%';
      logoHeight = 200;
      logoTop = '55vh';
    }

    logoStyle = {
      height: logoHeight,
      top: logoTop,
      left: logoLeft,
      ease
    }
    if (logoHeight) {
      TweenMax.to('.home_logo', .3, logoStyle)
    }
    let introLeft;
    let introStyle;
    let introTop;
    if (innerWidth >= 1100) {
      introLeft = 0;
      introTop = '30vh';
    }
    if (innerWidth < 1100) {
      introLeft = -50;
      introTop = '20vh';
    }
    if (innerWidth < 740) {
      introLeft = -90;
      introTop = '90px';
    }
    introStyle = {
      left: introLeft,
      marginTop: introTop,
      ease,
    }
    TweenMax.to('.home_intro_section', .3, introStyle);
  }

  enterIT = (type, index) => {
    const tl = new TimelineMax();
    tl.to(`.home_${type}_${index}`, .1, {color: '#59bd8e'});
    tl.to(`.home_${type}_${index}`, .3, {fontSize: '56px', color: '#59bd8e', ease: Power1.easeOut}, '-=.1');
  } 
  leaveIT = (type, index) => {
    const tl = new TimelineMax();
    tl.to(`.home_${type}_${index}`, .5, {color:'#ffffff'});
    tl.to(`.home_${type}_${index}`, .5, {fontSize: '48px', ease: Power1.easeOut}, '-=.3');
  }
  enterButton = () => {
    TweenMax.to('.home_button', .3, {backgroundColor: '#59bd8e', color: 'white'});
  }
  leaveButton = () => {
    TweenMax.to('.home_button', .3, {backgroundColor: 'transparent', color: '#59bd8e'});
  }

  render = () => {
    const { state } = this;
    let introText1;
    let introText2;
    let introText3;
    introText1 = state.introText1.split('');
    introText1 = introText1.map((el, i)=>{
      return (
        <h1 key={i} onMouseEnter={()=>{this.enterIT('it1', i)}} onMouseLeave={()=>{this.leaveIT('it1', i)}} className={` home_it home_it1 home_it1_${i}`}>{el}</h1>
      )
    })
    introText2 = state.introText2.split('');
    introText2 = introText2.map((el, i)=>{
      return (
        <h1 key={i} onMouseEnter={()=>{this.enterIT('it2', i)}} onMouseLeave={()=>{this.leaveIT('it2', i)}} className={` home_it home_it2 home_it2_${i}`}>{el}{el==='m' ? '\xa0':''}</h1>
      )
    })
    introText3 = state.introText3.split('');
    introText3 = introText3.map((el, i)=>{
      return (
        <h1 key={i} onMouseEnter={()=>{this.enterIT('it3', i)}} onMouseLeave={()=>{this.leaveIT('it3', i)}} className={` home_it home_it3 home_it3_${i}`}>{el}{el==='m' || el==='k' || el==='b' ? '\xa0':''}</h1>
      )
    })

    return (
      <main className={'Home'}>
        <section className="home_intro_section">
          <span className="home_h1_span">{"<h1>"}</span>
          <aside>{introText1}</aside>
          <aside>{introText2}</aside>
          <aside>{introText3}</aside>
          <span className="home_h1_span">{"<h1/>"}</span>
          <p className="home_p">
            <span className="home_p_span">{"<p>"}</span>
            &nbsp; ReactJS / NodeJS / Responsive web design &nbsp;
            <span className="home_p_span">{"</p>"}</span>
          </p>
          <span className="home_button_span">{"<button>"}</span>
          <Link className="home_link" to="/contact"><button className="home_button" onMouseEnter={this.enterButton} onMouseLeave={this.leaveButton}>C O N T A C T  &nbsp;&nbsp; M E</button></Link>
          <span className="home_button_span">{"</button>"}</span>
        </section>
        <img alt="home logo" className="home_logo" src={FLogo}/>
        <img alt="please flip device" className="home_mobile_flip" src={Portrait}/>
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
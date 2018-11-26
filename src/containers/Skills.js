import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../styles/skills.css'
import * as actions from '../redux/actions';
import AnimateHOC from '../hocs/Animate';
import { TimelineMax, TweenMax, Power1, Power0 } from 'gsap';
import { Link } from 'react-router-dom';
import { debounce } from '../utility/utility';

const animationTL = new TimelineMax();
class Skills extends Component {
  constructor(props) {
    super(props)
    this.state = {
      introText: 'My Skills',
      list1: [
        'JS', 'CSS3', 'HTML5', 'AngularJS', 'NodeJS', 
        'SASS', 'SCSS', 'MassiveJS', 'PostgreSQL', 'Redux', 
        'ExpressJS', 'Amazon Web Services', 'Google Cloud Platform', 'Firebase', 
        'RESTful APIs', 'Chrome Extension Development', 'Greensock Animating Platform',
        'NGINX', 'Linux/Unix administration', 'Python', 'Git/Github', 'jQuery',
        'Bootstrap', 'Auth0', 'StripeJS'
      ],
      list2: ["ReactJS"],
      choice: 'list1',
      currentText: 'ReactJS',
      previousText: 'ReactJS',
      plane: 'front',

    }
  }

  componentWillMount = () => {
    this.props.setMountedComp('cog');
  }
  
  componentDidMount = () => {
    const tl = new TimelineMax(); // heading
  
    tl.staggerFrom('.skills_it', 1, {opacity: 0}, .05, '+=.2')
    .staggerTo('.skills_it', .1, {color: '#59bd8e'}, .05, '-=1.3')
    .staggerTo('.skills_it', .3, {fontSize: '56px', ease: Power1.easeOut}, .05, '-=1.3')
    .staggerTo('.skills_it', .5, {color:'#ffffff'}, .03, '-=1')
      .staggerTo('.skills_it', .5, {fontSize: '48px', ease: Power1.easeOut}, .03, '-=.8');
      
    const ttl = new TimelineMax(); // text
    ttl.fromTo('.skills_p', 1, {opacity:0}, {opacity:1}, '+=.2')
      .fromTo('.skills_span', 1, {opacity:0}, {opacity:1}, '-=1');

    const ptl = new TimelineMax(); // picture
    ptl.fromTo('.skills_wrap', 1, {opacity:0}, {opacity:1}, '+=.2')

    this.animateBox();
    window.onresize = debounce(this.windowResize, 50, 200);
    this.windowResize(true);
  }
  
  componentWillUnmount = () => {
    animationTL.clear();
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
      textTop = 0;
      textPadding = '0 0 0 20px';
      textWidth = '600px';
      textMargin = 0;
    }
    if (innerWidth < 1000) {
      textLeft = 0;
      textTop = 0;
      textPadding = 0;
      textWidth = '500px';
      textMargin = '0 auto'
    }
    if (innerWidth < 700) {
      textLeft = 0;
      textTop = 0;
      textPadding = 0;
      textWidth = '90%';
      textMargin = '0 auto'
    }
    if (innerWidth < 460) {
      textLeft = 0;
      textTop = 0;
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

    TweenMax.to('.skills_intro_section', time, textStyle);
    
    let pSize;
    let pStyle;
    if (innerWidth >= 460) {
      pSize = '16px';
    }
    if (innerWidth < 460) {
      pSize = '12px';
    }
    pStyle = {
      fontSize: pSize
    }
    TweenMax.to('.skills_p', time, pStyle);
    TweenMax.to('.skills_span', time, pStyle);

    let imageLeft;
    if (innerWidth >= 1250) {
      imageLeft = '15%';
    }

    if (innerWidth < 1250) {
      imageLeft = '10%';
    }
    if (innerWidth < 1100) {
      imageLeft = '10%';
    }
    if (innerWidth < 1000) {
      imageLeft = 0;
    }

    let imageStyle = {
      left: imageLeft,
      ease,
    };

    TweenMax.to('.skills_wrap', time, imageStyle);
  }

  animateBox = () => {
    const { state } = this;
    let { choice, currentText, list1, list2 } = state;
    const list = state[choice];
    const randomNum = Math.ceil(Math.random() * 4);
    const rotationX = randomNum===1? '90deg' : randomNum===2? '-90deg' : '0deg';
    const rotationY = randomNum===3? '90deg' : randomNum===4? '-90deg' : '0deg';
    const item = list[Math.floor(Math.random()*list.length)];
    const index = list.indexOf(item);

    if (choice === 'list1') {
      list2.push(list1[index]);
      list1.splice(index, 1)
    } else {
      list1.push(list2[index]);
      list2.splice(index, 1)
    }
    
    if (list.length === 0) {
      choice = choice==='list1'? 'list2' : 'list1';
    }

    this.setState({
      currentText: item,
      previousText: currentText,
      list1,
      list2,
      choice,
    });
    
    animationTL.to('.skills_cube', 0, {rotationY: '0deg', rotationX: '0deg'})
      .to('.skills_cube', 1.5, {rotationY, rotationX, ease:Power0.easeOut})
      .to('.skills_cube', 0, {rotationY: '0deg', rotationX: '0deg'})
      .call(this.animateBox);      
    // if (item === 'Greensock Animating Platform') {
    //   animationTL.to('.skills_cube_el', .4, {backgroundColor: 'blue', ease: Power1.easeOut}, '-=1.5')
    //     .to('.skills_cube_el', .4, {backgroundColor: 'red', ease: Power1.easeOut}, '-=1.1')
    //     .to('.skills_cube_el', .4, {backgroundColor: 'white', ease: Power1.easeOut}, '-=.7')
    //     .to('.skills_cube_el', .3, {backgroundColor: '#59bd8e', ease: Power1.easeOut}, '-=.3');
    // }
  }

  enterLink = (type) => {
    TweenMax.to(`.skills_link_${type}`, .4, {color: 'white'});
  }
  leaveLink = (type) => {
    TweenMax.to(`.skills_link_${type}`, .4, {color: '#59bd8e'});
  }
  enterIT = (type, index) => {
    const tl = new TimelineMax();
    tl.to(`.skills_${type}_${index}`, .1, {color: '#59bd8e'});
    tl.to(`.skills_${type}_${index}`, .3, {fontSize: '56px', color: '#59bd8e', ease: Power1.easeOut}, '-=.1');
  }
  leaveIT = (type, index) => {
    const tl = new TimelineMax();
    tl.to(`.skills_${type}_${index}`, .5, {color:'#ffffff'});
    tl.to(`.skills_${type}_${index}`, .5, {fontSize: '48px', ease: Power1.easeOut}, '-=.3');
  }

  render() {
    const { state } = this;
    let introText;
    introText = state.introText.split('');
    introText = introText.map((el, i)=>{
      return (
        <h1 key={i} onMouseEnter={()=>{this.enterIT('it', i)}} onMouseLeave={()=>{this.leaveIT('it', i)}} className={` skills_it skills_it_${i}`}>{el}{el===' ' ? '\xa0':''}</h1>
      )
    })
    return (
      <main className={'Skills'}>
        <section className="skills_intro_section">
          <span className="skills_body_span skills_span">{"<body>"}</span>
            <span className="skills_h1_span skills_span">{"<h1>"}</span>
              <aside className="skills_h1">
              {introText}
              </aside>
            <span className="skills_h1_span skills_span">{"<h1/>"}</span>
            <span className="skills_p_span skills_span">{"<p>"}</span>
              <p className="skills_p">I mainly work with front end technology (HTML5, CSS3, ES5/ES6 JavaScript) to build scalable, responsive, single page web applications. I use ReactJS for most of my projects, and manage state with Redux.</p>
              <span className="skills_br_span skills_span">{"<br/>"}</span>
              <p className="skills_p">For the back end, I usually build Express apps with NodeJS. I handle database management with either MassiveJS or Firebase. I host all of my websites with Firebase as well.</p>
              <span className="skills_br_span skills_span">{"<br/>"}</span>
              <p className="skills_p">I have experience with Amazon Web Services and Google Cloud Platform. I've used many APIs and a variety of libraries in my apps. I also like to add animation to make the apps stand out a bit more!</p>
              <span className="skills_br_span skills_span">{"<br/>"}</span>
              <p className="skills_p">If you would like to know more, check out my <a onMouseEnter={()=>{this.enterLink('linkedin')}} onMouseLeave={()=>{this.leaveLink('linkedin')}} className="skills_link skills_link_linkedin" href="https://linkedin.com/in/fernandodlv" target="_blank" rel="noopener noreferrer">LinkedIn</a>, or just <Link to='/contact' onMouseEnter={()=>{this.enterLink('contact')}} onMouseLeave={()=>{this.leaveLink('contact')}} className="skills_link skills_link_contact">contact</Link> me!</p>
            <span className="skills_p_span skills_span">{"</p>"}</span>
          <span className="skills_body_span skills_span">{"</body>"}</span>
        </section>
        <section className="skills_wrap">
          <aside className="skills_cube">
            <div className="skills_cube_el skills_cube_front">{this.state.previousText}</div>
            <div className="skills_cube_el skills_cube_top">{this.state.currentText}</div>
            <div className="skills_cube_el skills_cube_bottom">{this.state.currentText}</div>
            <div className="skills_cube_el skills_cube_left">{this.state.currentText}</div>
            <div className="skills_cube_el skills_cube_right">{this.state.currentText}</div>
          </aside>
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

const animatedSkills = AnimateHOC()(Skills)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(animatedSkills);
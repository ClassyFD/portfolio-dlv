import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../styles/projects.css'
import * as actions from '../redux/actions';
import AnimateHOC from '../hocs/Animate';
import LandingVibixScheduler from '../res/landing-vibix-scheduler.png';
import LandingVibixConsignment from '../res/landing-vibix-consignment.png';
import LandingVibixWeb from '../res/landing-vibix-web.png';
import LandingIfunny from '../res/landing_ifunny.png';
import LandingQuiltback from '../res/landing-quiltback.png';
import LandingDeliwin from '../res/landing-deliwin.png';
import GameOfLife from '../res/game-of-life.png';
import { TweenMax, TimelineMax, Power1 } from 'gsap';
import { debounce } from '../utility/utility';

class Projects extends Component {
  constructor(props) {
    super(props)
    this.state = {
      introText: 'My Projects',
      projects: [
        {
          name: 'Vibix Scheduler',
          description: <p>Shopify app built to help store owners create, apply, and manage discounts for thousands of products.</p>,
          image: LandingVibixScheduler,
        },
        {
          name: 'Vibix Consignment',
          description: <p>Shopify app built to allow store owners to create consignors. Owners can track historical consignor balances, sales, deductions and inventory’s age.</p>,
          image: LandingVibixConsignment,
        },
        {
          name: 'Vibix Web',
          description: <p>Website built in order to ramp-up the digital presence of Vibix Automation.</p>,
          image: LandingVibixWeb,
          href: "https://vibix-web.firebaseapp.com",
        },
        {
          name: 'iFunny',
          description: <p>Cloned and customized <a className="projects_link" target="_blank" rel="noopener noreferrer" href="https://ifunny.co">ifunny.co</a>, a website meant for posting funny pictures & GIFs which are viewed by tens of thousands people a day.</p>,
          image: LandingIfunny,
        },
        {
          name: 'Quiltback',
          description: <p>Website built for a Utah based 501(c) to allow users its users to communicate by creating blogs, and host events to raise money through auctioning quilts.</p>,
          image: LandingQuiltback,
        },
        {
          name: 'Deliwin Cafe',
          description: <p>Designed, and created a cafe restaurant's website that sells hispanic and vietnamese food. (Not a real business.)</p>,
          image: LandingDeliwin,
        },
        {
          name: 'Game of Life',
          description: <p>A clone of <a className="projects_link" href="https://bitstorm.org/gameoflife/" target="_blank" rel="noopener noreferrer">John Conway's Game of Life</a> with my own design.</p>,
          image: GameOfLife,
          href: "https://game-of-life-fd.firebaseapp.com",
        },
      ]
    }
  }

  componentWillMount = () => {
    this.props.setMountedComp('eye');
  }

  componentDidMount = () => {
    const tl = new TimelineMax(); // heading
  
    tl.staggerFrom('.projects_it', 1, {opacity: 0}, .05, '+=.2')
    .staggerTo('.projects_it', .1, {color: '#59bd8e'}, .05, '-=1.5')
    .staggerTo('.projects_it', .3, {fontSize: '56px', ease: Power1.easeOut}, .05, '-=1.3')
    .staggerTo('.projects_it', .5, {color:'#ffffff'}, .03, '-=1')
      .staggerTo('.projects_it', .5, {fontSize: '48px', ease: Power1.easeOut}, .03, '-=.8');
      
    const ttl = new TimelineMax(); // text
    ttl.fromTo('.projects_p', 1, {opacity:0}, {opacity:1}, '+=.2')
      .fromTo('.projects_span', 1, {opacity:0}, {opacity:1}, '-=1');
    
    const ptl = new TimelineMax(); // picture
    ptl.fromTo('.projects_profile', 1, {opacity:0}, {opacity:1}, '+=.2')
      .fromTo('.projects_profile_mobile', 1, {opacity:0}, {opacity:1}, '-=1')

    window.onresize = debounce(this.windowResize, 50, 200);
    this.windowResize(true);
  }

  windowResize = (immediate) => {
    let ease = Power1.easeOut;
    let textTop;
    let textPadding;
    let textStyle;
    let time = immediate? 0 : .3;
    const innerWidth = window.innerWidth;
    if (innerWidth > 1100) {
      textPadding = '50px 50px 20px 50px';
      textTop = 0;
    }
    if (innerWidth <= 1100) {
      textPadding = '50px 50px 20px 50px';
      textTop = 70;
    }
    textStyle = {
      marginTop: textTop,
      padding: textPadding,
      ease,
    }

    TweenMax.to('.projects_intro_section', time, textStyle);
  }

  enterProject = (index) => {
    TweenMax.to(`.projects_img_${index}`, .4, {opacity: 1})
    TweenMax.to(`.projects_h2_${index}`, .4, {color: '#59bd8e'})
  }
  
  leaveProject = (index) => {
    TweenMax.to(`.projects_img_${index}`, .4, {opacity: .7})
    TweenMax.to(`.projects_h2_${index}`, .4, {color: 'white'})
  }

  enterIT = (type, index) => {
    const tl = new TimelineMax();
    tl.to(`.projects_${type}_${index}`, .1, {color: '#59bd8e'});
    tl.to(`.projects_${type}_${index}`, .3, {fontSize: '56px', color: '#59bd8e', ease: Power1.easeOut}, '-=.1');
  } 

  leaveIT = (type, index) => {
    const tl = new TimelineMax();
    tl.to(`.projects_${type}_${index}`, .5, {color:'#ffffff'});
    tl.to(`.projects_${type}_${index}`, .5, {fontSize: '48px', ease: Power1.easeOut}, '-=.3');
  }
  enterButtons = (type) => {
    TweenMax.to(`.fa-${type}-projects`, .4, {color: 'white'});
  }
  leaveButtons = (type) => {
    TweenMax.to(`.fa-${type}-projects`, .4, {color: '#59bd8e'});
  }

  render = () => {
    const { state } = this;
    let introText;
    introText = state.introText.split('');
    introText = introText.map((el, i)=>{
      return (
        <h1 key={i} onMouseEnter={()=>{this.enterIT('it', i)}} onMouseLeave={()=>{this.leaveIT('it', i)}} className={`projects_it projects_it_${i}`}>{el}{el===' ' ? '\xa0':''}</h1>
      )
    })
    const projects = this.state.projects.map((el, i) => {
      return (
        <div onMouseEnter={()=>{this.enterProject(i)}} onMouseLeave={()=>{this.leaveProject(i)}} key={i} className={`projects_el`}>
          {el.href? (
            <a href={el.href} target="_blank" rel="noopener noreferrer">
              <img className={`projects_img_${i}`} alt={`project page ${el.name}`} src={el.image} />
            </a>
          ) : (
            <img className={`projects_img_${i}`} alt={`project page ${el.name}`} src={el.image} />
          )}
          <h2 className={`projects_h2_${i}`}>{el.name}</h2>
          {el.description}
        </div>
      )
    })
    const github = <a onMouseEnter={()=>{this.enterButtons('github')}} onMouseLeave={()=>{this.leaveButtons('github')}} className="projects_social_media" href="https://github.com/ClassyFD" rel="noopener noreferrer" target="_blank"><i className="fab fa-github fa-github-projects"/></a>
    return (
      <main className={'Projects'}>
        <section className="projects_intro_section">
          <span className="projects_h1_span projects_span">{"<h1>"}</span>
          <aside>
            {introText}
          </aside>
          <span className="projects_h1_span projects_span">{"</h1>"}</span>
          <span className="projects_p_span projects_span">{"<p>"}</span>
            <p className="projects_p">You can also check out my github for more of my mini projects! {github}</p>
          <span className="projects_p_span projects_span">{"</p>"}</span>
        </section>
        <section className="projects_project_section">
          {projects}
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

const animatedProject = AnimateHOC()(Projects);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(animatedProject);
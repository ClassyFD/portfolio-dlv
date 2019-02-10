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
import HALanding from '../res/ha-landing.png';
import { TweenMax } from 'gsap';

class Projects extends Component {
  constructor(props) {
    super(props)
    this.state = {
      introText: 'My Projects',
      projects: [
        {
          name: 'Hispanic Alliance of GA',
          description: <p>Helped a non-profit redo/update their wordpress website. Added spanish translations, storyboards, and refactored old components.</p>,
          image: HALanding,
        },
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
        },
        {
          name: 'iFunny',
          description: <p>Cloned and customized <a onMouseEnter={()=>{this.enterLink('ifunny')}} onMouseLeave={()=>{this.leaveLink('ifunny')}} className="projects-link projects-link-ifunny" target="_blank" rel="noopener noreferrer" href="https://ifunny.co">ifunny.co</a>, a website meant for posting funny pictures & GIFs which are viewed by tens of thousands people a day.</p>,
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
          description: <p>A clone of <a onMouseEnter={()=>{this.enterLink('gol')}} onMouseLeave={()=>{this.leaveLink('gol')}} className="projects-link projects-link-gol" href="https://bitstorm.org/gameoflife/" target="_blank" rel="noopener noreferrer">John Conway's Game of Life</a> with my own design.</p>,
          image: GameOfLife,
          href: "https://game-of-life-fd.firebaseapp.com",
        },
      ]
    }
  }

  componentWillMount = () => {
    this.props.setMountedComp('projects');
  }

  enterProject = (index) => {
    TweenMax.to(`.projects-img-${index}`, .4, {opacity: 1})
    TweenMax.to(`.projects-h2-${index}`, .4, {color: '#80ceb9'})
  }
  
  leaveProject = (index) => {
    TweenMax.to(`.projects-img-${index}`, .4, {opacity: .7})
    TweenMax.to(`.projects-h2-${index}`, .4, {color: '#BCDEFA'})
  }

  enterButtons = (type) => {
    TweenMax.to(`.fa-${type}-projects`, .4, {color: '#80ceb9'});
  }
  leaveButtons = (type) => {
    TweenMax.to(`.fa-${type}-projects`, .4, {color: '#BCDEFA'});
  }

  enterLink = (type) => {
    TweenMax.to(`.projects-link-${type}`, .4, {color: '#59bd8e'});
  }
  leaveLink = (type) => {
    TweenMax.to(`.projects-link-${type}`, .4, {color: '#BCDEFA'});
  }

  render = () => {
    const { state } = this;
    const projects = state.projects.map((el, i) => {
      return (
        <div onMouseEnter={()=>{this.enterProject(i)}} onMouseLeave={()=>{this.leaveProject(i)}} key={i} className={`projects-el`}>
          {el.href? (
            <a href={el.href} target="_blank" rel="noopener noreferrer">
              <img className={`projects-img-${i}`} alt={`project page ${el.name}`} src={el.image} />
            </a>
          ) : (
            <img className={`projects-img-${i}`} alt={`project page ${el.name}`} src={el.image} />
          )}
          <h2 className={`projects-h2-${i}`}>{el.name}</h2>
          {el.description}
        </div>
      )
    })
    const github = <a onMouseEnter={()=>{this.enterButtons('github')}} onMouseLeave={()=>{this.leaveButtons('github')}} className="projects-social-media" href="https://github.com/ClassyFD" rel="noopener noreferrer" target="_blank"><i className="fab fa-github fa-github-projects"/></a>
    return (
      <main className={'Projects'}>
        <article>
          <section className="projects-intro-article">
            <p className="projects-paragraph">Check out my github for more of my mini projects! {github}</p>
            <p className="projects-paragraph">(Project pages under construction)</p>
          </section>
        </article>
        <section className="projects-project-section">
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
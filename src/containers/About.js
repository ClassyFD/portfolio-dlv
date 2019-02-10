import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../styles/about.css'
import * as actions from '../redux/actions/nav.actions';
import Profile from '../res/profile_picture.png';
import AnimateHOC from '../hocs/Animate';
import { TimelineMax, TweenMax } from 'gsap';
import { Link } from 'react-router-dom';

let _isMounted = true;
const screenTL = new TimelineMax();
class About extends Component {
  constructor(props) {
    super(props)
    this.state = {
      articleSections: [],
      articleOpen: false,
      articleSelected: null,
    }
  }

  componentWillMount = () => {
    this.props.setMountedComp('about');
    const articleSections = [
      {
        title: 'Why I picked Web Development',
        paragraphs: [
          {
            title: <h2>Early childhood</h2>,
            content: <p>Growing up with access to computers It was natural for me to be attracted to technology. I could sit in front of a computer for many hours without getting bored! I was fascinated by everything about it; It felt like magic.</p>
          },
          {
            title: <h2>High school, freshman-junior years</h2>,
            content: <p>During my teenage years, I still loved technology. I knew that I wanted to create a game one day, but I still hadn't looked into programming for my future. I was also preoccupied with NJROTC, a military program they offered at my school. I was potentially looking at joining the Marine Corps or the Navy.</p>
          },
          {
            title: <h2>High school, senior year</h2>,
            content: <p>My sister called me one night and told me that web development was big these days, and that there was a lot of potential in that field. I decided that instead of joining the military, I would look into programming to see how I felt about it.</p>
          },
          {
            content: <p>I began learning to code early 2017, at <a onMouseEnter={()=>{this.enterLink('code')}} onMouseLeave={()=>{this.leaveLink('code')}} className="about-link-code" href="https://freecodecamp.org" target="_blank" rel="noopener noreferrer">freecodecamp.org</a>. There, I taught myself the basics of HTML, CSS and JavaScript. I realized that I was not only good at it, but I had a lot of fun doing it! I also created some of my first projects: A <a onMouseEnter={()=>{this.enterLink('poke')}} onMouseLeave={()=>{this.leaveLink('poke')}} className="about-link-poke" href="https://pokedex-dlv.firebaseapp.com/" target="_blank" rel="noopener noreferrer">Pokedex</a> and the <a onMouseEnter={()=>{this.enterLink('gol')}} onMouseLeave={()=>{this.leaveLink('gol')}} className="about-link-gol" href="https://game-of-life-fd.firebaseapp.com/" target="_blank" rel="noopener noreferrer">Game of life.</a> They weren't perfect, but they were fun to make. It definitely set the path to pursuing a career in software development!</p>
          },
        ]
      },
      {
        title: '2019 Goals',
        paragraphs: [
          {
            title: <h2>Learn a new Framework</h2>,
            content: <p>I would like to begin learning Vue.js or Angular.js, and clone some of my past projects with the new framework!</p>
          },
          {
            title: <h2>Find new learning opportunities</h2>,
            content: <p>Idealy, I would like to find a place that has many other developers in order to learn and watch how others code.</p>
          },
          {
            title: <h2>Github Consistency</h2>,
            content: <p>I would like to push code to github for at least 300 out of the 365 days in 2019.</p>
          },
          {
            title: <h3>Help me achieve my goals!</h3>,
            content:  <p> Send me an email: <a onMouseEnter={()=>{this.enterLink('email')}} onMouseLeave={()=>{this.leaveLink('email')}} className="about-link-email" href="mailto:fernandodlv32@gmail.com">fernandodlv32@gmail.com</a>; I'd love to talk about any potential collabs/opportunities!</p>
          }
        ]
      },
      {
        title: 'Work History',
        paragraphs: [
          {
            title: <h2>Hispanic Alliance, Wordpress Developer (01/2019 - present)</h2>,
            content: <p>Assisting a non-profit to refactor their wordpress website.</p>
          },
          {
            title: <h2>Vibix LLC, Site reliability Engineer (01/2018 - 11/2018)</h2>,
            content: <p>Joined startup company that helped e-commerce stores to automate their daily routine tasks. I was solely responsible to build the web presence of the company by utilizing the latest technology (ReactJS/Redux/Cloud Functions/Firebase).</p>
          },
          {
            content: <p>(References available upon request)</p>
          },
          {
            title: <h2>iFunny, Volunteer Fullstack Developer (02/2018 - 04/2018)</h2>,
            content: <p>Cloned and improved most features of the original website, as well as designed and implemented new ones.</p>
          },
          {
            title: <h3>7 other Projects coded with ReactJS</h3>,
            content: <p>Most of my experience comes from creating web applications for non-profits and start-ups using ReactJS. All projects have been front end, back end, or both. (fullstack)</p>
          },
          {
            content: <p>View my projects <Link onMouseEnter={()=>{this.enterLink('projects')}} onMouseLeave={()=>{this.leaveLink('projects')}} className="about-link-projects" to="/projects">here</Link>!</p>
          },
        ]
      },
      {
        title: 'Education',
        paragraphs: [
          {
            title: <h2>DevMountain</h2>,
            content: <p>I attended <a onMouseEnter={()=>{this.enterLink('dev')}} onMouseLeave={()=>{this.leaveLink('dev')}} className="about-link about-link-dev" href="https://devmountain.com" target="_blank" rel="noopener noreferrer">DevMountain</a>, an intense 13 week coding bootcamp. While there, I started learning fullstack web development, specifically with ReactJS. I spent 900+ hours learning new technologies and developing personal projects.</p>
          },
          {
            content: <p>After graduating from the bootcamp, I received a Javascript Web Development <a onMouseEnter={()=>{this.enterLink('cert')}} onMouseLeave={()=>{this.leaveLink('cert')}} className="about-link about-link-cert" href="https://www.youracclaim.com/badges/a02aa461-981c-4ca2-a195-1df270e5716f" target="_blank" rel="noopener noreferrer">Badge</a></p>
          },
        ]
      },
      {
        title: 'Hobbies',
        paragraphs: [
          {
            title: <h2>Fitness</h2>,
            content: <p>I love working out (Not as much as I love pizza though!), and I go to the gym at least 4 times a week!</p>
          },
          {
            title: <h2>Music</h2>,
            content: <p>I grew up in a family of musicians! I know how to play the piano, and a little bit of guitar.</p>
          },
          {
            title: <h2>Random activities</h2>,
            content: <p>I'm very good at ping pong, pool, and bowling. (fair warning!)</p>
          }
        ]
      },
    ]
    this.setState({
      articleSections
    })
  }
  componentDidMount = () => {
    _isMounted = true;
    this.setState({
      articleOpen: false,
      articleSelected: null 
    })
  }
  enterButtons = (type) => {
    TweenMax.to(`.fa-${type}-about`, .4, {color: 'white'});
  }
  leaveButtons = (type) => {
    TweenMax.to(`.fa-${type}-about`, .4, {color: '#59bd8e'});
  }
  enterLink = (type) => {
    TweenMax.to(`.about-link-${type}`, .4, {color: '#80ceb9'});
  }
  leaveLink = (type) => {
    TweenMax.to(`.about-link-${type}`, .4, {color: '#BCDEFA'});
  }

  enterSocialMedia = (type) => {
    TweenMax.to(`.about-fa-${type}`, .4, {color: '#BCDEFA'});
  }
  leaveSocialMedia = (type) => {
    TweenMax.to(`.about-fa-${type}`, .4, {color: 'white'});
  }

  enterArticleSection = (type) => {
    TweenMax.to(`.about-article-title-${type}`, .3, {color: 'white'})
  }
  leaveArticleSection = (type) => {
  TweenMax.to(`.about-article-title-${type}`, .3, {color: '#BCDEFA'})
  }

  enterCloseButton = () => {
    TweenMax.to('.article-screen-close-button', .3, {opacity:.7})
  }
  leaveCloseButton = () => {
    TweenMax.to('.article-screen-close-button', .3, {opacity:1})
  }

  openArticleSection = (type) => {
    if (!this.state.articleOpen) {
      const coords = this[`articleSection${type}`].getBoundingClientRect(),
        elemRect = this.elemRectRef.getBoundingClientRect(),
        offset = elemRect.top - coords.top,
        tl = new TimelineMax(),
        innerWidth = window.innerWidth;

        let xPosition = coords.x - 200,
            yPosition = offset * -1;
            
        if (innerWidth <= 510) {
          xPosition += 200;
        }

      tl.to('.about-article-section-screen', 0, {x: xPosition, y: yPosition, width: 250, height: 250, opacity: 1})
        .to('.about-article-section', .2, {opacity: 0})
        .to('.About', .5, {scrollTo: 0})
        
        .to('.about-article-section', 0, {display: 'none'})
        .from('.about-article-section-screen', 0, {width: 250}, '-=.3')
        .to('.about-article-section-screen', .3, {x:20, y:20, width: '75%', opacity: 1}, '-=.3')
        
        .set('.about-article-section-screen', {height: 'auto'})
        .from('.about-article-section-screen', .3, {height: 250, immediateRender: false})

        .to('.article-selected-container', 0, {display: 'block'}, '-=.4')
        .to('.article-selected-container', .3, {opacity: 1})
        
        .to('.article-screen-close-button', 0, {display: 'flex'})
        .to('.article-screen-close-button', .3, {opacity: 1})
        this.setState({
          articleOpen: true,
          articleSelected: type,
      })
    }
  }
  closeArticleSection = () => {
    TweenMax.to('.about-article-section', 0, {display:'flex'})
    const coords = this[`articleSection${this.state.articleSelected}`].getBoundingClientRect(),
    elemRect = this.elemRectRef.getBoundingClientRect(),
    offset = elemRect.top - coords.top,
    innerWidth = window.innerWidth;

    let xPosition = coords.x - 200,
        yPosition = offset * -1;
        
    if (innerWidth <= 510) {
      xPosition += 200;
    }
    screenTL.to('.article-screen-close-button', .2, {opacity: 0})
      .to('.article-screen-close-button', 0, {display: 'none'})
      .to('.article-selected-container', .2, {opacity: 0}, '-=.2')
      .to('.about-article-section-screen', .3, {x: xPosition, y: yPosition, width: 250, height: 250})
      .to('.article-selected-container', 0, {display: 'none'}, '-=.1')
      .to('.About', .5, {scrollTo: yPosition - 20}, '-=.2')
      .to('.about-article-section', .2, {opacity: 1})
      .to('.about-article-section-screen', .2, {opacity: 0}, '-=.2')
      .to('.about-article-section-screen', 0, {height: 0, width: 0})
    if (_isMounted) {
      screenTL.call(()=>{
        this.setState({
          articleOpen: false,
          articleSelected: null 
        })
      })
    }
  }

  componentWillUnmount = () => {
    screenTL.clear();
    _isMounted = false;
  }

  render = () => {
    const aboutArticleSections = this.state.articleSections.map((asEL, asIn)=>{
      return (
        <section ref={(e)=>{this[`articleSection${asIn}`] = e;}} onClick={()=>{this.openArticleSection(asIn)}} onMouseEnter={()=>{this.enterArticleSection(asIn)}} onMouseLeave={()=>{this.leaveArticleSection(asIn)}} className={`about-article-section about-article-section-${asIn}`} key={`article-section-${asIn}`}>
          <h2 className={`about-article-title about-article-title-${asIn}`}>{asEL.title}</h2>
        </section>
      )
    })
    const articleSelectedParagraphs = this.state.articleSelected || this.state.articleSelected === 0? this.state.articleSections[this.state.articleSelected].paragraphs.map((asEl, asIn) => {
      return (
        <div key={`article-selected-${asIn}`}>
          {asEl.title? asEl.title : null}
          {asEl.content? asEl.content : null}
        </div>
      )
    }): null;
    return (
      <main className="About">
        <aside className="about-left-side">
          <img alt="Profile pic of me" className="about-profile-pic" height={'auto'} width={'80%'} src={Profile}/> 
          <section className="about-heading-section">
            <h2 className="about-h2">Location</h2>
            <p className="about-heading-p">Gainesville, Georgia</p>
          </section>
          <section className="about-heading-section about-heading-section-skills">
            <h2 className="about-h2">Skill set</h2>
            <p className="about-heading-p">ReactJS, Redux, HTML, CSS, JS, NodeJS, ExpressJS, PostgreSQL, AWS, GCP, Firebase </p>
          </section>
          <section className="about-heading-section">
            <h2 className="about-h2 about-h2-social-media">Social Media</h2>
            <p className="about-heading-p">
              <a onMouseEnter={()=>{this.enterSocialMedia('linkedin')}} onMouseLeave={()=>{this.leaveSocialMedia('linkedin')}} href="https://www.linkedin.com/in/fernandodlv" rel="noopener noreferrer" target="_blank"><i className="fab fa-linkedin about-fa-linkedin about-social-media"/></a>
              <a onMouseEnter={()=>{this.enterSocialMedia('facebook')}} onMouseLeave={()=>{this.leaveSocialMedia('facebook')}}  href="https://www.facebook.com/fernandodlv32" rel="noopener noreferrer" target="_blank"><i className="fab fa-facebook about-fa-facebook about-social-media"/></a>
              <a onMouseEnter={()=>{this.enterSocialMedia('instagram')}} onMouseLeave={()=>{this.leaveSocialMedia('instagram')}} href="https://www.instagram.com/f.dlv" rel="noopener noreferrer" target="_blank"><i className="fab fa-instagram about-fa-instagram about-social-media"/></a>
              <a onMouseEnter={()=>{this.enterSocialMedia('github')}} onMouseLeave={()=>{this.leaveSocialMedia('github')}} href="https://github.com/ClassyFD" rel="noopener noreferrer" target="_blank"><i className="fab fa-github about-fa-github about-social-media"/></a>
            </p>
          </section>
        </aside>
        <article className="about-article">
          <div ref={(e)=> this.elemRectRef = e} className="about-article-section-container">
            {aboutArticleSections}
            <section className="about-article-section-screen">
              <div style={{opacity: 0, display: 'none', cursor: 'pointer'}} onClick={()=>{this.closeArticleSection()}} onMouseEnter={()=>{this.enterCloseButton()}} onMouseLeave={()=>{this.leaveCloseButton()}} className="article-screen-close-button">x</div>
              <div className="article-selected-container">
                {articleSelectedParagraphs}
              </div>
            </section>
          </div>
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
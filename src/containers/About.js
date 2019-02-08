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
      articleSections: [],
    }
  }

  componentWillMount = () => {
    this.props.setMountedComp('about');
    const articleSections = [
      {
        title: 'About Me',
        open: false,
        paragraphs: [
          {
            title: `Learn a new Framework`,
            content: `I would like to learn a new framework.`
          },
          {
            title: `Find new learning opportunities`,
            content: `I would like to find a place that can ___`
          },
          {
            title: ``,
            content: ``
          },
          {
            content: `Help me achieve my goals! Send me an email at ${<a href="mailto:fernandodlv32@gmail.com">fernandodlv32@gmail.com</a>} about anything; I'd love to talk about any potential opportunities!`
          }
        ]
      },
      {
        title: '2019 Goals',
        open: false,
        paragraphs: [
          {
            title: `Learn a new Framework`,
            content: `I would like to learn a new framework.`
          },
          {
            title: `Find new learning opportunities`,
            content: `I would like to find a place that can ___`
          },
          {
            title: ``,
            content: ``
          },
          {
            content: `Help me achieve my goals! Send me an email at ${<a href="mailto:fernandodlv32@gmail.com">fernandodlv32@gmail.com</a>} about anything; I'd love to talk about any potential opportunities!`
          }
        ]
      },
    ]
    this.setState({
      articleSections
    })
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

  enterSocialMedia = (type) => {
    TweenMax.to(`.about-fa-${type}`, .4, {color: '#BCDEFA'});
  }
  leaveSocialMedia = (type) => {
    TweenMax.to(`.about-fa-${type}`, .4, {color: 'white'});
  }

  enterArticleSection = (type) => {
  }
  leaveArticleSection = (type) => {

  }
  openArticleSection = (type) => {
    const coords = this[`articleSection${type}`].getBoundingClientRect(),
      xPosition = coords.x - 200,
      yPosition = coords.y - 70,
      tl = new TimelineMax();
    console.log(coords)
    tl.to('.about-article-section-screen', 0, {x: xPosition, y: yPosition})
      .to('.about-article-section-screen', 1, {x:0, y:0, width: '100%'})
      .from('.about-article-section-screen', 1, {height: 250}, '-=1')
  }

  render = () => {
    const aboutArticleSections = this.state.articleSections.map((asEL, asIn)=>{
      return (
        <section ref={(e)=>{this[`articleSection${asIn}`] = e;}} onClick={()=>{this.openArticleSection(asIn)}} onMouseEnter={()=>{this.enterArticleSection(asIn)}} onMouseLeave={()=>{this.leaveArticleSection(asIn)}} className={`about-article-section about-article-section-${asIn}`} key={`article-section-${asIn}`}>
          <h2 className="about-article-title">{asEL.title}</h2>
        </section>
      )
    })
    return (
      <main className="About">
        <aside className="about-left-side">
          <img alt="Profile pic of me" className="about-profile-pic" height={'auto'} width={'80%'} src={Profile}/> 
          <header className="about-heading">
            <h1>About me</h1>
          </header>
          <section className="about-heading-section">
            <h2 className="about-h2">Location</h2>
            <p className="about-heading-p">Gainesville, Georgia</p>
          </section>
          <section className="about-heading-section">
            <h2 className="about-h2">Hobbies</h2>
            <p className="about-heading-p">Bodybuilding, Piano, Guitar, Coding (Games), Ping pong</p>
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
          <div className="about-article-section-container">
            {aboutArticleSections}
            <section className="about-article-section-screen">
              <div className="article-screen-close-button">x</div>
            </section>
          </div>
          {/* <section className="about-intro-section">
            <p className="about-paragraph">I began learning to code in 2017, at <a onMouseEnter={()=>{this.enterLink('code')}} onMouseLeave={()=>{this.leaveLink('code')}} className="about_link about_link_code" href="https://freecodecamp.org" target="_blank" rel="noopener noreferrer">freecodecamp.org</a>. There, I taught myself the basics of HTML, CSS and JavaScript. I also created some of my first projects: A <a onMouseEnter={()=>{this.enterLink('poke')}} onMouseLeave={()=>{this.leaveLink('poke')}} className="about_link about_link_poke" href="https://pokedex-dlv.firebaseapp.com/" target="_blank" rel="noopener noreferrer">Pokedex</a> and the <a onMouseEnter={()=>{this.enterLink('gol')}} onMouseLeave={()=>{this.leaveLink('gol')}} className="about_link about_link_gol" href="https://game-of-life-dlv.firebaseapp.com/" target="_blank" rel="noopener noreferrer">Game of life.</a> They weren't perfect, but they were fun to make. It definitely set the path to pursuing a career in software development!</p>
            <p className="about-paragraph">Later that same year, I attended <a onMouseEnter={()=>{this.enterLink('dev')}} onMouseLeave={()=>{this.leaveLink('dev')}} className="about_link about_link_dev" href="https://devmountain.com" target="_blank" rel="noopener noreferrer">DevMountain</a>, an intense 13 week coding bootcamp. While there, I started learning fullstack web development, specifically with ReactJS. I spent 900+ hours learning new technologies and developing personal projects.</p>
            <p className="about-paragraph">After graduating from the bootcamp and receiving my Javascript Web Development <a onMouseEnter={()=>{this.enterLink('cert')}} onMouseLeave={()=>{this.leaveLink('cert')}} className="about_link about_link_cert" href="https://www.youracclaim.com/badges/a02aa461-981c-4ca2-a195-1df270e5716f" target="_blank" rel="noopener noreferrer">Badge</a>, I joined a startup company named <a onMouseEnter={()=>{this.enterLink('vibix')}} onMouseLeave={()=>{this.leaveLink('vibix')}} className="about_link about_link_vibix" href="https://vibix-web.firebaseapp.com/" target="_blank" rel="noopener noreferrer">Vibix</a>. We worked on developing shopify apps to automate users' daily time-consuming tasks. I was solely responsible to build the web presence of the company by utilizing the latest technology (ReactJS/Redux/Cloud Functions/Firebase).</p>
            <p className="about-paragraph">I don't just code, music and fitness are also a big part of my life! If you would like to see more, check out my social media!</p>
          </section> */}
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
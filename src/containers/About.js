import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../styles/about.css'
import * as actions from '../redux/actions/nav.actions';
import Profile from '../res/profile_picture.png';
import AnimateHOC from '../hocs/Animate';
import { TimelineMax, Power1, TweenMax } from 'gsap';

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
        open: false,
        paragraphs: [
          {
            title: <h2>Early childhood</h2>,
            content: <p>Growing up with access to computers It was natural for me to be attracted to technology. I was fascinated by everything about it; It felt like magic.</p>
          },
          {
            content: <p>I could sit in front of a computer for many hours without getting bored!</p>
          },
          {
            title: <h2>High school, freshman-junior years</h2>,
            content: <p>During my teenage years, I still loved technology. I knew that I wanted to create a game one day, but I still hadn't looked into programming for my future. I was also preoccupied with NJROTC, a military program they offered at my school.</p>
          },
          {
            title: <h2>High school, senior year</h2>,
            content: <p>I began learning to code early 2017, at <a onMouseEnter={()=>{this.enterLink('code')}} onMouseLeave={()=>{this.leaveLink('code')}} className="about-link-code" href="https://freecodecamp.org" target="_blank" rel="noopener noreferrer">freecodecamp.org</a>. There, I taught myself the basics of HTML, CSS and JavaScript. I also created some of my first projects: A <a onMouseEnter={()=>{this.enterLink('poke')}} onMouseLeave={()=>{this.leaveLink('poke')}} className="about-link-poke" href="https://pokedex-dlv.firebaseapp.com/" target="_blank" rel="noopener noreferrer">Pokedex</a> and the <a onMouseEnter={()=>{this.enterLink('gol')}} onMouseLeave={()=>{this.leaveLink('gol')}} className="about-link-gol" href="https://game-of-life-fd.firebaseapp.com/" target="_blank" rel="noopener noreferrer">Game of life.</a> They weren't perfect, but they were fun to make. It definitely set the path to pursuing a career in software development!</p>
          },
          // {
          //   title: <h2>August 2017</h2>,
          //   content: <p>Later that same year, I attended <a onMouseEnter={()=>{this.enterLink('dev')}} onMouseLeave={()=>{this.leaveLink('dev')}} className="about-link-dev" href="https://devmountain.com" target="_blank" rel="noopener noreferrer">DevMountain</a>, an intense 13 week coding bootcamp. While there, I started learning fullstack web development, specifically with ReactJS. I spent 900+ hours learning new technologies and developing personal projects.</p>
          // },
        ]
      },
      {
        title: '2019 Goals',
        open: false,
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
            content:  <p> Send me an email: <a onMouseEnter={()=>{this.enterLink('email')}} onMouseLeave={()=>{this.leaveLink('email')}} className="about-link-email" href="mailto:fernandodlv32@gmail.com">fernandodlv32@gmail.com</a>; I'd love to talk about any potential opportunities!</p>
          }
        ]
      },
      {
        title: 'Work History',
        open: false,
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
          }
        ]
      },
      {
        title: 'Education',
        open: false,
        paragraphs: [
          {
            title: <h2>Hispanic Alliance</h2>,
            content: <p>Worked as wordpress developer</p>
          },
        ]
      },
      {
        title: 'Hobbies',
        open: false,
        paragraphs: [
          {
            title: <h2>Hispanic Alliance</h2>,
            content: <p>Worked as wordpress developer</p>
          },
        ]
      },
    ]
    this.setState({
      articleSections
    })
  }
  componentDidMount = () => {
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
  openArticleSection = (type) => {
    if (!this.state.articleOpen) {
      const coords = this[`articleSection${type}`].getBoundingClientRect(),
        elemRect = this.elemRectRef.getBoundingClientRect(),
        offset = elemRect.top - coords.top,
        xPosition = coords.x - 200,
        yPosition = offset * -1,
        tl = new TimelineMax();
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
    xPosition = coords.x - 200,
    yPosition = offset * -1;
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
    console.log(this.state.articleSelected)
    const articleSelectedParagraphs = this.state.articleSelected || this.state.articleSelected === 0? this.state.articleSections[this.state.articleSelected].paragraphs.map((asEl, asIn) => {
      return (
        <div key={`article-selected-${asIn}`}>
          {asEl.title? asEl.title : null}
          {asEl.content? asEl.content : null}
        </div>
      )
    }): null;
    console.log(articleSelectedParagraphs)
    return (
      <main className="About">
        <aside className="about-left-side">
          <img alt="Profile pic of me" className="about-profile-pic" height={'auto'} width={'80%'} src={Profile}/> 
          <section className="about-heading-section">
            <h2 className="about-h2">Location</h2>
            <p className="about-heading-p">Gainesville, Georgia</p>
          </section>
          <section className="about-heading-section">
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
              <div style={{opacity: 0, display: 'none', cursor: 'pointer'}} onClick={()=>{this.closeArticleSection()}} className="article-screen-close-button">x</div>
              <div className="article-selected-container">
                {articleSelectedParagraphs}
              </div>
            </section>
          </div>
          {/* <section className="about-intro-section">
            
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
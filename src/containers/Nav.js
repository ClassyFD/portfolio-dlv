import React, { Component } from 'react';
import Logo from '../res/logo.png';
import { TweenMax, Elastic } from 'gsap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../redux/actions/nav.actions';
import '../styles/nav.css'
import Hamburger from '../res/hamburger-icon.png';

class Nav extends Component {
  constructor(props) {
    super(props)
    this.state = {
      comp: 'home',
      mobileNav: false,
      animate: true
    }
  }
  
  componentDidMount = () => {
    const { comp } = this.state;
    TweenMax.to(`.nav-underline-${comp}`, .4, {width: '100%'})
    TweenMax.to(`.${comp}-p`, .4, {color: '#BCDEFA', opacity: 0})
    TweenMax.to('.nav-icon', .4, {opacity: comp==='home'? 1 : .7})
    TweenMax.to(`.mobile-nav-p`, .4, {color: 'white'})
    TweenMax.to(`.mobile-nav-underline`, .4, {width: 0})
    TweenMax.to(`.mobile-${comp}-p`, .4, {color:'#BCDEFA'})
    TweenMax.to(`.mobile-nav-underline-${comp}`, .4, {width: '100%'})
  }
  
  componentWillReceiveProps = (props) => {
    const { comp } = props;
    TweenMax.to('.nav-icon', .4, {opacity: comp==='home'? 1 : .7})
    TweenMax.to(`.nav-underline`, .4, {width: '0%'})
    TweenMax.to(`.nav-p`, .4, {color: 'white'})
    TweenMax.to(`.${comp}-p`, .4, {color: '#BCDEFA'})
    TweenMax.to(`.nav-underline-${comp}`, .4, {width: '100%'})
    TweenMax.to(`.mobile-nav-p`, .4, {color: 'white'})
    TweenMax.to(`.mobile-nav-underline`, .4, {width: 0})
    TweenMax.to(`.mobile-${comp}-p`, .4, {color:'#BCDEFA'})
    TweenMax.to(`.mobile-nav-underline-${comp}`, .4, {width: '100%'})
    this.setState({
      comp,
      animate: true
    })
  }

  enterNavLink = (type, mobile) => {
    const mobileType = mobile? mobile : '';
    if (mobileType) {
      TweenMax.to(`.${mobile}-${type}-p`, .4, {color:'#BCDEFA', opacity: 1}, '-=.4')
      TweenMax.to(`.${mobile}-nav-underline-${type}`, .4, {width: '100%'}, '-=.4')
    } else {
      TweenMax.to(`.${type}-p`, .4, {color:'#BCDEFA', opacity: 1}, '-=.4')
      TweenMax.to(`.nav-underline-${type}`, .4, {width: '100%'}, '-=.4')
    }
  }
  leaveNavLink = (type, mobile) => {
    const mobileType = mobile? mobile : '';
    if (this.state.animate) {
      if (mobileType) {
        TweenMax.to(`.${mobile}-${type}-p`, .4, {color: type !== this.state.comp?'white':'#BCDEFA'}, '-=.4')
        TweenMax.to(`.${mobile}-nav-underline-${type}`, .4, {width: type !== this.state.comp? '0%' : '100%'}, '-=.4')
      } else {
        TweenMax.to(`.${type}-p`, .4, {color: type !== this.state.comp?'white':'#BCDEFA'}, '-=.4')
        TweenMax.to(`.nav-underline-${type}`, .4, {width: type !== this.state.comp? '0%' : '100%'}, '-=.4')
      }
    }
  } 
  enterNavButtons = (type) => {
    TweenMax.to(`.fa-${type}`, .4, {color: '#BCDEFA'});
  }
  leaveNavButtons = (type) => {
    TweenMax.to(`.fa-${type}`, .4, {color: 'white'});
  }
  enterNavIcon = () => {
    TweenMax.to('.nav-icon', .4, {opacity: 1})
  }
  leaveNavIcon = () => {
    if (this.props.comp !== 'home') {
      TweenMax.to('.nav-icon', .4, {opacity: .7})
    }
  }

  animateComp = (e, route) => {
    e.preventDefault();
    this.props.setAnimatedComp(route);
    this.setState({animate: false})
    if (window.innerWidth <= 740 && this.state.mobileNav) {
      this.closeMobileNav();
    }
  }

  openMobileNav = () => {
    TweenMax.to('.mobile-nav-buttons', .3, {left: 0})
    this.setState({
      mobileNav: true
    })
  }
  closeMobileNav = () => {
    TweenMax.to('.mobile-nav-buttons', .3, {left:'-100%'})
    this.setState({
      mobileNav: false
    })
  }

  enterHamburgerMenu = () => {
    TweenMax.to('.mobile-nav-hamburger-section', .3, {color: '#80ceb9'})
    TweenMax.to('.mobile-nav-hamburger', .3, {opacity: .8})
  }
  leaveHamburgerMenu = () => {
    TweenMax.to('.mobile-nav-hamburger-section', .3, {color: '#bcdefa'})
    TweenMax.to('.mobile-nav-hamburger', .3, {opacity: 1})
  }

  enterCloseButton = () => {
    TweenMax.to('.mobile-nav-close-button', .3, {opacity:.7})
  }
  leaveCloseButton = () => {
    TweenMax.to('.mobile-nav-close-button', .3, {opacity:1})
  }

  render = () => {
    return (
      <main className={'Nav'}>
        <Link onMouseEnter={this.enterNavIcon} onMouseLeave={this.leaveNavIcon} onClick={(e)=>this.animateComp(e, '/')} className="nav-link nav-target" to='/'>
          <section className="nav-icon">
            <img height={60} src={Logo} alt="profile logo"/>
          </section>
        </Link>
        <section className="nav-buttons">
          <Link onClick={(e)=>this.animateComp(e, '/about')} className="nav-link" to='/about'>
            <p onMouseEnter={()=>{this.enterNavLink('about')}} onMouseLeave={()=>{this.leaveNavLink('about')}} className="nav-p about-p">ABOUT</p>
            <div className="nav-underline nav-underline-about"/>
          </Link>
          <Link onClick={(e)=>this.animateComp(e, '/skills')} className="nav-link" to='/skills'>
            <p onMouseEnter={()=>{this.enterNavLink('skills')}} onMouseLeave={()=>{this.leaveNavLink('skills')}} className="nav-p skills-p">SKILLS</p>
            <div className="nav-underline nav-underline-skills"/>
          </Link>
          <Link onClick={(e)=>this.animateComp(e, '/projects')} className="nav-link" to='/projects'>
            <p onMouseEnter={()=>{this.enterNavLink('projects')}} onMouseLeave={()=>{this.leaveNavLink('projects')}} className="nav-p projects-p">PROJECTS</p>
            <div className="nav-underline nav-underline-projects"/>
          </Link>
          <Link onClick={(e)=>this.animateComp(e, '/contact')} className="nav-link" to='/contact'>
            <p onMouseEnter={()=>{this.enterNavLink('contact')}} onMouseLeave={()=>{this.leaveNavLink('contact')}} className="nav-p contact-p">CONTACT</p>
            <div className="nav-underline nav-underline-contact"/>
          </Link>
        </section>
        <section className="nav-social-media">
          <a href="https://www.linkedin.com/in/fernandodlv" rel="noopener noreferrer" target="_blank"><i onMouseEnter={()=>{this.enterNavButtons('linkedin-nav')}} onMouseLeave={()=>{this.leaveNavButtons('linkedin-nav')}} className="fab fa-linkedin fa-linkedin-nav"/></a>
          <a href="https://www.facebook.com/fernandodlv32" rel="noopener noreferrer" target="_blank"><i onMouseEnter={()=>{this.enterNavButtons('facebook-nav')}} onMouseLeave={()=>{this.leaveNavButtons('facebook-nav')}} className="fab fa-facebook fa-facebook-nav"/></a>
          <a href="https://www.instagram.com/f.dlv" rel="noopener noreferrer" target="_blank"><i onMouseEnter={()=>{this.enterNavButtons('instagram-nav')}} onMouseLeave={()=>{this.leaveNavButtons('instagram-nav')}} className="fab fa-instagram fa-instagram-nav"/></a>
          <a href="https://github.com/ClassyFD" rel="noopener noreferrer" target="_blank"><i onMouseEnter={()=>{this.enterNavButtons('github-nav')}} onMouseLeave={()=>{this.leaveNavButtons('github-nav')}} className="fab fa-github fa-github-nav"/></a>
        </section>
        <div className="mobile-nav">
          <section onClick={()=>{this.openMobileNav()}} onMouseEnter={()=>{this.enterHamburgerMenu()}} onMouseLeave={()=>{this.leaveHamburgerMenu()}} className="mobile-nav-hamburger-section">
            <img alt="hamburger-icon" src={Hamburger} className="mobile-nav-hamburger"/>
            <p>Menu</p>
          </section>
          <section className="mobile-nav-buttons">
            <Link onClick={(e)=>this.animateComp(e, '/about')} className="mobile-nav-link" to='/about'>
              <p onMouseEnter={()=>{this.enterNavLink('about', 'mobile')}} onMouseLeave={()=>{this.leaveNavLink('about', 'mobile')}} className="mobile-nav-p mobile-about-p">ABOUT</p>
              <div className="mobile-nav-underline mobile-nav-underline-about"/>
            </Link>
            <Link onClick={(e)=>this.animateComp(e, '/skills')} className="mobile-nav-link" to='/skills'>
              <p onMouseEnter={()=>{this.enterNavLink('skills', 'mobile')}} onMouseLeave={()=>{this.leaveNavLink('skills', 'mobile')}} className="mobile-nav-p mobile-skills-p">SKILLS</p>
              <div className="mobile-nav-underline mobile-nav-underline-skills"/>
            </Link>
            <Link onClick={(e)=>this.animateComp(e, '/projects')} className="mobile-nav-link" to='/projects'>
              <p onMouseEnter={()=>{this.enterNavLink('projects', 'mobile')}} onMouseLeave={()=>{this.leaveNavLink('projects', 'mobile')}} className="mobile-nav-p mobile-projects-p">PROJECTS</p>
              <div className="mobile-nav-underline mobile-nav-underline-projects"/>
            </Link>
            <Link onClick={(e)=>this.animateComp(e, '/contact')} className="mobile-nav-link" to='/contact'>
              <p onMouseEnter={()=>{this.enterNavLink('contact', 'mobile')}} onMouseLeave={()=>{this.leaveNavLink('contact', 'mobile')}} className="mobile-nav-p mobile-contact-p">CONTACT</p>
              <div className="mobile-nav-underline mobile-nav-underline-contact"/>
            </Link>
            <div onMouseEnter={()=>{this.enterCloseButton()}} onMouseLeave={()=>{this.leaveCloseButton()}} onClick={()=>{this.closeMobileNav()}} className="mobile-nav-close-button">x</div>
          </section>
        </div>
      </main>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    comp: state.nav.comp
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    setAnimatedComp: (route) => dispatch({
      type: actions.SET_ANIMATED_COMP,
      value: {
        status: true,
        route
      }
    })
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Nav);
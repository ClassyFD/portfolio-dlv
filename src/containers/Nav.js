import React, { Component } from 'react';
import Logo from '../res/logo.png';
import { TweenMax } from 'gsap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../redux/actions/nav.actions';
import '../styles/nav.css'

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
    TweenMax.to(`.${comp}-p`, .4, {color: '#BCDEFA', opacity: 0}, '-=.4')
    TweenMax.to('.nav-target', .4, {opacity: comp==='home'? 1 : .7})
  }
  
  componentWillReceiveProps = (props) => {
    const { comp } = props;
    TweenMax.to(`.nav-underline`, .4, {width: '0%'})
    TweenMax.to(`.nav-p`, .4, {color: '#BCDEFA'})
    TweenMax.to(`.${comp}-p`, .4, {color: '#6CB2EB'})
    TweenMax.to(`.nav-underline-${comp}`, .4, {width: '100%'})
    TweenMax.to('.nav-target', .4, {opacity: comp==='home'? 1 : .7})
    this.setState({
      comp,
      animate: true
    })
  }

  enterNavLink = (type) => {
    TweenMax.to(`.${type}-p`, .4, {color:'#6CB2EB', opacity: 1}, '-=.4')
    TweenMax.to(`.nav-underline-${type}`, .4, {width: '100%'}, '-=.4')
  }
  leaveNavLink = (type) => {
    if (this.state.animate) {
      TweenMax.to(`.${type}-p`, .4, {color: type !== this.state.comp?'#BCDEFA':'#6CB2EB'}, '-=.4')
      TweenMax.to(`.nav-underline-${type}`, .4, {width: type !== this.state.comp? '0%' : '100%'}, '-=.4')
    }
  } 
  enterNavButtons = (type) => {
    TweenMax.to(`.fa-${type}`, .4, {color: '#6CB2EB'});
  }
  leaveNavButtons = (type) => {
    TweenMax.to(`.fa-${type}`, .4, {color: '#BCDEFA'});
  }

  animateComp = (e, route) => {
    e.preventDefault();
    this.props.setAnimatedComp(route);
    if (window.innerWidth <= 500 && this.state.mobileNav) {
      this.toggleMobileNav();
    }
    this.setState({animate: false})
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
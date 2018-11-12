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
    }
  }
  
  componentDidMount = () => {
    const { comp } = this.state;
    TweenMax.to(`.fa-${comp}`, .4, {color: '#59bd8e'});
    TweenMax.to(`.p-${comp}`, .4, {color: '#59bd8e', opacity: 0}, '-=.4')
  }

  componentWillReceiveProps = (props) => {
    const { comp } = props;
    TweenMax.to(`.fa-lg`, .4, {color: '#42474b'})
    TweenMax.to(`.fa-${comp}`, .4, {color: '#59bd8e'}, '-=.4');
    TweenMax.to(`.p-${comp}`, .4, {color: '#59bd8e', opacity: 0}, '-=.4')
    this.setState({
      comp
    })
  }

  enterNavButtons = (type, bool) => {
    if (bool) {
      TweenMax.to(`.fa-${type}`, .4, {color:'#59bd8e'})
    } else {
      TweenMax.to(`.fa-${type}`, .4, {color:'#181818'})
      TweenMax.to(`.p-${type}`, .4, {color:'#59bd8e', opacity: 1}, '-=.4')
    }
  }
  leaveNavButtons = (type, bool) => {
    if (bool) {
      TweenMax.to(`.fa-${type}`, .4, {color:'#42474b'})
    } else {
      TweenMax.to(`.fa-${type}`, .4, {color:type !== this.state.comp?'#42474b':'#59bd8e'})
      TweenMax.to(`.p-${type}`, .4, {color:type !== this.state.comp?'#181818':'#59bd8e', opacity: 0}, '-=.4')
    }
  } 

  enterMobileNav = () => {
    TweenMax.to(`.fa-bars`, .4, {color:'#59bd8e'})
  }
  leaveMobileNav = () => {
    TweenMax.to(`.fa-bars`, .4, {color: this.state.mobileNav? '#ffffff' : '#42474b'})
  }
  
  toggleMobileNav = () => {
    TweenMax.to('.mobile_nav_buttons', .4, {left: this.state.mobileNav? '100%' : '0px', opacity: this.state.mobileNav? 0 : 1});
    this.setState({
      mobileNav: this.state.mobileNav? false : true,
    })
  }

  animateComp = (e, route) => {
    e.preventDefault();
    this.props.setAnimatedComp(route);
    if (window.innerWidth <= 500) {
      this.toggleMobileNav();
    }
  }

  render = () => {
    return (
      <main className={'Nav'}>
        <Link onClick={(e)=>this.animateComp(e, '/')} className="nav_link" to='/'>
          <section className="nav_icon">
            <img height={60} src={Logo} alt="profile logo"/>
          </section>
        </Link>
        <section className="nav_buttons">
          <Link onClick={(e)=>this.animateComp(e, '/')} className="nav_link" to='/'>
            <i onMouseEnter={()=>{this.enterNavButtons('home')}} onMouseLeave={()=>{this.leaveNavButtons('home')}} className="fas fa-lg fa-home">
              <p className="p-home">HOME</p>
            </i>
          </Link>
          <Link onClick={(e)=>this.animateComp(e, '/about')} className="nav_link" to='/about'>
            <i onMouseEnter={()=>{this.enterNavButtons('user')}} onMouseLeave={()=>{this.leaveNavButtons('user')}} className="fas fa-lg fa-user">
              <p className="p-user">ABOUT</p>
            </i>
          </Link>
          <Link onClick={(e)=>this.animateComp(e, '/skills')} className="nav_link" to='/skills'>
            <i onMouseEnter={()=>{this.enterNavButtons('cog')}} onMouseLeave={()=>{this.leaveNavButtons('cog')}} className="fas fa-lg fa-cog">
              <p className="p-cog">SKILLS</p>
            </i>
          </Link>
          <Link onClick={(e)=>this.animateComp(e, '/projects')} className="nav_link" to='/projects'>
            <i onMouseEnter={()=>{this.enterNavButtons('eye')}} onMouseLeave={()=>{this.leaveNavButtons('eye')}} className="fas fa-lg fa-eye">
              <p className="p-eye">PROJECTS</p>
            </i>
          </Link>
          <Link onClick={(e)=>this.animateComp(e, '/contact')} className="nav_link" to='/contact'>
            <i onMouseEnter={()=>{this.enterNavButtons('envelope')}} onMouseLeave={()=>{this.leaveNavButtons('envelope')}} className="fas fa-lg fa-envelope">
              <p className="p-envelope">CONTACT</p>
            </i>
          </Link>
        </section>
        <section className="nav_social_media">
          <a href="https://www.linkedin.com/in/fernandodlv" rel="noopener noreferrer" target="_blank"><i onMouseEnter={()=>{this.enterNavButtons('linkedin-nav', true)}} onMouseLeave={()=>{this.leaveNavButtons('linkedin-nav', true)}} className="fab fa-linkedin fa-linkedin-nav"/></a>
          <a href="https://www.facebook.com/fernandodlv32" rel="noopener noreferrer" target="_blank"><i onMouseEnter={()=>{this.enterNavButtons('facebook-nav', true)}} onMouseLeave={()=>{this.leaveNavButtons('facebook-nav', true)}} className="fab fa-facebook fa-facebook-nav"/></a>
          <a href="https://www.instagram.com/f.dlv" rel="noopener noreferrer" target="_blank"><i onMouseEnter={()=>{this.enterNavButtons('instagram-nav', true)}} onMouseLeave={()=>{this.leaveNavButtons('instagram-nav', true)}} className="fab fa-instagram fa-instagram-nav"/></a>
        </section>
        <section className="nav_mobile">
          <i onMouseEnter={this.enterMobileNav} onMouseLeave={this.leaveMobileNav} onClick={this.toggleMobileNav} className="fas fa-2x fa-bars"/>
        </section>
        <section className="mobile_nav_buttons">
          <Link onClick={(e)=>this.animateComp(e, '/')} className="nav_link" to='/'>
            <i onMouseEnter={()=>{this.enterNavButtons('home')}} onMouseLeave={()=>{this.leaveNavButtons('home')}} className="fas fa-lg fa-home">
              <p className="p-home">HOME</p>
            </i>
          </Link>
          <Link onClick={(e)=>this.animateComp(e, '/about')} className="nav_link" to='/about'>
            <i onMouseEnter={()=>{this.enterNavButtons('user')}} onMouseLeave={()=>{this.leaveNavButtons('user')}} className="fas fa-lg fa-user">
              <p className="p-user">ABOUT</p>
            </i>
          </Link>
          <Link onClick={(e)=>this.animateComp(e, '/skills')} className="nav_link" to='/skills'>
            <i onMouseEnter={()=>{this.enterNavButtons('cog')}} onMouseLeave={()=>{this.leaveNavButtons('cog')}} className="fas fa-lg fa-cog">
              <p className="p-cog">SKILLS</p>
            </i>
          </Link>
          <Link onClick={(e)=>this.animateComp(e, '/projects')} className="nav_link" to='/projects'>
            <i onMouseEnter={()=>{this.enterNavButtons('eye')}} onMouseLeave={()=>{this.leaveNavButtons('eye')}} className="fas fa-lg fa-eye">
              <p className="p-eye">PROJECTS</p>
            </i>
          </Link>
          <Link onClick={(e)=>this.animateComp(e, '/contact')} className="nav_link" to='/contact'>
            <i onMouseEnter={()=>{this.enterNavButtons('envelope')}} onMouseLeave={()=>{this.leaveNavButtons('envelope')}} className="fas fa-lg fa-envelope">
              <p className="p-envelope">CONTACT</p>
            </i>
          </Link>
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
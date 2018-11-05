import React, { Component } from 'react';
import Logo from '../res/logo.png';
import { TweenMax } from 'gsap';
import { Link } from 'react-router-dom';
import '../styles/nav.css'

class Nav extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  enterNavButtons(type, bool) {
    if (bool) {
      TweenMax.to(`.fa-${type}`, .4, {color:'#59bd8e'})
    } else {
      TweenMax.to(`.fa-${type}`, .4, {color:'#181818'})
      TweenMax.to(`.p-${type}`, .4, {color:'#59bd8e', opacity: 1}, '-=.4')
    }
  }
  leaveNavButtons(type, bool) {
    if (bool) {
      TweenMax.to(`.fa-${type}`, .4, {color:'#42474b'})
    } else {
      TweenMax.to(`.fa-${type}`, .4, {color:'#42474b'})
      TweenMax.to(`.p-${type}`, .4, {color:'#181818', opacity: 0}, '-=.4')
    }
  } 

  render() {
    return (
      <main className={'Nav'}>
        <section className="nav_icon">
          <img src={Logo} alt="profile logo"/>
          <p>Fernando</p>
        </section>
        <section className="nav_buttons">
          <Link className="nav_link" to='/'>
            <i onMouseEnter={()=>{this.enterNavButtons('home')}} onMouseLeave={()=>{this.leaveNavButtons('home')}} className="fas fa-lg fa-home">
              <p className="p-home">HOME</p>
            </i>
          </Link>
          <Link className="nav_link" to='/about'>
            <i onMouseEnter={()=>{this.enterNavButtons('user')}} onMouseLeave={()=>{this.leaveNavButtons('user')}} className="fas fa-lg fa-user">
              <p className="p-user">ABOUT</p>
            </i>
          </Link>
          <Link className="nav_link" to='/skills'>
            <i onMouseEnter={()=>{this.enterNavButtons('cog')}} onMouseLeave={()=>{this.leaveNavButtons('cog')}} className="fas fa-lg fa-cog">
              <p className="p-cog">SKILLS</p>
            </i>
          </Link>
          <Link className="nav_link" to='/projects'>
            <i onMouseEnter={()=>{this.enterNavButtons('eye')}} onMouseLeave={()=>{this.leaveNavButtons('eye')}} className="fas fa-lg fa-eye">
              <p className="p-eye">PROJECTS</p>
            </i>
          </Link>
          <Link className="nav_link" to='/contact'>
            <i onMouseEnter={()=>{this.enterNavButtons('envelope')}} onMouseLeave={()=>{this.leaveNavButtons('envelope')}} className="fas fa-lg fa-envelope">
              <p className="p-envelope">CONTACT</p>
            </i>
          </Link>
        </section>
        <section className="nav_social_media">
          <a href="https://www.linkedin.com/in/fernandodlv" target="_blank"><i onMouseEnter={()=>{this.enterNavButtons('linkedin', true)}} onMouseLeave={()=>{this.leaveNavButtons('linkedin', true)}} className="fab fa-linkedin"/></a>
          <a href="https://www.facebook.com/fernandodlv32" target="_blank"><i onMouseEnter={()=>{this.enterNavButtons('facebook', true)}} onMouseLeave={()=>{this.leaveNavButtons('facebook', true)}} className="fab fa-facebook"/></a>
          <a href="https://www.instagram.com/f.dlv" target="_blank"><i onMouseEnter={()=>{this.enterNavButtons('instagram', true)}} onMouseLeave={()=>{this.leaveNavButtons('instagram', true)}} className="fab fa-instagram"/></a>
        </section>
      </main>
    )
  }
}
export default Nav;
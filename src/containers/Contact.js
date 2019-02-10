import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../styles/contact.css'
import * as actions from '../redux/actions';
import AnimateHOC from '../hocs/Animate';
import { TimelineMax, TweenMax, Elastic, Power4 } from 'gsap';
import GoogleMapReact from 'google-map-react';
import env from '../utility/env';
import FMarker from '../res/f_marker.png';

class Contact extends Component {
  constructor(props) {
    super(props)
    this.state = {
      introText: 'Contact Me',
      name: '',
      email: '',
      subject: '',
      message: '',
      emailError: false,
      messageError: false,
      emailValidationRegex: /^[-a-z0-9~!$%^&*_=+}{'?]+(\.[-a-z0-9~!$%^&*_=+}{'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i,
    }
  }

  componentWillMount = () => {
    this.props.setMountedComp('contact');
  }

  focusInput = (type) => {
    if (!this.state[`${type}Error`]) {
      TweenMax.to(`.contact-form-input-${type}`, .5, {outlineColor: '#BCDEFA'})
    }
  }

  blurInput = (type) => {
    if (!this.state[`${type}Error`]) {
      TweenMax.to(`.contact-form-input-${type}`, 0, {outlineColor: '#161b1f'})
    }
  }

  enterButton = () => {
    TweenMax.to(`.contact-form-button`, .5, {color: 'black'})
    TweenMax.to(`.contact-button-bg-send`, 1.8,{top: -50, left: 0, ease: Elastic.easeOut} )
  }
  leaveButton = () => {
    TweenMax.to(`.contact-form-button`, .5, {color: '#bcdefa'})
    TweenMax.to(`.contact-button-bg-send`, .5,{left: -120, top: 30, ease: Power4.easeOut})  
  }
  clickButton = () => {
    const tl = new TimelineMax();
    tl.to(`.contact-form-button`, .1, {height: 28.6})
      .to(`.contact-form-button`, 1, {height: 38.6, ease: Elastic.easeOut})  
  }

  handleChange = (event, type) => {
    const value = event.target.value;
    this.setState({
      [type]: value,
    })
    if (this.state[`${type}Error`]) {
      switch(type) {
        case 'email':
          this.setState({
            [`${type}Error`]: !this.state.emailValidationRegex.test(value)
          });
          break;
        case 'message':
          if (value.trim()) {
            this.setState({
              [`${type}Error`]: false
            });
          }
          break;
        default:
          break;
      }
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const { email, message } = this.state;
    let status = true;
    if (!this.state.emailValidationRegex.test(email)) {
      this.setState({
        emailError: true
      })
      status = false;
    }
    if (!message.trim()) {
      this.setState({
        messageError: true
      })
      status = false;
    }
    if (status) {
      e.target.submit()
    }
  }

  enterLink = (type) => {
    TweenMax.to(`.contact_link_${type}`, .4, {color: 'white'});
  }
  leaveLink = (type) => {
    TweenMax.to(`.contact_link_${type}`, .4, {color: '#59bd8e'});
  }

  render() {
    const { state } = this;

    const center = {
      lat: 34.29738,
      lng: -83.82531
    },
    zoom = 9;

    const Marker = ({ marker }) => {
      return <div>{marker}</div>;
    }

    return (
      <main className={'Contact'}>
        <article className="contact-intro-article">
          <section>
            <p className="contact-paragraph">
              Contact me by email at <a onMouseEnter={()=>{this.enterLink('email')}} onMouseLeave={()=>{this.leaveLink('email')}} className="contact-link contact-link-email" href="mailto:fernandodlv32@gmail.com">fernandodlv32@gmail.com</a>, or use the form below. I'll get back to you ASAP!
            </p>
          </section>
          <form 
            action="https://formspree.io/fernandodlv32@gmail.com" 
            method="post" 
            onSubmit={this.handleSubmit} 
            className="contact-form"
          >
            <aside>
              <input
                name="name"
                onChange={(e)=>this.handleChange(e, 'name')} 
                value={state.name} 
                onBlur={()=>{this.blurInput('name')}} 
                onFocus={()=>{this.focusInput('name')}} 
                className="contact-form-input contact-form-input-name" 
                placeholder="Name"
              />
              <input 
                style={{border: state.emailError? '1px solid red' : null}}
                name="email"
                onChange={(e)=>this.handleChange(e, 'email')} 
                value={state.email} 
                onBlur={()=>{this.blurInput('email')}} 
                onFocus={()=>{this.focusInput('email')}} 
                className="contact-form-input contact-form-input-email" 
                placeholder="*Email"
              />
            </aside>
            <input 
              name="subject"
              onChange={(e)=>this.handleChange(e, 'subject')} 
              value={state.subject} 
              onBlur={()=>{this.blurInput('subject')}} 
              onFocus={()=>{this.focusInput('subject')}} 
              className="contact-form-input contact-form-input-subject" 
              placeholder="Subject"
            />
            <textarea 
              style={{border: state.messageError? '1px solid red' : null}}
              name="message"
              onChange={(e)=>this.handleChange(e, 'message')} 
              value={state.message} 
              onBlur={()=>{this.blurInput('message')}} 
              onFocus={()=>{this.focusInput('message')}} 
              className="contact-form-input contact-form-input-message" 
              placeholder="*Message"  
              rows={5}
            />
            <div style={{position:'relative', height: 0, display:'flex', justifyContent:'flex-end', top: 55}}>
              <button 
                onClick={this.clickButton}
                onMouseEnter={this.enterButton} 
                onMouseLeave={this.leaveButton} 
                className="contact-form-button"
              >
                <p style={{position:'relative', zIndex:5}}>Send</p>
                <span className="contact-button-bg contact-button-bg-send"/>
              </button>
            </div>
          </form>
        </article>
        <section className="contact-map">
          <GoogleMapReact
            bootstrapURLKeys={{key: env.REACT_APP_GOOGLE_MAPS_KEY }}
            defaultCenter={center}
            defaultZoom={zoom}
          >
          <Marker
            lat={center.lat}
            lng={center.lng}
            marker={
              <img alt="Google maps marker" src={FMarker} style={{height:40, width: 32, opacity: .8, position:'absolute', top: -40}}/>
            }
          />
          </GoogleMapReact>
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

const animatedContact = AnimateHOC()(Contact);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(animatedContact);
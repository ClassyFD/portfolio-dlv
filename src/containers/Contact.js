import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../styles/contact.css'
import * as actions from '../redux/actions';
import AnimateHOC from '../hocs/Animate';
import { TimelineMax, Power1, TweenMax } from 'gsap';
import GoogleMapReact from 'google-map-react';
import env from '../utility/env';
import FMarker from '../res/f_marker.png';
import { debounce } from '../utility/utility';

class Contact extends Component {
  constructor(props) {
    super(props)
    this.state = {
      introText: 'Contact Me',
    }
  }

  componentWillMount = () => {
    this.props.setMountedComp('envelope');
  }

  componentDidMount = () => {
    const tl = new TimelineMax(); // heading
  
    tl.staggerFrom('.contact_it', 1, {opacity: 0}, .05, '+=.2')
    .staggerTo('.contact_it', .1, {color: '#59bd8e'}, .05, '-=1.3')
    .staggerTo('.contact_it', .3, {fontSize: '56px', ease: Power1.easeOut}, .05, '-=1.3')
    .staggerTo('.contact_it', .5, {color:'#ffffff'}, .03, '-=1')
      .staggerTo('.contact_it', .5, {fontSize: '48px', ease: Power1.easeOut}, .03, '-=.8');
      
    const ttl = new TimelineMax(); // text
    ttl.fromTo('.contact_p', 1, {opacity:0}, {opacity:1}, '+=.2')
      .fromTo('.contact_span', 1, {opacity:0}, {opacity:1}, '-=1');

    const ptl = new TimelineMax(); // picture
    ptl.fromTo('.contact_wrap', 1, {opacity:0}, {opacity:1}, '+=.2')

    window.onresize = debounce(this.windowResize, 50, 200);
    this.windowResize(true);
  }

  windowResize = (immediate) => {
    let ease = Power1.easeOut;
    let textWidth;
    let textStyle;
    let time = immediate? 0 : .3;
    const innerWidth = window.innerWidth;
    if (innerWidth > 1100) {
      textWidth = '40%'
    }
    if (innerWidth <= 1100) {
      textWidth = '40%'
    }
    if (innerWidth < 801) {
      textWidth = '80%'
    }

    textStyle = {
      width: textWidth,
      ease,
    }

    TweenMax.to('.contact_intro_section', time, textStyle);
    
    let pSize;
    let pStyle;
    if (innerWidth >= 460) {
      pSize = '16px';
    }
    if (innerWidth < 460) {
      pSize = '12px';
    }
    pStyle = {
      fontSize: pSize
    }
    TweenMax.to('.contact_p', time, pStyle);
    TweenMax.to('.contact_span', time, pStyle);

    let inputPadding;
    let inputStyle;

    if (innerWidth >= 650) {
      inputPadding = 15;
    }
    if (innerWidth < 650) {
      inputPadding = 10;
    }
    inputStyle = {
      padding: inputPadding
    }
    TweenMax.to('.contact_form_input', time, inputStyle)
  }

  enterIT = (type, index) => {
    const tl = new TimelineMax();
    tl.to(`.contact_${type}_${index}`, .1, {color: '#59bd8e'});
    tl.to(`.contact_${type}_${index}`, .3, {fontSize: '56px', color: '#59bd8e', ease: Power1.easeOut}, '-=.1');
  }
  leaveIT = (type, index) => {
    const tl = new TimelineMax();
    tl.to(`.contact_${type}_${index}`, .5, {color:'#ffffff'});
    tl.to(`.contact_${type}_${index}`, .5, {fontSize: '48px', ease: Power1.easeOut}, '-=.3');
  }

  focusInput = (type) => {
    TweenMax.to(`.contact_form_input_${type}`, .5, {outlineColor: '#59bd8e'})
  }

  blurInput = (type) => {
    TweenMax.to(`.contact_form_input_${type}`, 0, {outlineColor: '#37393b'})
  }

  render() {
    const { state } = this;
    let introText;
    introText = state.introText.split('');
    introText = introText.map((el, i)=>{
      return (
        <h1 key={i} onMouseEnter={()=>{this.enterIT('it', i)}} onMouseLeave={()=>{this.leaveIT('it', i)}} className={`contact_it contact_it_${i}`}>{el}{el===' ' ? '\xa0':''}</h1>
      )
    })

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
        <section className="contact_intro_section">
          <span className="contact_body_span contact_span">{"<body>"}</span>
            <span className="contact_h1_span contact_span">{"<h1>"}</span>
              <aside className="contact_h1">
              {introText}
              </aside>
            <span className="contact_h1_span contact_span">{"<h1/>"}</span>
            <span className="contact_p_span contact_span">{"<p>"}</span>
              <p className="contact_p">If you have any questions, please use the form below and I'll get back to you ASAP!</p>
            <span className="contact_p_span contact_span">{"</p>"}</span>
            <span className="contact_form_span contact_span">{"<form>"}</span>
              <form className="contact_form">
                <aside>
                  <input onBlur={()=>{this.blurInput('name')}} onFocus={()=>{this.focusInput('name')}} className="contact_form_input contact_form_input_name" placeholder="Name"></input>
                  <input onBlur={()=>{this.blurInput('email')}} onFocus={()=>{this.focusInput('email')}} className="contact_form_input contact_form_input_email" placeholder="Email"></input>
                </aside>
                <input onBlur={()=>{this.blurInput('subject')}} onFocus={()=>{this.focusInput('subject')}} className="contact_form_input contact_form_input_subject" placeholder="Subject"></input>
                <textarea onBlur={()=>{this.blurInput('message')}} onFocus={()=>{this.focusInput('message')}} className="contact_form_input contact_form_input_message" placeholder="Message" rows={5}/>
              </form>
            <span className="contact_form_span contact_span">{"</form>"}</span>
          <span className="contact_body_span contact_span">{"</body>"}</span>
        </section>
        <section className="contact_map" style={{ height: '100vh', width: '50%', opacity: .8}}>
          <GoogleMapReact
            bootstrapURLKeys={{key: env.REACT_APP_GOOGLE_MAPS_KEY }}
            defaultCenter={center}
            defaultZoom={zoom}
          >
          <Marker
            lat={center.lat}
            lng={center.lng}
            marker={
              <img src={FMarker} style={{height:40, width: 32, opacity: .8, position:'absolute', top: -40}}/>
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
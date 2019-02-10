import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../styles/skills.css'
import * as actions from '../redux/actions';
import AnimateHOC from '../hocs/Animate';
import { TimelineMax, TweenMax, Power0 } from 'gsap';
import { Link } from 'react-router-dom';
import ReactIcon from '../res/react-icon.png';
import NodeIcon from '../res/node-icon.png';
const animationTL = new TimelineMax();
class Skills extends Component {
  constructor(props) {
    super(props)
    this.state = {
      introText: 'My Skills',
      list1: [
        'JS', 'CSS3', 'HTML5', 'AngularJS', 'NodeJS', 
        'SASS', 'SCSS', 'MassiveJS', 'PostgreSQL', 'Redux', 
        'ExpressJS', 'Amazon Web Services', 'Google Cloud Platform', 'Firebase', 
        'RESTful APIs', 'Chrome Extension Development', 'Greensock Animating Platform',
        'NGINX', 'Linux/Unix administration', 'Python', 'Git/Github', 'jQuery',
        'Bootstrap', 'Auth0', 'StripeJS', 'GraphQL', 'ElasticSearch'
      ],
      list2: ["ReactJS"],
      choice: 'list1',
      currentText: 'ReactJS',
      previousText: 'ReactJS',
      plane: 'front',
    }
  }

  componentWillMount = () => {
    this.props.setMountedComp('skills');
  }
  
  componentDidMount = () => {
    this.animateBox();
  }
  
  componentWillUnmount = () => {
    animationTL.clear();
  }

  animateBox = () => {
    const { state } = this;
    let { choice, currentText, list1, list2 } = state;
    const list = state[choice];
    const randomNum = Math.ceil(Math.random() * 4);
    const rotationX = randomNum===1? '90deg' : randomNum===2? '-90deg' : '0deg';
    const rotationY = randomNum===3? '90deg' : randomNum===4? '-90deg' : '0deg';
    const item = list[Math.floor(Math.random()*list.length)];
    const index = list.indexOf(item);

    if (choice === 'list1') {
      list2.push(list1[index]);
      list1.splice(index, 1)
    } else {
      list1.push(list2[index]);
      list2.splice(index, 1)
    }
    
    if (list.length === 0) {
      choice = choice==='list1'? 'list2' : 'list1';
    }

    this.setState({
      currentText: item,
      previousText: currentText,
      list1,
      list2,
      choice,
    });
    
    animationTL.to('.skills-cube', 0, {rotationY: '0deg', rotationX: '0deg'})
      .to('.skills-cube', 1.5, {rotationY, rotationX, ease:Power0.easeOut})
      .to('.skills-cube', 0, {rotationY: '0deg', rotationX: '0deg'})
      .call(this.animateBox);      
    // if (item === 'Greensock Animating Platform') {
    //   animationTL.to('.skills_cube_el', .4, {backgroundColor: 'blue', ease: Power1.easeOut}, '-=1.5')
    //     .to('.skills_cube_el', .4, {backgroundColor: 'red', ease: Power1.easeOut}, '-=1.1')
    //     .to('.skills_cube_el', .4, {backgroundColor: 'white', ease: Power1.easeOut}, '-=.7')
    //     .to('.skills_cube_el', .3, {backgroundColor: '#59bd8e', ease: Power1.easeOut}, '-=.3');
    // }
  }

  enterLink = (type) => {
    TweenMax.to(`.skills-link-${type}`, .4, {color: '#59bd8e'});
  }
  leaveLink = (type) => {
    TweenMax.to(`.skills-link-${type}`, .4, {color: '#BCDEFA'});
  }

  render() {
    return (
      <main className={'Skills'}>
        <article className="skills-intro-article">
          <section className="skills-front-end">
            <div className="skills-heading-container">
              <h2>Front End</h2>
              <img alt="react-icon" src={ReactIcon}></img>
            </div>
            <ul>
              <li>ReactJS</li>
              <li>Redux</li>
              <li>HTML5</li>
              <li>CSS3</li>
              <li>JS/ES6</li>
              <li>React Router / Single Page Applications</li>
              <li>Axios / RESTful APIs</li>
            </ul>
            <p>I mainly work with front end technology (HTML5, CSS3, ES5/ES6 JavaScript) to build scalable, responsive, single page web applications. I use ReactJS for most of my projects, and manage state with Redux. </p> 
            <p>I've used a variety of APIs and libraries in my apps. I also like to add animation to make the apps stand out!</p>
          </section>
          <section className="skills-front-end">
            <div className="skills-heading-container">
              <h2>Back End</h2>
              <img alt="node-icon" style={{margin: 0}} src={NodeIcon}></img>
            </div>
            <ul>
              <li>NodeJS</li>
              <li>ExpressJS</li>
              <li>Auth0</li>
              <li>MassiveJS</li>
              <li>PostgreSQL / Database Management</li>
              <li>SQL Tabs</li>
              <li>ElasticSearch</li>
              <li>GraphQL</li>
              <li>Firebase</li>
              <li>AWS S3</li>
            </ul>
            <p>For the back end, I usually build Express apps with NodeJS. I handle database management with either MassiveJS/PostgreSQL, and I host all of my websites with Firebase.</p>
            <p>I have experience with Amazon Web Services and Google Cloud Platform.</p>
          </section>
          <p>Please <Link to='/contact' onMouseEnter={()=>{this.enterLink('contact')}} onMouseLeave={()=>{this.leaveLink('contact')}} className="skills-link skills-link-contact">contact me</Link> to learn more!</p>
        </article>
        <section className="skills-wrap">
          <aside className="skills-cube">
            <div className="skills-cube-el skills-cube-front">{this.state.previousText}</div>
            <div className="skills-cube-el skills-cube-top">{this.state.currentText}</div>
            <div className="skills-cube-el skills-cube-bottom">{this.state.currentText}</div>
            <div className="skills-cube-el skills-cube-left">{this.state.currentText}</div>
            <div className="skills-cube-el skills-cube-right">{this.state.currentText}</div>
          </aside>
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

const animatedSkills = AnimateHOC()(Skills)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(animatedSkills);
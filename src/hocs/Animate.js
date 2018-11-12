import React, { Component } from "react";
import * as actions from '../redux/actions/nav.actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { TimelineMax } from "gsap";

const AnimateHOC = () => {
  return (BaseComponent) => {
    class Animate extends Component {
      componentWillReceiveProps = (props) => {
        const tl = new TimelineMax();
        const { animatedComp } = props;
        if (animatedComp && animatedComp.status) {
          if (animatedComp.route !== props.match.path) {
            tl.to('.animate-hoc', .5, {opacity: 0})
            .call((()=>{
              props.history.push(animatedComp.route)
              props.setAnimatedComp(animatedComp.route)
            }), null, null);
          }
        } else {
          tl.fromTo('.animate-hoc', .5, {opacity: 0}, {opacity: 1});
        }
      }

      componentWillUnmount = () => {
        window.onresize = null
      }

      render = () => {
        return (
          <main className="animate-hoc">
            <BaseComponent {...this.props}/>
          </main>
        ); 
      }
    };
    
    const mapDispatchToProps = (dispatch) => {
      return {
        setAnimatedComp: (route) => dispatch({
          type: actions.SET_ANIMATED_COMP,
          animatedComp: {
            status: false,
            route
          },
        })
      }
    } 

    const mapStateToProps = (state) => {
      return {
        animatedComp: state.nav.animatedComp,
      }
    }

    return withRouter(connect(
      mapStateToProps,
      mapDispatchToProps,
    )(Animate))
  }
}

export default AnimateHOC;
import React, { Component } from 'react'
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup'
import MenuSideBarHeader from './MenuSideBarHeader'
import './index.sass'

// panes
import MainPane from './Panes/MainPane'
import MorePane from './Panes/MorePane'
import ActivityPane from './Panes/ActivityPane'
import ChangeBackgroundPane from './Panes/ChangeBackgroundPane'
import FilterCardsPane from './Panes/FilterCardsPane'
import LabelsPane from './Panes/LabelsPane'
import PowerUpsPane from './Panes/PowerUpsPane'
import SettingsPane from './Panes/SettingsPane'
import StickersPane from './Panes/StickersPane'
import UnarchivePane from './Panes/UnarchivePane'

export default class MenuSideBar extends Component {

  static PropTypes = {
    board: React.PropTypes.object.isRequired,
    onClose: React.PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      panes: [],
      goingBack: false,
    }
    this.close = this.close.bind(this)
    this.gotoPane = this.gotoPane.bind(this)
    this.goBack = this.goBack.bind(this)
    this.goBackIfUserHitsEscape = this.goBackIfUserHitsEscape.bind(this)
  }

  componentDidMount(){
    document.addEventListener('keydown', this.goBackIfUserHitsEscape, false)
  }

  componentWillUnmount(){
    document.removeEventListener('keydown', this.goBackIfUserHitsEscape)
  }

  close(event) {
    if (event) event.preventDefault()
    this.props.onClose()
  }

  gotoPane(pane) {
    return (event) => {
      if (event) event.preventDefault()
      this.setState({
        panes: [pane].concat(this.state.panes),
        goingBack: false,
      })
    }
  }

  goBack() {
    this.setState({
      panes: this.state.panes.slice(1),
      goingBack: true,
    })
  }

  goBackIfUserHitsEscape(event) {
    if (event.key === "Escape") {
      event.preventDefault()
      this.goBack()
    }
  }

  render() {
    const { board } = this.props
    const paneName = this.state.panes[0] || 'Main'
    const panesMap = {
      "Main":               MainPane,
      "Change Background":  ChangeBackgroundPane,
      "Settings":           SettingsPane,
      "Filter Cards":       FilterCardsPane,
      "Unarchive":          UnarchivePane,
      "Power-Ups":          PowerUpsPane,
      "Stickers":           StickersPane,
      "Activity":           ActivityPane,
      "More":               MorePane,
      "Labels":             LabelsPane,
    }
    const PaneComponent = panesMap[paneName]

    return <div className="BoardShowPage-MenuSideBar">
      <MenuSideBarHeader
        panes={this.state.panes}
        goBack={this.goBack}
        onClose={this.close}
      />
      <ReactCSSTransitionGroup
        component="div"
        className="BoardShowPage-MenuSideBar-panes"
        transitionName={this.state.goingBack ? "leftIn" : "rightIn"}
        transitionEnterTimeout={200}
        transitionLeave={false}
      >
        <PaneComponent
          key={paneName}
          board={board}
          onClose={this.close}
          gotoPane={this.gotoPane}
          goBack={this.goBack}
        />
      </ReactCSSTransitionGroup>
    </div>
  }
}

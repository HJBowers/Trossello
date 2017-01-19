import React, { Component } from 'react'
import Link from '../../Link'
import Icon from '../../Icon'
import moment from 'moment'
import PopoverMenuButton from '../../PopoverMenuButton'
import DueDateLabelPopover from './DueDateLabelPopover'
import LabelSection from './LabelSection'
import './DueDateLabel.sass'

export default class DueDateLabel extends Component {
  constructor(props){
    super(props)
    this.dueStatus = this.dueStatus.bind(this)
  }

  dueStatus() {
    const dueDate = moment(this.props.card.due_date)
    const pastDue = moment().isAfter(dueDate)
    const status = {
      className: "",
      preText: "",
      postText: ""
    }

    if (pastDue) {
      if (dueDate.isBefore(moment().subtract(1, "days"), "day")) {
        status.className = "Card-DueDateLabel-due-past-long"
        status.preText = dueDate.format("MMM D [at] h:mm")
        status.postText = "(past due)"
      } else {
        status.className = "Card-DueDateLabel-due-past-recent"
        status.preText = dueDate.calendar(moment(), "D hh:mm A");
        status.postText = "(recently past due)"
      }
    } else {
      if (dueDate.isAfter(moment().add(1, "days"), "day")) {
        status.className = "Card-DueDateLabel-due-future-distant"
        status.preText = dueDate.format("MMM D [at] h:mm")
      } else {
        status.className = "Card-DueDateLabel-due-future-near"
        status.preText = dueDate.calendar(moment(), "D hh:mm A");
        status.postText = "(due soon)"
      }
    }
    if (this.props.card.complete){
      status.className = "Card-DueDateLabel-due-complete"
      status.postText = ""
    }
    return status
  }

  render(){
    const { card, shownOn } = this.props
    let status = this.dueStatus()
    let className = `Card-DueDateLabel-due ${status.className || ''}`
    let renderBadge

    if (shownOn === "front"){
      let shortDate = moment(card.due_date).format("MMM D")
      return <div className={className}>
        <Icon
          type="clock-o"
          className="Card-DueDateLabel-due-dueIcon"
        />
        <span className="Card-DueDateLabel-due-dueText">{shortDate}</span>
      </div>
    }

    let longDate = status.preText
    const dueDatePopover = <DueDateLabelPopover card={card}/>
    className += " Card-DueDateLabel-due-large"

    return <LabelSection heading="Due Date">
      <PopoverMenuButton
        key={card.id}
        type="unstyled"
        popover={dueDatePopover}
        className="Card-DueDateLabel-container"
      >
        <div className={className}>
          <span className="Card-DueDateLabel-due-dueText">
            {longDate + ' ' + status.postText}
          </span>
        </div>
      </PopoverMenuButton>
    </LabelSection>
  }
}

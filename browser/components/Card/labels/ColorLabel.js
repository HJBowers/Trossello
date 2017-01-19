import React, { Component } from 'react'
import Icon from '../../Icon'
import './ColorLabel.sass'

export default class ColorLabel extends Component {
  static propTypes = {
    text: React.PropTypes.string.isRequired,
    color: React.PropTypes.string.isRequired,
    className: React.PropTypes.string,
    checked: React.PropTypes.bool,
  }

  render(){
    console.log(this.props)
    const { text, checked, color } = this.props
    const check = checked ?
      <div className="Card-ColorLabel-check">
        <Icon type="check"/>
      </div> : null
    const className = this.props.className
    ? `Card-ColorLabel Card-ColorLabel-${color} ${this.props.className}`
    : `Card-ColorLabel Card-ColorLabel-${color}`

    return <div className={className}>
      <div className="Card-ColorLabel-text">
        {text}
      </div>
      {check}
    </div>
  }
}

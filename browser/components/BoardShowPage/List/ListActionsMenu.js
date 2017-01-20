import React, { Component } from 'react'
import ActionsMenu from '../ActionsMenu'
import ArchiveAllCardsPane from './Panes/ArchiveAllCardsPane.js'
import CopyListPane from './Panes/CopyListPane.js'
import ListActionsPane from './Panes/ListActionsPane.js'
import MoveAllCardsPane from './Panes/MoveAllCardsPane.js'
import MoveListPane from './Panes/MoveListPane.js'
import './ListActionsMenu.sass'

export default class ListActionsMenu extends Component {
  static propTypes = {
    board: React.PropTypes.object.isRequired,
    list: React.PropTypes.object.isRequired,
    // onClose: React.PropTypes.func.isRequired,
  }

  constructor(props){
    super(props)
    this.createCard = this.createCard.bind(this)
  }

  createCard(event){
    this.props.onCreateCard()
    this.props.onClose()
  }

  render(){
    const { board, list, onClose } = this.props
    return <ActionsMenu
      className="ListActionsMenu"
      defaultPane="List Actions"
      paneProps={{
        board,
        list,
        onClose,
        createCard: this.createCard,
      }}
      panes={{
        "List Actions": ListActionsPane,
        "Copy List": CopyListPane,
        "Move List": MoveListPane,
        "Move All Cards": MoveAllCardsPane,
        "Archive All Cards": ArchiveAllCardsPane,
      }}
    />
  }
}

import React from 'react'
import DueDateLabelPopover from '../../Card/labels/DueDateLabelPopover'
import CopyCardDialog from './CopyCardDialog'
import UnarchiveCardButton from './UnarchiveCardButton'
import ArchiveCardButton from './ArchiveCardButton'
import DeleteCardButton from './DeleteCardButton'
import CardMembersMenu from './CardMembersMenu'
import PopoverMenuButton from '../../PopoverMenuButton'
import Icon from '../../Icon'

const CardModalControls = ({board, list, card, closeModal, labelPanel}) => {
  const dueDate = <DueDateLabelPopover card={card}/>
  const copyCard = <CopyCardDialog card={card} board={board} list={list}/>
  const toggleOnArchived = card.archived ?
    <div>
      <UnarchiveCardButton card={card} />
      <DeleteCardButton card={card} onDelete={closeModal} />
    </div> :
    <ArchiveCardButton card={card} />
  const cardMembersMenu = <CardMembersMenu board={board} card={card} />

  return <div className="CardModal-Controls">
    <div className="CardModal-Controls-title">Add</div>
    <PopoverMenuButton
      className="CardModal-Controls-members"
      popover={cardMembersMenu}
    >
      <Icon type="user" /> Members
    </PopoverMenuButton>
    <PopoverMenuButton className="CardModal-Controls-label" type="default" popover={labelPanel}>
      <Icon type="tag" /> Labels
    </PopoverMenuButton>
    <PopoverMenuButton className="CardModal-Controls-label" type="default" popover={dueDate}>
      <Icon type="clock-o" /> Due Date
    </PopoverMenuButton>
    <div className="CardModal-Controls-title">Actions</div>
    {toggleOnArchived}
    <PopoverMenuButton className="CardModal-Controls-copy" type="default" popover={copyCard}>
      <Icon type="files-o" /> Copy
    </PopoverMenuButton>
  </div>
}

export default CardModalControls

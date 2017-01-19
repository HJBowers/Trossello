import React from 'react'
import ActionsMenuPane from '../../ActionsMenuPane'

const MoveListPane = ({onClose, goToPane}) => {
  return <ActionsMenuPane
    className="ListActionsMenu-MoveListPane"
    heading="Move List"
    onClose={onClose}
    onBack={goToPane('List Actions')}
    >
  </ActionsMenuPane>
}

export default MoveListPane

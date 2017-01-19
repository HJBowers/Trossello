import React from 'react'

const CardModalShroud = ({onClose, children}) => {
  return <div className="CardModal-CardModalShroud-container">
    <div onClick={onClose} className="CardModal-CardModalShroud-shroud"></div>
    <div className="CardModal-CardModalShroud-stage">
      <div className="CardModal-CardModalShroud-window">
        {children}
      </div>
    </div>
  </div>
}

export default CardModalShroud

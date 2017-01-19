import React from 'react'
import CardName from './CardName'
import Icon from '../../Icon'

const CardHeader = ({card, list}) => {
  return <div className="CardModal-CardHeader">
    <div className="CardModal-CardHeader-header">
      <div className="CardModal-CardHeader-header-icon">
        <Icon type="window-maximize" size='1'/>
      </div>
      <div className="CardModal-CardHeader-header-title">
        <CardName card={card} />
      </div>
    </div>
    <div className="CardModal-CardHeader-list">
        in list <span className="CardModal-CardHeader-list-name">
          {list.name}
        </span>
    </div>
  </div>
}

export default CardHeader

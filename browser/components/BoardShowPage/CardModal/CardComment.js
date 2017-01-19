import React, { Component } from 'react'
import TimeFromNow from '../../TimeFromNow'
import ContentForm from '../ContentForm'
import Link from '../../Link'
import commands from '../../../commands'

export default class CardComment extends Component {

  constructor(props){
    super(props)
    this.state = {
      editing: false,
    }
    this.editComment = this.editComment.bind(this)
    this.stopEditingComment = this.stopEditingComment.bind(this)
    this.updateComment = this.updateComment.bind(this)
    this.deleteComment = this.deleteComment.bind(this)
  }

  componentWillReceiveProps(nextProps){
    if (this.props!==nextProps) {
      this.setState({updatedAt: this.state.nextProps})
    }
  }

  editComment(event) {
    if (event) event.preventDefault()
    this.setState({editing: true})
  }

  stopEditingComment(event){
    if (event) event.preventDefault()
    this.setState({editing: false})
  }

  updateComment(content, event) {
    const { comment } = this.props
    if (event) event.preventDefault()
    commands.updateComment(comment.card_id, comment.id, content)
      .then(() => this.stopEditingComment())
  }

  deleteComment(event) {
    const { comment } = this.props
    if (event) event.preventDefault()
    commands.deleteComment(comment.card_id, comment.id)
  }

  render(){
    const {comment, users} = this.props
    const user = users.find(user => user.id === comment.user_id)

    const commentTimestamp = <div className="CardModal-CardComment-comment-controls-time">
      <TimeFromNow time={comment.created_at}/>
      {comment.created_at === comment.updated_at ? '' : ' (edited)'}
    </div>

    const commentBox = this.state.editing ?
      <div className="CardModal-CardComment-comment">
        <ContentForm
          ref="comment"
          className="CardModal-CommentEditForm"
          onSave={this.updateComment}
          onCancel={this.stopEditingComment}
          submitButtonName="Save"
          defaultValue={comment.content}
        />
      </div>
    :
      <div className="CardModal-CardComment-comment">
        <div className="CardModal-CardComment-comment-box">
          {comment.content}
        </div>
        <div className="CardModal-CardComment-comment-controls">
          {commentTimestamp}
          <span className="CardModal-CardComment-comment-controls-margin">-</span>
          <Link onClick={this.editComment} className="CardModal-CardComment-comment-controls-edit">
            Edit
          </Link>
          <span className="CardModal-CardComment-comment-controls-margin">-</span>
          <Link onClick={this.deleteComment} className="CardModal-CardComment-comment-controls-delete">
            Delete
          </Link>
        </div>
      </div>

    return <div className="CardModal-CardComment">
      <div className="CardModal-CardComment-user">
        <img
          className="CardModal-CardComment-user-image"
          src={user.avatar_url}
        />
        <span className="CardModal-CardComment-user-name">
          {user.name}
        </span>
      </div>
      {commentBox}
      <div className="CardModal-CardComment-border"/>
    </div>
  }
}

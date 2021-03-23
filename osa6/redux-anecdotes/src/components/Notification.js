import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  const notificationState = props.notification
  
  const style = {
    display: notificationState ? 'block' : 'none',
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  return (
    <div style={style}>
      {notificationState}
    </div>
  )
}

const mapStateToProps = (state) => ({ notification: state.notification })

const ConnectedNotifications = connect(mapStateToProps)(Notification)
export default ConnectedNotifications
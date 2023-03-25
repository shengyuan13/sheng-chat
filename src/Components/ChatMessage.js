function ChatMessage (props) {
  const { text, uid, photoURL } = props.message;
  const messageClass = props.user.uid === uid ? 'sent' : 'received';

  return (
    <>
      <div className={`message ${messageClass}`}>
        <img referrerPolicy="no-referrer" src={photoURL || 'https://picsum.photos/200/300'}/>
        <p>{text}</p>
      </div>
    </>
  )
}

export default ChatMessage;
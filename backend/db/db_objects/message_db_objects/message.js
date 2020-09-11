class Message {
  constructor(topicId, authorName, text) {
    this.topicId = topicId;
    this.authorName = authorName;
    this.creationDate = new Date();
    this.text = text;
  }
}
module.exports = Message;

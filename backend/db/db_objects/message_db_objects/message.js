class Message {
  constructor(topicId, author, creationDate, text) {
    this.topicId = topicId;
    this.author = author;
    this.creationDate = creationDate;
    this.text = text;
  }
}
module.exports = Message;

class Memo {
  constructor(id, content) {
    this.id = id;
    this.content = content;
  }

  getTitle() {
    return this.content.split("\n")[0];
  }
}

export default Memo;

#!/usr/bin/env node

import Enquirer from "enquirer";
import MemoDb from "./memo_db.js";

class MemoApp {
  constructor() {
    this.memoDb = new MemoDb();
  }

  async createMemo() {
    let content = "";
    process.stdin.on("data", (chunk) => {
      content += chunk;
    });
    process.stdin.on("end", async () => {
      await this.memoDb.createMemo(content);
      console.log("メモが保存されました。");
      this.memoDb.close();
    });
  }

  async listMemos() {
    const memos = await this.memoDb.getAllMemos();
    if (memos.length === 0) {
      console.log("メモはありません。");
      this.memoDb.close();
      return;
    } else {
      memos.forEach((memo) => {
        console.log(memo.getTitle());
      });
    }
    this.memoDb.close();
  }

  async readMemo() {
    const memos = await this.memoDb.getAllMemos();
    if (memos.length === 0) {
      console.log("メモはありません。");
      this.memoDb.close();
      return;
    }

    const { prompt } = Enquirer;
    const response = await prompt({
      type: "select",
      name: "memo",
      message: "参照するメモを選択してください",
      choices: memos.map((memo) => ({
        name: memo.id,
        message: memo.getTitle(),
      })),
    });
    const memo = await this.memoDb.getMemo(response.memo);
    console.log(memo.content);
    this.memoDb.close();
  }

  async deleteMemo() {
    const memos = await this.memoDb.getAllMemos();
    if (memos.length === 0) {
      console.log("メモはありません。");
      this.memoDb.close();
      return;
    }

    const { prompt } = Enquirer;
    const response = await prompt({
      type: "select",
      name: "memo",
      message: "削除するメモを選択してください",
      choices: memos.map((memo) => ({
        name: memo.id,
        message: memo.getTitle(),
      })),
    });
    await this.memoDb.deleteMemo(response.memo);
    console.log("メモが削除されました。");
    this.memoDb.close();
  }

  async run() {
    const args = process.argv.slice(2);
    if (args.length === 0) {
      await this.createMemo();
    } else if (args[0] === "-l") {
      await this.listMemos();
    } else if (args[0] === "-r") {
      await this.readMemo();
    } else if (args[0] === "-d") {
      await this.deleteMemo();
    } else {
      this.memoDb.close();
    }
  }
}
const memoApp = new MemoApp();
memoApp.run();

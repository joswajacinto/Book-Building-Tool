import React, { Component } from "react";
import "./App.css";
import Title from "./components/Title";
import Forms from "./components/Forms";
import styled from "styled-components";
import TinyEditor from "./components/TinyEditor";
import Converter from "./components/Converter";
import { parse } from "himalaya";

const FormsBox = styled.div`
  display: flex;
  width: 90%;
  margin: 0 auto;
`;

class App extends Component {
  state = {
    publisher: "",
    html: "",
    chapterName: "",
    chapterNum: 0,
    author: ""
    // nextChapterName: ""
  };

  setChapterInfo = (
    html,
    chapterName,
    chapterNum,
    author,
    // nextChapterName,
    publisher
  ) => {
    this.setState({
      html,
      chapterName,
      chapterNum,
      author,
      // nextChapterName,
      publisher
    });
  };

  handleEditorChange = e => {
    console.log("Content was updated:", e.target.getContent());
  };

  handleConvetToJson = e => {
    function removeEmptyNodes(nodes) {
      return nodes.filter(node => {
        if (node.type === "element") {
          node.children = removeEmptyNodes(node.children);
          return true;
        }
        return node.content.length;
      });
    }

    function stripWhitespace(nodes) {
      return nodes.map(node => {
        if (node.type === "element") {
          node.children = stripWhitespace(node.children);
        } else {
          node.content = node.content.trim();
        }
        return node;
      });
    }

    function removeWhitespace(nodes) {
      return removeEmptyNodes(stripWhitespace(nodes));
    }

    const html = this.state.html;
    const json = parse(html);

    removeWhitespace(json);

    console.log("👉", json);
  };

  render() {
    console.log(this.state);
    return (
      <div className="App">
        <Title version="1.0.0v" />
        <FormsBox>
          <Forms setChapterInfo={this.setChapterInfo} />
          <TinyEditor
            state={this.state}
            handleEditorChange={this.handleEditorChange}
          />
        </FormsBox>

        <Converter handleConvetToJson={this.handleConvetToJson} />
      </div>
    );
  }
}

export default App;

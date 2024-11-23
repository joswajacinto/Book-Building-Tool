import React, { Component } from "react";
import { Editor } from "@tinymce/tinymce-react";
import styled from "styled-components";

const TinyEditorWrapper = styled.div`
  width: 50%;
  margin-top: 2%;
`;

class TinyEditor extends Component {
  render() {
    // console.log(addChapterStyles(...this.props.html));
    return (
      <TinyEditorWrapper>
        <Editor
          apiKey="w12jxn9vfvgq3tvrfh92jetlgkmu0orc8cgn3r9daz7sq8i9"
          value={
            !this.props.state.html
              ? null
              : `
          <div
          class="chapter"
            data-chapter-number=${this.props.state.chapterNum}
          >
            <div class="chapter-start">
              <div class="ch-head">
                Chapter
                <span class="chapter-number">
                  ${this.props.state.chapterNum}
                </span>
              </div>
              <h1 class="chaptertitle">${this.props.state.chapterName}</h1>
              <h3 class="author">${this.props.state.author}</h3>
            </div>
            ${this.props.state.html}
          </div>`
          }
          // initialValue={`<p>Generate HTML</p>`}
          init={{
            height: "100%",
            plugins: "link image code codesample",
            toolbar:
              "undo redo | bold italic | alignleft aligncenter alignright | code codesample | formatselect ",
            valid_elements: "*[*]"
          }}
          codesample_languages={[
            { text: "HTML/XML", value: "markup" },
            { text: "JavaScript", value: "javascript" },
            { text: "CSS", value: "css" },
            { text: "PHP", value: "php" },
            { text: "Ruby", value: "ruby" },
            { text: "Python", value: "python" },
            { text: "Java", value: "java" },
            { text: "C", value: "c" },
            { text: "C#", value: "csharp" },
            { text: "C++", value: "cpp" }
          ]}
          onChange={this.props.handleEditorChange}
        />
      </TinyEditorWrapper>
    );
  }
}

export default TinyEditor;

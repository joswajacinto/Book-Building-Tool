import React from "react";

const Clean = props => {
  return (
    <div id="reeedr-body">
      <div
        className="chapter"
        data-chapter-number={props.bookDetail.chapterNum}
      >
        <div className="chapter-start">
          <div className="ch-head">
            {" "}
            Chapter{" "}
            <span className="chapter-number">
              {props.bookDetail.chapterNum}
            </span>
          </div>
          <h1 className="chaptertitle">{props.bookDetail.chapterName}</h1>
          <h3 className="author">{props.bookDetail.author}</h3>
        </div>
        <div
          contenteditable="true"
          className=""
          dangerouslySetInnerHTML={{ __html: props.bookDetail.html }}
        />
        <div className="next-chapter-wrapper">
          <a
            className="next-chapter-button"
            data-next-chapter={parseInt(props.bookDetail.chapterNum) + 1}
          >
            <span>NEXT :</span>
            {props.bookDetail.nextChapterName}
            <i className="fas fa-chevron-right" />
          </a>
        </div>
        <div className="chapter-end" />
      </div>
    </div>
  );
};

export default Clean;

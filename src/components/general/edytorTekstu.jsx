import React, { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';


import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import styles from "./edytorTekstu.module.css"

export default class Edytor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editorState: EditorState.createEmpty(),
    }
    this.onEditorStateChange = this.onEditorStateChange.bind(this)
  }


  onEditorStateChange = (editorState) => {
    this.setState({
      editorState: editorState,
    });
    // Po zmianie stanu wywoływana jest funkcja onEdytorChange przekazana od rodzica, jako argument podawany jest tekst edytora w wformie html
    // onEdytorChange z założenia ustawia stan rodzica
    this.props.onEdytorChange(draftToHtml(convertToRaw(editorState.getCurrentContent())))
  };

  render() {
    const { editorState } = this.state;
    return (
      <div className={styles.edytorTekstu}>
        <Editor
          editorState={editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={this.onEditorStateChange}
        />
        {/* <textarea
          disabled
          value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
        /> */}
      </div>
    );
  }
}
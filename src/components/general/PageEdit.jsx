import React from "react";
import axios from 'axios'
import ReactHtmlParser from 'react-html-parser'; 

import EdytorTekstu from './edytorTekstu';
import ConfirmButton from "./confirmButton";

export default class PageEdit extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        paragraphs: this.props.paragraphs || [],
        edit: null
      }
      this.addParagraph = this.addParagraph.bind(this)
      this.editParagraph = this.editParagraph.bind(this)
      this.onEdytorChange = this.onEdytorChange.bind(this)
      this.saveParagraph = this.saveParagraph.bind(this)
    }

    componentDidUpdate() {
      console.log(this.state)
      console.log(this.props)
    }

    addParagraph() {
      var newparagraph = {
        page: this.props.name,
        IdPage: this.state.paragraphs.length,
        content: '<p>Nowy paragraf!</p>',
      }
      if(newparagraph.IdPage === undefined)
      newparagraph.IdPage = 0

      this.setState(prevState => ({
        paragraphs: [...prevState.paragraphs, newparagraph]
      }))
    }

    editParagraph(IdPage) {
      this.setState({edit: IdPage})
    }

    saveParagraph() {
      this.setState({edit: null})
      this.props.editPage(this.state.paragraphs)

      const page = {
        name: this.props.name,
        paragraphs: this.state.paragraphs
      }

      return axios
			.post('../api/general/editPage', page)
				.catch(err => {
					console.log(err);
				})

    }

    onEdytorChange(editorState) {
      const newEditorState = editorState.replace(/[\n]/g, "")
      
      if (this.state.edit !== null){
      this.setState(prevState=>{
        const paragraphs = [...prevState.paragraphs];
        paragraphs[this.state.edit].content = newEditorState;
        return {paragraphs: paragraphs};
      })}
    }

    render() {
        return (
          <>
            <button onClick={this.addParagraph}>Dodaj</button>
            {this.state.paragraphs.length>0 && this.state.paragraphs.map(paragraph =>
            this.state.edit !== paragraph.IdPage ?
              <div key={paragraph.page+'_'+paragraph.IdPage}>
                {ReactHtmlParser(paragraph.content)}
                {this.state.edit === null && <button onClick={()=>this.editParagraph(paragraph.IdPage)}>Edycja</button>}
              </div>
              :
              <div key={paragraph.page+'_'+paragraph.IdPage}>
                <EdytorTekstu
                  text={paragraph.content}
                  onEdytorChange={this.onEdytorChange}
                />
                <ConfirmButton onClickFunction={this.saveParagraph}>
                  <button>Zapisz</button>
                </ConfirmButton>
              </div>
            
            )}
          </>
        );
      }
    }
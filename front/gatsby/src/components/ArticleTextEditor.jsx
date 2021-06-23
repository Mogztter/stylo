import React, { useEffect, useRef, useState } from 'react'
import { Controlled as CodeMirror } from "react-codemirror2";
import { useSelector, shallowEqual } from "react-redux";

export default function ArticleTextEditor () {
  console.log('ArticleTextEditor')
  const [articleText, setArticleText] = useState('')
  const { articleText: initialText } = useSelector(({ articleText }) => ({
    articleText
  }), shallowEqual)
  useEffect(() => {
    setArticleText(initialText)
  }, [initialText])
  const codeMirrorInstanceRef = useRef(null)
  const codeMirrorOptions = {
    mode: 'markdown',
    lineWrapping: true,
    lineNumbers: false,
    autofocus: true,
    viewportMargin: Infinity,
    spellcheck: true,
    extraKeys: {
      'Shift-Ctrl-Space': function (cm) {
        cm.replaceSelection('\u00a0')
      },
    },
  }
  const handleArticleTextChange = (text) => {
    setArticleText(text)
  }
  return <CodeMirror
    value={articleText}
    cursor={{ line: 0, character: 0 }}
    editorDidMount={(_) => {
      window.scrollTo(0, 0)
      //editor.scrollIntoView({ line: 0, ch: 0 })
    }}
    onBeforeChange={(editor, data, text) => handleArticleTextChange(text)}
    options={codeMirrorOptions}
    ref={codeMirrorInstanceRef}
  />
}

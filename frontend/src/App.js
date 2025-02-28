import './App.css';
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor"
import axios from "axios"
import Markdown from 'react-markdown'
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import { useState,useEffect } from 'react';
function App() {

  const [code,setCode] = useState(`function sum() {
   return 1+1;
   }`)

    const [loading, setloading] = useState(false)

  useEffect(() => {
    Prism.highlightAll();
  },[])
  
  const [review, setreview] = useState(``)

    async function reviewCode(){

      setloading(true);

    const response = await  axios.post("http://localhost:3000/ai/get-review",{code})
    console.log(response.data)
    setloading(false);
    setreview(response.data)

    }



  return (
    <>
      <main>
        <div className='left'>
          <div className='code'>
          <Editor
              value={code}
              onValueChange={(code) => setCode(code)}
              highlight={(code) =>
                Prism.highlight(code, Prism.languages.javascript, "javascript")
              }
              padding={10}
              style={{
                fontFamily: '"Fira Code", "Fira Mono", monospace',
                fontSize: "16px",
                border: "1px solid #ddd",
                borderRadius: "5px",
                height: "100%",
                width: "100%",
                caretColor: "white",
                backgroundColor: "#1e1e1e", // Dark theme background
                lineHeight: "1.5",
                color: "white", // Default text color (Prism will override with styles)
              }}
            />

          </div>
          <div className='review' onClick={reviewCode}>Review</div>
        </div>
        <div className='right'>
        {
          loading ?<div className='loader-container'> <div className='loader'/></div> : <Markdown  rehypePlugins={[ rehypeHighlight ]}>
            {review}
          </Markdown>
        }
          
        </div>
      </main>
    </>
  );
}

export default App;

import { useState } from "react";
import { toast, Toaster } from "./toast";
import "./App.css";

const callApi = async (path, body, setter) => {
  try {
    const res = await fetch(`/api/${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (!res.ok) throw data;
    setter(data[path === "encode" ? "encoded" : "text"]);
  } catch (e) {
    const map = {
      INPUT_TOO_LONG: "Message exceeds 280 characters.",
      UNSUPPORTED_CONTROL_CHAR:
        "Input contains unsupported control characters.",
      UNKNOWN_SYMBOL: "Encoded text contains unknown symbols.",
    };
    toast(map[e.error] || "Server unreachable. Please try again.");
  }
};

export default function App() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  return (
    <div className="wrapper">
      <div className="cipher-box">
        <h1 className="title">Symbol Cipher Tool</h1>

        <div className="field-group">
          {/* Input */}
          <div className="field">
            <label htmlFor="input" className="label">
              Input
            </label>
            <textarea
              id="input"
              rows={6}
              className="textarea input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter text to encode or decode..."
            />
          </div>

          {/* Output */}
          <div className="field">
            <label htmlFor="output" className="label">
              Output
            </label>
            <textarea
              id="output"
              rows={6}
              className="textarea output"
              value={output}
              readOnly
              placeholder="Output will appear here..."
            />
          </div>
        </div>

        <div className="button-group">
          <button
            onClick={() => callApi("encode", { text: input }, setOutput)}
            className="btn encode"
          >
            Encode
          </button>
          <button
            onClick={() => callApi("decode", { text: input }, setOutput)}
            className="btn decode"
          >
            Decode
          </button>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

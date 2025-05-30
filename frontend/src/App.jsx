import { useState } from "react";
import { toast, Toaster } from "./toast";

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
    <div className="p-4 max-w-xl mx-auto">
      <Toaster />
      <h1 className="text-2xl mb-4">Symbol Cipher Tool</h1>
      <textarea
        className="w-full h-32 p-2 border"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <div className="space-x-2 my-2">
        <button
          className="bg-blue-500 text-white px-4 py-1 rounded"
          onClick={() => callApi("encode", { text: input }, setOutput)}
        >
          Encode
        </button>
        <button
          className="bg-green-500 text-white px-4 py-1 rounded"
          onClick={() => callApi("decode", { encoded: input }, setOutput)}
        >
          Decode
        </button>
      </div>
      <textarea className="w-full h-32 p-2 border" value={output} readOnly />
    </div>
  );
}

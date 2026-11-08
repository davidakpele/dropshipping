import { useState } from "react";

export const useCopyToClipboard = () => {
    const [result, setResult] = useState(null);
  
    const copy = async (text) => {
      try {
        await navigator.clipboard.writeText(text);
        setResult({ status: 'success' });
      } catch (e) {
        setResult({ status: 'error', message: e.message });
        throw e;
      }
    };
  
    // 👇 We want the result as a tuple
    return [copy, result];
  }
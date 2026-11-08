import { useCallback, useState } from "react";

import Alert from "../components/Alert1";

const useAlert = (dark = false) => {
  const [type, setType] = useState(null);
  const [content, setContent] = useState(null);

  const closeHandler = useCallback(() => {
    setType(null);
    setContent(null);
  }, []);

  const render =
    type && content ? (
      <Alert type={type} dark={dark} closeHandler={closeHandler}>
        {content}
      </Alert>
    ) : null;

  return [
    render,
    (type, content) => {
      setType(type);
      setContent(content);
    },
    closeHandler,
  ];
};

export default useAlert;

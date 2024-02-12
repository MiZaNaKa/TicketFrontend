import React, { useState, useEffect, useRef } from 'react';

function Example() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('Hello');
  const countRef = useRef(count);

  useEffect(() => {
    console.log(`The count is ${countRef.current}`);
    document.title = `Count: ${countRef.current}`;
  }, [countRef]);

  return (
    <div>
      <p>{`The count is ${count}`}</p>
      <p>{`The text is ${text}`}</p>
      <button onClick={() => setCount(count + 1)}>Increase count</button>
      <button onClick={() => setText('Hello again')}>Change text</button>
    </div>
  );
}

export default Example
import { useState } from 'react';
const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  return [
    {
      value,
      onChange: (e) => setValue(e.target.value),
    },
    { setState: (val) => setValue(val) },
    { resetInput: () => setValue(initialValue) },
  ];
};
export default useInput;

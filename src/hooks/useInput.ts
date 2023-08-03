import { useEffect, useState } from "react";

interface UseInputProps<V> {
  regex: RegExp;
  initialValue: V;
}

export const useInput = <V>({ regex, initialValue }: UseInputProps<V>) => {
  const [value, setValue] = useState(initialValue);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    if (typeof value === "string") setIsError(!regex.test(value));
  }, [value, regex]);

  return { value, setValue, isError };
};

export default useInput;

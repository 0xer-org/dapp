import { useEffect, useState } from "react";

const Countdown = ({
  from,
  onFinish,
  resetTrigger,
}: {
  from: number;
  onFinish: () => void;
  resetTrigger?: any;
}) => {
  const [number, setNumber] = useState(from);
  const [finished, setFinished] = useState(false);
  useEffect(() => {
    if (number === 0) {
      setFinished(true);
      if (!finished) return () => onFinish();
    }
    const timeout = setTimeout(() => {
      if (number > 0) setNumber(number - 1);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [number, finished, resetTrigger, onFinish]);

  useEffect(() => {
    setNumber(from);
    setFinished(false);
  }, [from, resetTrigger]);
  return <>{number}</>;
};

export default Countdown;

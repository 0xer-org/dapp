import { useEffect, useState } from "react";

const Countdown = ({
  from,
  onFinish,
}: {
  from: number;
  onFinish: () => void;
}) => {
  const [number, setNumber] = useState(from);
  const [finished, setFinished] = useState(false);
  useEffect(() => {
    if (number === 0) {
      setFinished(true);
      if (!finished) return onFinish();
    }

    setTimeout(() => {
      if (number > 0) setNumber(number - 1);
    }, 1000);
  }, [number, finished, onFinish]);
  return <>{number}</>;
};

export default Countdown;

import React, { useState, useEffect } from "react";

import { Char, getCharsMatrix, setCharsMatrix } from "./Char";

let charsMatrix = getCharsMatrix(31, 61);

charsMatrix[15][29] = <Char value="I" />;
charsMatrix[15][30] = <Char value="'" />;
charsMatrix[15][31] = <Char value="M" />;

charsMatrix[22][30] = <Char value="↓" />;

const values = [
  ["   RO∙", "   ∙SS"],
  ["   WEB", "DEVELOPER"],
  ["  CHESS", "  LOVER"],
  [" PYTHON-", " ISTA"],
  ["  GAMER", ""],
  [" AASMPRO", "   TOO"],
];

export const Hero = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((index) => (index < values.length - 1 ? index + 1 : 0));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen overflow-hidden flex justify-center items-center">
      <div className="flex-col justify-center items-center">
        {setCharsMatrix(charsMatrix, values[index], 16, 18, 26, 35).map(
          (line, index) => (
            <div key={index} className="whitespace-nowrap">
              {line.map((char, chIndex) => <React.Fragment key={`${index}-${chIndex}`}>{char}</React.Fragment>)}
            </div>
          )
        )}
      </div>
    </div>
  );
};

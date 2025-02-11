import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function ChevronDown(props: any) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={8}
      height={5}
      viewBox="0 0 8 5"
      fill="none"
      {...props}>
      <Path
        d="M7 1L4 4 1 1"
        stroke="#1C1C1C"
        strokeOpacity={0.4}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default ChevronDown;

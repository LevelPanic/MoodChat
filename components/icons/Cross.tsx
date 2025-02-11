import * as React from 'react';
import Svg, {Path, Defs, LinearGradient, Stop} from 'react-native-svg';

function Cross(props: any) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={25}
      height={25}
      viewBox="0 0 25 25"
      fill="none"
      {...props}>
      <Path
        d="M15 5a.833.833 0 00-1.178 0L10 8.822 6.178 5A.833.833 0 005 6.178L8.822 10 5 13.822A.833.833 0 006.178 15L10 11.178 13.822 15A.834.834 0 0015 13.822L11.178 10 15 6.178A.833.833 0 0015 5z"
        fill="url(#paint0_linear_1380_4382)"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_1380_4382"
          x1={9.99985}
          y1={4.7561}
          x2={9.99985}
          y2={15.2441}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor={props.fill ?? "#39E5B6"} />
          <Stop offset={1} stopColor={props.fill ?? "#70B2D9"} />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}

export default Cross;

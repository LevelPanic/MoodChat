import * as React from 'react';
import Svg, {
  Rect,
  G,
  Path,
  Defs,
  LinearGradient,
  Stop,
  ClipPath,
} from 'react-native-svg';

function AddTicket(props: any) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={48}
      height={48}
      viewBox="0 0 48 48"
      fill="none"
      {...props}>
      <Rect
        width={48}
        height={48}
        rx={24}
        fill="url(#paint0_linear_734_2782)"
      />
      <G clipPath="url(#clip0_734_2782)">
        <Path
          d="M34.125 22.219a1.41 1.41 0 001.124 1.378c.437.088.751.473.751.918v1.454a.937.937 0 11-1.875 0v-.785a3.295 3.295 0 01-1.875-2.965c0-1.285.754-2.431 1.875-2.965V17.53a1.877 1.877 0 00-1.875-1.875h-3.61a.937.937 0 11-1.874 0H15.75a1.877 1.877 0 00-1.875 1.875v1.723a3.295 3.295 0 011.875 2.965 3.295 3.295 0 01-1.875 2.965v1.722c0 1.034.841 1.875 1.875 1.875h8.484a.937.937 0 110 1.875H15.75a3.754 3.754 0 01-3.75-3.75v-2.39c0-.446.314-.83.75-.92a1.41 1.41 0 001.125-1.377 1.41 1.41 0 00-1.124-1.378.937.937 0 01-.751-.919v-2.39a3.754 3.754 0 013.75-3.75h16.5a3.754 3.754 0 013.75 3.75v2.39c0 .446-.314.83-.75.919a1.41 1.41 0 00-1.125 1.378zm-6.422-2.344a.937.937 0 100-1.875.937.937 0 000 1.875zm0 3.281a.937.937 0 100-1.875.937.937 0 000 1.875zm.938 2.344a.937.937 0 10-1.875 0 .937.937 0 001.875 0zm6.422 3.281h-2.579v-2.578a.937.937 0 10-1.875 0v2.578h-2.578a.937.937 0 100 1.875h2.578v2.578a.937.937 0 101.875 0v-2.578h2.578a.937.937 0 100-1.875z"
          fill="#fff"
        />
      </G>
      <Defs>
        <LinearGradient
          id="paint0_linear_734_2782"
          x1={24}
          y1={0}
          x2={24}
          y2={48}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#39E5B6" />
          <Stop offset={1} stopColor="#70B2D9" />
        </LinearGradient>
        <ClipPath id="clip0_734_2782">
          <Path fill="#fff" transform="translate(12 12)" d="M0 0H24V24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default AddTicket;

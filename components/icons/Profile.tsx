import * as React from 'react';
import Svg, {Rect, Path} from 'react-native-svg';

function Profile(props: any) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={50}
      height={50}
      viewBox="0 0 50 50"
      fill="none"
      {...props}>
      <Rect width={50} height={50} rx={24} fill="#BFBFBF" />
      <Path
        d="M25.16 23.87c-.1-.01-.22-.01-.33 0a4.42 4.42 0 01-4.27-4.43c0-2.45 1.98-4.44 4.44-4.44a4.435 4.435 0 01.16 8.87zM20.16 27.56c-2.42 1.62-2.42 4.26 0 5.87 2.75 1.84 7.26 1.84 10.01 0 2.42-1.62 2.42-4.26 0-5.87-2.74-1.83-7.25-1.83-10.01 0z"
        fill="#0C4C38"
        stroke="#0C4C38"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default Profile;

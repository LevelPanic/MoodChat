import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function Search(props: any) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={15}
      height={16}
      viewBox="0 0 15 16"
      fill="none"
      {...props}>
      <Path
        d="M6.25 11.125a4.376 4.376 0 100-8.75 4.376 4.376 0 000 8.75zM9.376 9.875l3.75 3.75"
        stroke="#fefdfe"
        strokeWidth={1.24703}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default Search;

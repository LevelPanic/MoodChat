import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props: any) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={30}
      height={28}
      viewBox="0 0 30 28"
      fill="none"
      {...props}
    >
      <Path
        d="M4 7a1 1 0 011-1h19a1 1 0 110 2H5a1 1 0 01-1-1zM4 14a1 1 0 011-1h11a1 1 0 110 2H5a1 1 0 01-1-1zM5 20a1 1 0 100 2h17a1 1 0 100-2H5z"
        fill={props.color ?? "#000"}
      />
    </Svg>
  )
}

export default SvgComponent

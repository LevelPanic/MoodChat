import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props:any) {
  return (
    <Svg
      width={8}
      height={14}
      viewBox="0 0 8 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M2.287 7.71a1 1 0 010-1.42l4.59-4.58A1 1 0 105.467.29L.877 4.88a3 3 0 000 4.24l4.59 4.59a1 1 0 001.41-1.42l-4.59-4.58z"
        fill={props.color ?? "#072B2C"}
      />
    </Svg>
  )
}

export default SvgComponent

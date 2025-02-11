import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props: any) {
  return (
    <Svg
      width={18}
      height={18}
      viewBox="0 0 13 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M11.667 6.333c0 4-5.334 8-5.334 8s-5.333-4-5.333-8a5.333 5.333 0 1110.667 0z"
        stroke={props.color ?? "#fff"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6.333 8.333a2 2 0 100-4 2 2 0 000 4z"
        stroke={props.color ?? "#fff"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default SvgComponent

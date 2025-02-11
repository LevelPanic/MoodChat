import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props: any) {
  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M15 5H4.333C3.597 5 3 5.597 3 6.333v8c0 .737.597 1.334 1.333 1.334H15c.736 0 1.333-.597 1.333-1.334v-8C16.333 5.597 15.736 5 15 5z"
        stroke={props.color ?? "#131F28"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M16.333 7l-5.98 3.8a1.293 1.293 0 01-1.373 0L3 7"
        stroke={props.color ?? "#131F28"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default SvgComponent

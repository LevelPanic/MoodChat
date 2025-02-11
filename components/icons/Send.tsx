import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props: any) {
  return (
    <Svg
      width={22}
      height={20}
      viewBox="0 0 22 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M19.994 7.746c1.999.963 1.94 3.829-.097 4.707L4.39 19.141c-1.73.746-3.65-.547-3.611-2.43l.068-3.294a2.069 2.069 0 011.783-2.006l8.672-.82c.704-.068.728-1.088.027-1.187L2.644 8.178A2.069 2.069 0 011 6.11l.07-3.41C1.11.817 3.082-.395 4.78.422l15.214 7.324z"
        fill={props.color ?? "#F0F0F0"}
      />
    </Svg>
  )
}

export default SvgComponent

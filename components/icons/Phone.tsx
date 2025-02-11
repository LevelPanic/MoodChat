import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props: any) {
  return (
    <Svg
      width={18}
      height={18}
      viewBox="0 0 18 18"
      fill={"none"}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M13.308 17C6.51 17 1 11.49 1 4.692V2.846A1.846 1.846 0 012.846 1h1.126c.423 0 .793.288.895.7l.908 3.628a.921.921 0 01-.343.963l-1.06.796a.871.871 0 00-.312.992 9.875 9.875 0 005.86 5.861.87.87 0 00.993-.311l.796-1.061a.923.923 0 01.963-.343l3.629.908c.41.103.699.472.699.895v1.126A1.846 1.846 0 0115.154 17h-1.846z"
        stroke={props.color ?? "#131F28"}
        strokeWidth={1.23077}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default SvgComponent

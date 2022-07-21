interface Point {
  x: number;
  y: number;
}

interface BBox {
  x: number,
  y: number,
  width: number,
  height: number
}

interface Data {
  bBox: BBox,
  points: Array<Point>
}

export function getPathPoints(count: number,  path: SVGPathElement) {
  const pathLength = path.getTotalLength()
  var chunk = pathLength / count
  const chunks = [...Array(count+1).keys()].map(i => i * chunk)
  const points = chunks.map(l => path.getPointAtLength(l))
  return points
}

export function pathElementSetup(pathString: string) : { bBox: DOMRect, pathElement: SVGPathElement } {
  const pathElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
  const svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  
  svgElement.appendChild(pathElement)
  svgElement.style.width = "1px"
  svgElement.style.height = "1px"
  svgElement.style.position = "fixed"
  svgElement.style.top = "0"
  svgElement.style.left = "0"
  document.body.appendChild(svgElement)

  pathElement.setAttribute('d', pathString);

  const bBox = svgElement.getBBox()

  return { bBox, pathElement }
}

export function pointsAndBboxFromPath(pathString: string, numPoints: number) : Data {
  
  const pathAndBbox = pathElementSetup(pathString)
  const points: Array<DOMPoint> = getPathPoints(numPoints, pathAndBbox.pathElement)
  const bBox = pathAndBbox.bBox

  return { bBox, points }
}
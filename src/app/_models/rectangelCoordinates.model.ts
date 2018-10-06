export class Coordinate {
  x: number;
  y: number;
}

export class MediateRectangleCoordinates {
  index: string;
  topLeft: Coordinate;
  topRight: Coordinate;
  bottomRight: Coordinate;
  bottomLeft: Coordinate;
  processed: boolean;
}

export class HorizontalRectangleCoordinates {
  index: string;
  width: number;
  height: number;
}

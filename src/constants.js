export const SIZE = 20;
export const WIDTH = SIZE * 40;
export const HEIGHT = SIZE * 27;

export const PADDLE_DX = 7;
export const BALL_DX = 2;
export const BALL_DY = -2;

export const COLORS = {
  background : {
    fill: '#088c64'
  },
  paddle: {
    fill: '#bcaba0',
    stroke: '#706660',
  },
  ball: {
    fill: 'yellow'
  }
};

export const DIRECTIONS = {
    LEFT: { x: -1 },
    RIGHT: { x: 1 }
}

export const KEY_TO_DIRECTION = {
    ArrowLeft: 'LEFT',
    ArrowRight: 'RIGHT',
}
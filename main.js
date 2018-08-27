import { h, app } from 'hyperapp'
import { withFx, frame, action, keydown, keyup } from '@hyperapp/fx'

import { Background, Paddle, Ball } from './src/components'

import {
  SIZE,
  WIDTH,
  HEIGHT,
  COLORS,
  DIRECTIONS,
  PADDLE_DX,
  BALL_DX,
  BALL_DY,
  KEY_TO_DIRECTION
} from './src/constants';

let B_DX = BALL_DX;
let B_DY = BALL_DY;

const state = {
  direction: null,
  paddle : {
    x : (WIDTH / 2) - (10 * SIZE / 2),
    y : HEIGHT - SIZE
  },
  ball : {
    x : (WIDTH / 2),
    y : HEIGHT - (2 * SIZE),
    dx : 2,
    dy : -2
  }
};

const updatePaddle = (paddle, direction) => {
  if (direction) {
    paddle.x += PADDLE_DX * DIRECTIONS[direction].x;
  }

  if (paddle.x < 0) {
    paddle.x = 0;
  }
  if (paddle.x > (WIDTH - (10 * SIZE))) {
    paddle.x = WIDTH - (10 * SIZE);
  }

  return paddle;
}

const updateBall = (ball) => {
  if (ball.x + ball.dx > WIDTH - SIZE || ball.x + ball.dx < SIZE) {
    B_DX = -B_DX;
  }
  if (ball.y + ball.dx > HEIGHT - SIZE || ball.y + ball.dx < SIZE) {
    B_DY = -B_DY;
  }

  ball.x += B_DX;
  ball.y += B_DY
  return ball;
}

const actions = {
  start : () => [
    keydown('keyPressed'),
    keyup('keyReleased'),
    action('update'),
  ],
  update : () => [
    action('updateBall'),
    action('updatePaddle'),
    frame('update')
  ],
  updateBall: () => state => ({
    ...state,
    ball : updateBall(state.ball)
  }),
  updatePaddle: () => state => ({
    ...state,
    paddle : updatePaddle(state.paddle, state.direction)
  }),
  keyPressed : ({ key }) => (
    Object.keys(KEY_TO_DIRECTION).includes(key)
    ? [action('changeDirection', KEY_TO_DIRECTION[key])]
    : [action('changeDirection', null)]
  ),
  keyReleased : () => ([action('changeDirection', null)]),
  changeDirection: (direction) =>  (state) => ({
    ...state,
    direction
  })
};

const view = state => {
  return (
    <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`}>
      <Background width={WIDTH} height={HEIGHT} {...COLORS.background} />
      <Paddle x={state.paddle.x} y={state.paddle.y} height={SIZE} width={10 * SIZE} {...COLORS.paddle} />
      <Ball cx={state.ball.x} cy={state.ball.y} r={SIZE} {...COLORS.paddle} />
    </svg>
  )
};

const game = withFx(app)(state, actions, view, document.body);
game.start();
console.log('GAME STARTED');

if (module.hot) {
  module.hot.dispose(() => {
    window.location.reload();
  });
}
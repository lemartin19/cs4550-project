'use es6';

import { createReducer } from '@reduxjs/toolkit';

const VISITOR_ERROR = 'VISITOR_ERROR';
const FETCH_VISITORS = 'FETCH_VISITORS';
const ADD_VISITOR = 'ADD_VISITOR';
const LEAVE_CHANNEL = 'LEAVE_CHANNEL';

export const joinVisitorChannel = (dispatch, routeId, socket) => {
  if (!socket) return;

  const channel = socket.channel(`visitor:${routeId}`);
  channel
    .join()
    .receive('ok', ({ visitors }) =>
      dispatch({
        type: FETCH_VISITORS,
        requestArgs: { channel },
        payload: visitors,
      })
    )
    .receive('error', () =>
      dispatch({
        type: VISITOR_ERROR,
        payload: ['Could not connect to route visiors.'],
      })
    );

  channel.on('visitor-update', ({ visitors }) => {
    dispatch({ type: ADD_VISITOR, payload: visitors });
  });
  return channel;
};

export const visitRoute = (channel) => {
  channel.push('visit', {});
};

export const leaveVisitorChannel = (dispatch, channel) => {
  channel.leave();
  dispatch({ type: LEAVE_CHANNEL });
};

export const channelReducer = createReducer(
  { channel: null, visitors: [] },
  {
    [FETCH_VISITORS]: (state, { payload, requestArgs }) => ({
      channel: requestArgs.channel,
      visitors: payload,
    }),
    [ADD_VISITOR]: (state, { payload }) => ({
      channel: state.channel,
      visitors: payload,
    }),
    [LEAVE_CHANNEL]: () => ({ channel: null, visitors: [] }),
  }
);

export const getVisitors = (state) => state.channel.visitors;
export const getChannel = (state) => state.channel.channel;

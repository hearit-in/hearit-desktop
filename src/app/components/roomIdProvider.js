import {PropTypes} from 'react';
import createProvider from './provider';

export const RoomIdProvider = createProvider("roomId", PropTypes.string);
export const OnRoomIdChangedProvider = createProvider("onRoomIdChanged", PropTypes.func);
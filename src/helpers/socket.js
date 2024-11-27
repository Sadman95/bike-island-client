import { appTitle, baseUrlV2 } from 'config/env';
import { io } from 'socket.io-client';
import { decrypt } from 'utils/decrypt';

var strData = JSON.parse(localStorage.getItem('persist:' + appTitle));
var currentUser = strData ?  JSON.parse(strData.auth).user : null;

// console.log("str: ", strData);
// console.log("currentUser: ", currentUser);

const key = currentUser ? currentUser.id + currentUser.email : '';
const token = localStorage.getItem('token') ? decrypt(localStorage.getItem('token'), key) : '';

export const socket = io(baseUrlV2, {
  transports: ['websocket', 'polling', 'flashsocket'],
  forceNew: true,
  query: { token },
});
export const socketId = '';
socket.on('connect', () => {
  console.log('hit socket');
  //   socketId = socket.id;
});

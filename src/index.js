import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import Leaderboard from './leaderboard.js';

const board = new Leaderboard();
board.RefreshList();
board.EventList();
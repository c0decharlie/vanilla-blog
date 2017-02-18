import EventEmitter from 'super-event-emitter';
import BlogController from './controllers/blog-controller';
import styles from '../styles/main.scss'

window.runtime = new EventEmitter();

let blog = new BlogController();

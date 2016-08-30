/**
 * Created by pivotal on 8/30/16.
 */
import {createStore} from 'redux';
import reducer from './reducer';

export default function makeStore() {
    return createStore(reducer);
}
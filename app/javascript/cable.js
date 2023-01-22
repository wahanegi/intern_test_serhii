import { createConsumer } from '@rails/actioncable';
import {LOCAL_URL} from "./components/helpers/helpers";


const consumer = createConsumer(LOCAL_URL);

export default consumer;
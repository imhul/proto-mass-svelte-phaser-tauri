import config from '$lib/utils/config';
import { v5 as uuidv5 } from 'uuid';

const getId = (prefix: string, suffix: string) => {
    const timestamp = new Date().getTime();
    return `${prefix}-${suffix}-${uuidv5(prefix + '-' + timestamp, config.idLength)}`;
};

export default getId;

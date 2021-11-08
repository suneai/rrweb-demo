import RRWebPage from '../pages/rrweb';
import TestPage from '../pages/test';

export const ComponentsRouter = [
    {
        path: '/test',
        component: TestPage
    },
    {
        path: '/',
        component: RRWebPage
    },
]
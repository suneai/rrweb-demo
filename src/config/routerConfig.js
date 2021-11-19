import RRWebPage from '../pages/rrweb';
import TestPage from '../pages/test';
import ReactDemo from '../pages/reactAPI';

export const ComponentsRouter = [
    {
        path: '/test',
        component: TestPage
    },
    {
        path: '/reactDemo',
        component: ReactDemo
    },
    {
        path: '/',
        component: RRWebPage
    },
]
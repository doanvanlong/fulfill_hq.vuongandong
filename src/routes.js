import Index from '@/pages/index.vue';
import Fulfillment from '@/pages/fulfillment.vue';

export const routes = [
  {
    path: '/',
    component: Index,
    props: (route) => ({
      token: route.query.token,
      id: route.query.id,
    // eslint-disable-next-line comma-dangle
    })
  },
  {
    path: '/fulfillment/',
    component: Fulfillment,
    props: (route) => ({
      com: route.query.com,
      act: route.query.act,
      type: route.query.type,
      id: route.query.id,
      tracking_type: route.query.tracking_type,
      id_fulfil_type: route.query.id_fulfil_type,
    // eslint-disable-next-line comma-dangle
    })
  },
  {
    path: '/:path(.*)',
    component: Index,
  },
];
export default routes;

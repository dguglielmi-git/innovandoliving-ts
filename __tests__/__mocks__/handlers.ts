import { rest } from 'msw';

export const handlers = [
  rest.get(
    'http://localhost:5001/innovandoliving-mercadopago-cf/us-central1/innovandoLivingMP/api/mercadopago/platforms',
    (req, res, ctx) => {
      return res(
        ctx.json([
          {
            _id: {
              $oid: '60b07cd57e16e29cc034ec74',
            },
            title: 'Sillones',
            url: 'sillon',
            position: 1,
            published_at: {
              $date: '2021-05-28T05:40:09.152Z',
            },
            createdAt: {
              $date: '2021-05-28T05:17:09.515Z',
            },
            updatedAt: {
              $date: '2021-05-28T05:53:19.207Z',
            },
            __v: 0,
            created_by: {
              $oid: '60ab4ef37a5be255784d8463',
            },
            updated_by: {
              $oid: '60ab4ef37a5be255784d8463',
            },
          },
          {
            _id: {
              $oid: '60b07d2f7e16e29cc034ec75',
            },
            title: 'Respaldos',
            url: 'respaldo',
            position: 2,
            published_at: {
              $date: '2021-05-28T05:40:18.857Z',
            },
            createdAt: {
              $date: '2021-05-28T05:18:39.755Z',
            },
            updatedAt: {
              $date: '2021-05-28T05:53:32.435Z',
            },
            __v: 0,
            created_by: {
              $oid: '60ab4ef37a5be255784d8463',
            },
            updated_by: {
              $oid: '60ab4ef37a5be255784d8463',
            },
          },
          {
            _id: {
              $oid: '60b07d777e16e29cc034ec76',
            },
            title: 'Puff',
            url: 'puff',
            position: 3,
            published_at: {
              $date: '2021-05-28T05:40:27.246Z',
            },
            createdAt: {
              $date: '2021-05-28T05:19:51.207Z',
            },
            updatedAt: {
              $date: '2021-05-28T05:53:43.866Z',
            },
            __v: 0,
            created_by: {
              $oid: '60ab4ef37a5be255784d8463',
            },
            updated_by: {
              $oid: '60ab4ef37a5be255784d8463',
            },
          },
        ])
      );
    }
  ),

  rest.get(
    'http://localhost:5001/innovandoliving-mercadopago-cf/us-central1/innovandoLivingMP/api/mercadopago/publishedProducts',
    (req, res, ctx) => {
      return res(
        ctx.json([
          {
            _id: '60b194bd8733601ca0c34a8e',
            screenshots: ['60b193da8733601ca0c34a85'],
            summary: 'Respaldo Tendencia',
            title: 'Respaldo Tendencia',
            url: 'https://innovandoliving.s3.sa-east-1.amazonaws.com/respaldo_tendencia.jpg',
            price: {
              $numberDecimal: '16000',
            },
            published_at: '2021-05-29T01:11:37.289Z',
            createdAt: '2021-05-29T01:11:25.435Z',
            updatedAt: '2022-02-26T21:58:46.109Z',
            __v: 0,
            created_by: '60ab4ef37a5be255784d8463',
            platform: {
              _id: '60b07d2f7e16e29cc034ec75',
              title: 'Respaldos',
              url: 'respaldo',
              position: 2,
              published_at: '2021-05-28T05:40:18.857Z',
              createdAt: '2021-05-28T05:18:39.755Z',
              updatedAt: '2021-05-28T05:53:32.435Z',
              __v: 0,
              created_by: '60ab4ef37a5be255784d8463',
              updated_by: '60ab4ef37a5be255784d8463',
            },
            poster: '60b193da8733601ca0c34a85',
            updated_by: '60ab4ef37a5be255784d8463',
            releaseDate: '2021-05-12',
            delivery24: false,
            publish: true,
            ranking: 0,
            createAt: '2023-12-19T16:45:54.955Z',
          },
        ])
      );
    }
  ),
];




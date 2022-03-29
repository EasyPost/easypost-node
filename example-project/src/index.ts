import EasyPost from '@easypost/api';

// testing typescript implementation
(async () => {
  const api = new EasyPost(process.env.EASYPOST_TEST_API_KEY);

  const shipments = await api.Shipment.all({
    page_size: 100,
    start_datetime: '2021-01-29T00:00:00.000Z',
  });

  console.log('shipments', shipments);
})();

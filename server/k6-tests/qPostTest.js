import http from 'k6/http';
import { sleep, check } from 'k6';

export let options = {
  vus: 1, // 1 user looping for 1 minute
  duration: '1m',

  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% of requests must complete below 500ms
  },
};

export default function () {
  const url = 'http://localhost:3030/api/qa/questions';
  const payload = JSON.stringify({
    body: "What's the best way to ensure a product's quality?",
    name: 'User123',
    email: 'user123@example.com',
    product_id: 1,
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  let res = http.post(url, payload, params);
  check(res, {
    'is status 201': (r) => r.status === 201,
  });

  sleep(1);
}

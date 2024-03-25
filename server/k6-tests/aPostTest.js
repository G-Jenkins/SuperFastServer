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
  const url = 'http://localhost:3030/api/qa/questions/3518965/answers';
  const payload = JSON.stringify({ g
    body: "Take care of it maybe????",
    name: "Zed Jones",
    email: "user222@example.com",
    photos: ["https://m.media-amazon.com/images/I/81OjsM9ITDL._AC_UY1000_.jpg"]
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

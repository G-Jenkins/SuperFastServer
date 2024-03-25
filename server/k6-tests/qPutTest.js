import http from 'k6/http';
import { sleep, check } from 'k6';

export let options = {
  vus: 1,
  duration: '1m',
};

export default function () {
  const questionId = 3; // Example question ID. Change as necessary.
  const helpfulnessUrl = `http://localhost:3030/api/qa/questions/${questionId}/helpful`;
  const reportUrl = `http://localhost:3030/api/qa/questions/${questionId}/report`;

  // PUT request to increase helpfulness
  let res = http.put(helpfulnessUrl);
  check(res, {
    'is status 200 for helpfulness': (r) => r.status === 200,
  });
  sleep(1);

  // PUT request to report a question
  res = http.put(reportUrl);
  check(res, {
    'is status 200 for report': (r) => r.status === 200,
  });
  sleep(1);
}

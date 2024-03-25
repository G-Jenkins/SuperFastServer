import http from 'k6/http';
import { sleep, check} from 'k6';

export let options = {
  vus: 1,
  duration: '1m',
};

export default function () {
  const question = 3;
  const helpfulnessUrl = 'http://localhost:3030/api/qa/answers/3/helpful';

  // PUT request to increase helpfulness
  let res = http.put(helpfulnessUrl)
  check (res, {
    'is status 200 for helpfulness': (r) => r.status === 200,
  });
  sleep(1);


  console.log('Response time was ' + String(res.timings.duration) + ' ms');

}
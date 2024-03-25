import http from 'k6/http';
import { sleep, check} from 'k6';

export let options = {
  vus: 1,
  duration: '1m',
};

export default function () {
  const question = 3;
  const reportUrl = 'http://localhost:3030/api/qa/answers/3/report';


  // PUT request to report a question, doesn't work, why?
  let res = http.put(reportUrl);
  check(res, {
    'is status 200 for helpfulness': (r) => r.status === 299,
  });
  sleep(1);

  console.log('Response time was ' + String(res.timings.duration) + ' ms');

}
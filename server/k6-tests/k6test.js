import http from 'k6/http';
import { sleep, check } from 'k6';

export let options = {
    vus: 1, // 1 user looping for 1 minute
    duration: '1m',
};

export default function () {
    // Making a GET request to the products endpoint
    let res = http.get('http://localhost:3030/api/qa/questions/3/answers');

    // Using check() to validate the response
    check(res, { 'status was 200': (r) => r.status === 200 });

    // Log the duration of the request
    console.log('Response time was ' + String(res.timings.duration) + ' ms');

}

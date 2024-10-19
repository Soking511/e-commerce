var request = require('request');
var options = {
  'method': 'POST',
  'url': 'https://stablediffusionapi.com/api/v5/text2video',
  'headers': {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "key": "",
    "prompt": "man walking on the road, ultra HD video",
    "negative_prompt": "Low Quality",
    "scheduler": "UniPCMultistepScheduler",
    "seconds": 3
  })
};

request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});
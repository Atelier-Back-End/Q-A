# Overview

Build out the API to support your an existing E-commerce application. The goal was be to replace the existing API with a back end system that can support large datasets in the form of CSVs and can scale to meet the demands of production traffic.

## Technologies Used

![node](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white) ![express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white) ![postgres](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white) ![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white) ![Nginx](https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white)

## Database

Utilized PostgreSQL database to store relational data between Questions, Answers, and Photos. The reason for PostgreSQL was to enhance performance, leveraging its capabilities to minimize data redundancy and efficiently index foreign keys, especially considering a significant skew towards reads over writes.

## Optimizations

1. The previous structure of the E-commerce API data:

```json
{
  "product_id": "5",
  "results": [{
        "question_id": 37,
        "question_body": "Why is this product cheaper here than other sites?",
        "question_date": "2018-10-18T00:00:00.000Z",
        "asker_name": "williamsmith",
        "question_helpfulness": 4,
        "reported": false,
        "answers": {
          68: {
            "id": 68,
            "body": "We are selling it here without any markup from the middleman!",
            "date": "2018-08-18T00:00:00.000Z",
            "answerer_name": "Seller",
            "helpfulness": 4,
            "photos": []
            // ...
          }
        }
      },
      {
        "question_id": 38,
        "question_body": "How long does it last?",
        "question_date": "2019-06-28T00:00:00.000Z",
        "asker_name": "funnygirl",
        "question_helpfulness": 2,
        "reported": false,
        "answers": {
          70: {
            "id": 70,
            "body": "Some of the seams started splitting the first time I wore it!",
            "date": "2019-11-28T00:00:00.000Z",
            "answerer_name": "sillyguy",
            "helpfulness": 6,
            "photos": [],
          },
          78: {
            "id": 78,
            "body": "9 lives",
            "date": "2019-11-12T00:00:00.000Z",
            "answerer_name": "iluvdogz",
            "helpfulness": 31,
            "photos": [],
          }
        }
      },
      // ...
  ]
}
```
Nested queries trumped chaining individual ones and constructing objects for return to ensure data consistency and separate computing logic from our model functions, resulting in efficient queries.

![code-sample](https://github.com/SDC-Product-project/Q-A/blob/main/images/getQuestionsQuery.png)

2. The query speeds for 1000 requests per second on 1 server is as follows:

![Screen Shot 2022-09-24 at 2 58 50 PM](https://user-images.githubusercontent.com/18265165/192120593-5aeb7eb9-4d8e-4e43-9ce7-7b7624e7807d.png)

  - The first optimization I implemented was to create another instance of the service API and create a load balancer. Then we routed all the traffic to the load balancer which eased the stress on the server and this allowed heavy traffic to be evenly distrubuted in a round-robin style. The result is about a 6ms improvement in average response time.
  
  ![Screen Shot 2022-09-24 at 2 59 09 PM](https://user-images.githubusercontent.com/18265165/192120723-81afba1c-dd17-45e0-96b3-7c2f7cd602a8.png)
  
  - The second optimization I implemented was to add caching to the load balancer. We shaved off even more time on the average response with about a 13ms improvement from the first optimization.
  
  ![Screen Shot 2022-09-24 at 2 59 30 PM](https://user-images.githubusercontent.com/18265165/192120816-d1aa3680-b7f8-4d68-805f-7a735fc765f4.png)


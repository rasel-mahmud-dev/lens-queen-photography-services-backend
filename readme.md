# Lens-Queen (Backend)
## A Photography services website 

## Repo: https://github.com/Porgramming-Hero-web-course/b6a11-service-review-server-side-rasel-mahmud-dev
## Live: https://lens-queen-api.vercel.app



## Modules uses.
- Expressjs
- cors
- dotenv
- jwt(jsonwebtoken)
- formidable (parse formdata)
- mongodb

## Functional requirement.
- users see all services.
- user see all reviews for a particular service also only logged user can add service and reviews
- logged user can delete, update their service and review.
- need user authentication. using jwt token

## Database
- Mongodb (Native)


### Endpoint

#### services endpoint
- GET /api/services [public]
- GET /api/services-count [public]
- GET /api/service/:serviceId [public]
- POST /api/service [public]
- PATCH /api/service/:serviceId [private]
- DELETE /api/service/:serviceId [private]

#### reviews endpoint
- GET /api/reviews [public]
- GET /api/review/:reviewId [public]
- POST /api/review [public]
- PATCH /api/review/:reviewId [private]
- DELETE /api/review/:reviewId [private]


#### auth endpoint
- GET /api/auth/validate-token [public] [check token valid or not]
- POST /api/auth/generate-token [public] [generate a token]

#### Other endpoint
- POST /api/blogs [public]
- POST /api/testimonials [public]
- POST /api/projects [public]
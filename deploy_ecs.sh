#!/bin/bash

if [[ -z "${ECR_URL}" || -z "${ECS_CLUSTER}" || -z "${ECS_SERVICE}" ]]; then
  echo "You should define the proper environment variables (see README)"
else
  docker build ./api -t $ECR_URL
  docker push $ECR_URL
  aws ecs update-service --cluster $ECS_CLUSTER --service $ECS_SERVICE
fi

#!/bin/sh

if [ $1 = "b" ] || [ $2 = "b" ]; then
  # build backend
  cd backend
  docker build -t juuzeff/egzamin-backend .
  docker push juuzeff/egzamin-backend
  cd ..
  fi

if [ $1 == "f" ] || [ $2 == "f" ]; then
  # build frontend
  cd frontend
  docker build -t juuzeff/egzamin-frontend .
  docker push juuzeff/egzamin-frontend
  cd ..
  fi

# config + secret
kubectl apply -f egzamin-configMap.yml
kubectl apply -f egzamin-secret.yml
# redis
kubectl apply -f egzamin-redis-deployment.yml
kubectl apply -f egzamin-redis-clusterip.yml
# postgres
kubectl apply -f egzamin-postgres-pvc.yml
kubectl apply -f egzamin-postgres-deployment.yml
kubectl apply -f egzamin-postgres-clusterip.yml
# backend
kubectl apply -f egzamin-backend-deployment.yml
kubectl apply -f egzamin-backend-clusterip.yml
# frontend
kubectl apply -f egzamin-frontend-deployment.yml
kubectl apply -f egzamin-frontend-clusterip.yml
# nginx ingress
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/static/provider/cloud/deploy.yaml
kubectl apply -f egzamin-ingress.yml

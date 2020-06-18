#!/bin/sh

# load balancer
kubectl delete ingress egzamin-ingress-service
# frontend
kubectl delete svc egzamin-frontend-clusterip
kubectl delete deploy egzamin-frontend-deployment
# backend
kubectl delete svc egzamin-backend-clusterip
kubectl delete deploy egzamin-backend-deployment
# postgres
kubectl delete svc egzamin-postgres-clusterip
kubectl delete deploy egzamin-postgres-deployment
kubectl delete pvc egzamin-postgres-pvc
# redis
kubectl delete svc egzamin-redis-clusterip
kubectl delete deploy egzamin-redis-deployment
# config + secret
kubectl delete configmap egzamin-config
kubectl delete secret egzamin-secret

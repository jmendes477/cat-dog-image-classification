#Minikube Commands
````
minikube delete
minikube start
````
````
minikube addons enable ingress
minikube addons enable ingress-dns
````

Build Images Command

##Docker Build commands
````
docker build -t ml-model-api:1.0 .
````
````
docker build -t image-processor-app:1.0 .
````
````
docker build -t image-processor-frontend:1.0
````
#
#Helm Install
````
helm install mlmodel ml-model/
````
````
helm install backend backend/
````
````
helm install frontend frontend/
````
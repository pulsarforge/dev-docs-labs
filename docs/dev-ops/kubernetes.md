# Kubernetes

## Index:
What is it?
Why is it successful?
How to start?
Deploying containers apps
You will be able to:
* Describe  kubernetes and what is it used for.
* Deploy single and multicontainer application
* Kubernetes services
* Manage application
* Set up preconditions
* Manage configuration
* Discuss popular tools

## Overview
* Open source container orchestration tool designed to automate, deploying, scaling, and operating containerized application.
* Born from google experience running production workloads at scale.
* Allows organizations to increase their velocity by releasing and recovering faster.
### Kubernetes:
It is a distributed system
Machines may be physical, virtual, on prem or in the cloud
Schedules containers on machines
Moves containers as machines are added removed
Can use different container runtimes.
Modular, extensible design.
### Features highlights:
Automated deployment rollout and rollback.
Seamless horizontal scaling.
Secret management.
Service discovery and load balancing.
Linux and Windows container support.
Simple log collection.
Role based access control.
Batch job processing.
CPU and memory quotas.
Persisten volume management
Stateful application support

### Deploying kubernetes

Single Node:
Docker
Minikube
Kubeadm

Multi Node:
For production workload.
Horizontal Scaling.
Tolerate node failures.
To decide which one is the right for you ask several key questions.

How much control vs effort in maintaining the cluster?
Fully managed:
Amazon EKS.
Azure AKS.
Google Cloud GKE.
Full Control:
Kubespray
Kops
Kubeadm

Do you already have expertise with a particular cloud provider?
Do you need enterprise support?
Are you concerned about vendor lock-in?
On prem in the cloud or both?
Linux, windows, or both containers?

In this course we will work with a multinode cluster

## Kubernetes Architecture

Cluster: refers to all of the machines collectively and can be thought of as the entire running system.
Cluster are composed of nodes.
Nodes are the machines in the cluster.
Nodes are categorized as workers or masters.
Workers nodes include software to run containers managed by the kubernetes control plane.
Master nodes run the control plane.
The control plane is a set of APIs and software that kubernetes users interact with.
The APIs and software are referred to as master components

### Scheduling
Control plane schedules container onto nodes
Scheduling decisions consider required CPU and other factors.
Scheduling refers to the decision process of placing containers onto a node.

### Kubernetes pods
Group of containers
Pods are the smallest building block in kubernetes
More complex and useful abstractions built on top of pods

### Kubernetes services
Services defines networking rules for exposing groups of pods 
* To other pods
* To the public internet

### Kubernetes deployments
Manage deploying configuration changes to running pods
Horizontal scaling

## Interaction with kubernetes

### Kubernetes API server
Modify cluster state information by sending requests to the kubernetes API server
The API server is a master component that acts as the frontend for the cluster
### Method 1 Interacting REST API
It is possible but not common to work directly with the API server
You might need to if there is no kubernetes client library for your programming language

### Method 2 Client Libraries

Handles auth and amanging individual rest api request and responses
Kubernetes maintains official client libraries
Community maintained libraries

### Method 3 Kubectl

Issue high level commands that are translated into rest api calls
works with local and remote clusters


### Kubectl 
Kubernetes success correlates with kubectl skill
Manages all different types of kubernetes resources and provides debugging and introspection features
kubectl commands follow an easy to understand pattern

### Example kubectl commands

* kubectl create (Pods services etc)
* kubectl delete
* kubectl get (list resources of a given types)
* kubectl describe (print to detailed info about a resource)
* kubectl log (print container logs)

## Pods
### What are pods?
Basic building block in Kubernetes
One or more containers in a Pod
Pod containers all share a container network
One Ip addres per pod

### What's in pod declaration?
Container image
Container ports
Container restart policy
resource limits

### Manifest files
Declare desired porperties
Manifest can descibre all kinds of resource
The spec contains resource specific properties

### Why use manifests?
Can check into source control
Easy to share
easier to work with

## Multicontainer pods

Namespaces separate resources according to users environments or applications.
Role Based access control to secure access per namespace.
Using namespaces is a best practice.
## Service discovery

Support muti pod design
provides static endpoint for each tier
handles pod ip changes
Load balancing
Environments variables
- services address automatically injected in containers
- environments variables follow namibg conventions based on service name
DNS
* DNS record automatically created in cluster dns
* container automatically configured to query cluster dns

## Deployment
Pods should be created by high level abstractions such as deployments.
Represent multiple replicas of a pod
describe a desired state that kubernetes needs to achieve
Deployment controler master component converges actual state to the desired state

kubectl create -f 5-data-tier.yaml
kubectl create -n deployment -f 5-data-tier.yaml
kubectl get -n deployments deployments
kubectl -n deployment get pods
kubectl scale -n deployments deployments support-tier --replicas=5
kubectl -n deployments get pods
kubectl delete -n deployments pods support-tier-``<hash>``
watch -n 1 kubectl -n deployments get pods
kubecetl -n deployments get pods
kubectl scale -n deployments app-tier --replicas=5
kubectl -n deployments get pods
kubectl describe -n deployments service app-tier

Deployments to manage pods in  each tier
Kubernetes ensures states matches desired state
kubectl scale to scale numbler odf replicas
Services seamlessly support scaling 
Scaling is best with stateless pods

## Autoscaling

Scale automatically based on cpu utilization or (custom metrics)
Set target CPU along with min and max replicas
Target cpu is expressed as a percentage of the pod's cpu request

Autoscaling depends on metric being collected
Metrics server is one solution for collecting metrics
Several manifest files are sued to deploy metrics server
github.com/kubernetes-sigs/metrics-server

git clone repo
kubectl apply -f ./metrics-server
kubectl top pods -n deployments

kubectl create -f 6.1_app_tier_cpu_request.yaml -n deployments
kubectl apply -f 6.1_app_tier_cpu_request.yaml -n deployments
kubectl get -n deployments deployments app-tier
cat 6.2-autoscale.yaml
equivalent to
kubectl autoscale deployment app-tier --max=5 --min=1 --cpu-percent=70
kubectl create -f 6.2-autoscale.yaml -n deployments
watch -n 1 kubectl get -n deployments deployments
kubectl api-resource
kubectl describe -n deployments hpa
kubectl -get -n deployments hpa
kubectl edit -n deployments hpa

Autoscaling depends on metrics being collected
Pods must have CPU request
horitzontalPodAutoscale hpa is configured with target CPU and min and max replicas
kubectl apply to update resources
kubectl edit to edit and apply

## Rolling updates and rollbacks

### Rollouts
Rollouts update deployments
Any change to a deployments template triggers a rollout
Different rollout strategies are available

### Rolling updates
Default rollout strategy
Update in groups rather than all at once
Both old and new version running for some time
Alternative is the recreate strategy
Scaling is not a rollout
kubectl has commands to check pause resume and rollback undo rollouts


kubectl delete -n deployments hpa app-tier
kubectl edit -n deployments deployment app-tier
watch -n 1 kubectl get -n deployment deployment app-tier

change file and trigger the rollout next
kubectl rollout -n deployments status deployment app-tier
kubectl rollout -n deployments resume deployment app-tier
kubectl rollout -n deployments undo deployment app-tier
kubectl rollout history -n deployments deployment app-tier
kubectl scale -n deployments deployment app-tier --replicas=1
Rollouts are triggered by deployment template changes
rolling update is the default rollout strategy
rollout can be paused rresumend and undone

## Probes

### Readiness probes
Used to check when a pod is ready to serve traffic / handle request
Useful after startup to check external dependencies
Readiness probes set the pods ready condition services only send traffic to pobs

### Liveness Probes
Detect when a pod enters a broken state
Kubernetes will restart the pod for you
Declared in the same way as readiness probes

### Declaring pods 
Probes can be declared in a pod's contrainers
All contrainer probes must pass for the pod to pass
Probe actions can bea command that runs in the container, an http get request or opening a tcp socket
By default probes check containers every 10 seconds

kubectl create -f 7.3-app-tier.yaml -n probes
kubectl get deployments -n probes app-tier -w

Container readiness probees monitor when pods are ready to serve traffic and are temporarity out of service
Container liveness probes monitor when pods have enterd a broken state and should be restarted
Porbes actions include commands HTTP GET request, and opening TCP sockets

## Init containers
Sometimes you need to wait fora service download, dynamic or decisions before starting a pods containers 
Prefer to separate inititialization wait logic from the container image
Initialization is tightly coupled to the main application (belongs intthe pod)
Init containers allow you to run initialization tasks before starting the main containers

Init containers
Pods cand declare any number of init containers
Init containers run in order and to completion
Use their own images
Easy way to block or delay starting an application
Run every time a pod is created


Spec
apiVersion: v1

kind: Service

metadata:

  name: app-tier

  labels:

    app: microservices

spec:

  ports:

  - port: 8080

  selector:

    tier: app

---

apiVersion: apps/v1

kind: Deployment

metadata:

  name: app-tier

  labels:

    app: microservices

    tier: app

spec:

  replicas: 1

  selector:

    matchLabels:

      tier: app

  template:

    metadata:

      labels:

        app: microservices

        tier: app

    spec:

      containers:

      - name: server

        image: lrakai/microservices:server-v1

        ports:

          - containerPort: 8080

            name: server

        env:

          - name: REDIS_URL

            # Environment variable service discovery

            # Naming pattern:

            #   IP address: ``<all_caps_service_name>``_SERVICE_HOST

            #   Port: ``<all_caps_service_name>``_SERVICE_PORT

            #   Named Port: ``<all_caps_service_name>``_SERVICE_PORT_``<all_caps_port_name>``

            value: redis://$(DATA_TIER_SERVICE_HOST):$(DATA_TIER_SERVICE_PORT_REDIS)

            # In multi-container example value was

            # value: redis://localhost:6379

          - name: DEBUG

            value: express:*

        livenessProbe:

          httpGet:

            path: /probe/liveness

            port: server

          initialDelaySeconds: 5

        readinessProbe:

          httpGet:

            path: /probe/readiness

            port: server

          initialDelaySeconds: 3

      initContainers:

        - name: await-redis

          image: lrakai/microservices:server-v1

          env:

          - name: REDIS_URL

            value: redis://$(DATA_TIER_SERVICE_HOST):$(DATA_TIER_SERVICE_PORT_REDIS)

          command:

            - npm

            - run-script

            - await-redis

Commands:
kubectl get pods -n probes
kubectl describe pod app-tier-``<hash>``
kubectl logs -n probes app-tier-``<hash>`` -c await-redis

Init containers allow you to perform tasks before main application containers have an opportunity to start
Useful for checking precondition and preparing dependencies


## Volumes

### Motivation for volumes
Sometimes useful to share data between containers in a pod
Lifetime of container file systems is limited to the contrianers lifetime
Can lead to unexpected consequences if a container restarts

### What we will learn
How to handle non-ephemeral data
Deploy a persistent data tier
Option available for storing data

### Pod storage in kubernetes
Two high level sotrage option: Volumes and persistent volumes
Used by mounting a directory iin one or more containers in a pod
Pods can use multiple volumes and persistent volumes
Difference between volumes and persistent volumes i how theior lifetime is managed

### Volumes 
Volumes are tied to a pod and their lifecyle
Share data between containers and tolerate conttinaer restarts 
Use for non- durable starage that is delete with the pod
Default volume type is emptyDir
Data is lost if Pod is rescheduled on a different node

## Kubernetes ecosystem

### Helm
Package manager
Packages are called charts
Hub helm sh - search it

### Kustomize
Customize YAML in kubernetes
Works by using kustomization.yaml file
Original manifest are untouched and remain shareable
Useful for:
Generating configmaps and secrets from files
Configure common fields across multiple resources
Apply patches to any field in a manifest
Use overlays to customize base groups of resources
Integrated in kubectl with flag -k and apply

### Prometheus
Monitoring alerting tool that pull and store time series data, inspired by an internal google tool, it is the defacto monitor tool for kubernetes. It is commonly paired with grafana.

### Kubeflow
Makes deployment of machine learning workflows o kubernetes simple scalable and portable
A complete machine learning stack

### Knative
Manage serverless worloads on kubernetes
Can be deployed anywhere with kubernetes
Supported by Google, IBM and SAP

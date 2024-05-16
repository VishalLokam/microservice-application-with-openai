# [Work In Progress] Admin console microservice application for an ecommerce site with an OpenAI component

This project hosts the code for Admin console for an ecommerce site. It is based on microservice based architecture where each service runs independently

## Architecture Diagram

![Architecture](https://github.com/VishalLokam/microservice-application-with-openai/blob/main/Assets/Admin%20console%20architecture%20diagram.png)

# Installations/Prerequisites

- Microsoft Azure account
- Azure cli
- terraform
- kubectl
- helm

## How to Run

- ### Setup the AKS cluster

  1. Login into the Azure account using azure cli
     ```
     az login
     ```
  2. Create a new service principal

     ```
     az ad sp create-for-rbac --skip-assignment
     ```

     Copy and save the information returned after executing the command successfully. Information will look something like:

     ```
     {
         "appId": "<app_if>",
         "displayName": "<display_name>",
         "password": "<password>",
         "tenant": "<tenant>"
     }
     ```

  3. From the project folder, go into the `terraform` folder
     ```
     cd terraform
     ```
  4. Create a new file `terraform.tfvars` and provide the below details in that file.
     ```
     resource_group_name = "<resource_group_name_of_your_choice>"
     location            = "<location_of_the_rg>"
     cluster_name        = "<cluster_name>"
     kubernetes_version  = "1.29"
     system_node_count   = 3
     appId               = "<appId_from_step_2>"
     password            = "<password_from_step_2>"
     dns_prefix          = "<any_name_for_dns_prefix>"
     ```
  5. Run the below commands
     ```
     terraform init
     terraform fmt
     terraform plan
     ## If there are no errors then go ahead ##
     terraform apply -auto-approve
     ```
  6. Once the provisioning is complete, run the below command to add K8S cluster credentials to your local `kubeconfig` file so that you can interact with AKS cluster using `kubectl` from your local system.
     ```
     az aks get-credentials --resource-group $(terraform output -raw resource_group_name) --name $(terraform output -raw kubernetes_cluster_name)
     ```

- ### Install helm charts for `MongoDB`, `RabbitMQ` and `Traefik`.

  1. Open terminal into the project folder.

  2. Install `MongoDB`

     ```
     helm install mongo --create-namespace -n mongo -f helm/mongo_values.yaml oci://registry-1.docker.io/bitnamicharts/mongodb
     ```

     This chart will install `MongoDB` in the `mongo` namespace according to the setting mentioned in the values file from the `./helm/mongo_values.yaml` file.

  3. Install `RabbitMQ`
     ```
     helm install rabbitmq --create-namespace -n rabbitmq -f helm/rabbitmq_values.yaml oci://registry-1.docker.io/bitnamicharts/rabbitmq
     ```
     This chart will install `RabbitMQ` in the `rabbitmq` namespace according to the setting mentioned in the values file from the `./helm/rabbitmq_values.yaml` file.
  4. Install `Traefik` ingress controller
     ```
     helm repo add traefik https://helm.traefik.io/traefik
     helm repo update
     kubectl create namespace traefik
     helm install traefik traefik/traefik -n traefik
     ```

- ### Install Kubernetes manifests files

  1.  Go to the `Kubernetes-manifests` folder.

  2.  Check all the manifest files and fill the appropriate base64 encoded connection strings. Example connection strings(pre base64 encoded)

      ```
      CONNECTION_STRING = mongodb://root:rootPassword@mongo-mongodb-headless.mongo.svc.cluster.local:27017/auth-service?authSource=admin
      RABBITMQ_CONNECTION_STRING = amqp://user:userPassword@rabbitmq-headless.rabbitmq.svc.cluster.local:5672
      ```

  3.  Run the below command to get Load Balance `External-IP`.

      ```
      kubectl get svc -n traefik
      ```

  4.  Input the above `External-IP` in the environment variable `REACT_APP_INGRESS_PUBLIC_IP` in `admin-front-service-manifest.yaml`.

  5.  Install Kubernetes manifests for all the microservices.
      ```
      kubectl apply -f Kubernetes-manifests
      ```

- ### How to run the application

  1.  Ensure that all the services are up.
  2.  Send a `POST` request to `/auth/register` endpoint to create a new user. URL will be `http://<External-IP>/auth/register`.
      ```
         {
            "name": "dba",
            "email": "dba@ecommerce.com",
            "password": "12341234"
         }
      ```
  3.  Access the application by going to the URL `http://<External-IP>`.
  4.  Login using the `email` and `password` registered above.

- ### Add a new product
  1.  Use the application
      or
  2.  Send a `POST` request to the `/product/create` endpoint. URL will be `http://<External-IP>/product/create`
      ```
         {
            "name": "PurrfectPan cat litter box",
            "tags": "cat, litter, clean, hygiene",
            "description": "<generate_using_ai_service>",
            "price": 3000,
            "created_by": "admin@ecommerce.com",
            "img_url": "https://i.imgur.com/iBK83bn.png"
         }
      ```
- ### Add a new order
  1.  Send a `POST` request to the `/product/buy` endpoint. URL will be `http://<External-IP>/product/buy`.
      ```
      {
         "productsWithQuantity": [
            {
               "id": "6646137ef04ba4cf8bb0547e",
               "quantity": 3
            },
            {
               "id": "6646137ef04ba4cf8bb0547e",
               "quantity": 2
            }
         ],
         "userEmail": "vishallokam@gmail.com",
         "userAddress": "11/22, Address_test"
      }
      ```
- ### Health check end points
  `/generate/health` : ai service  
  `/auth/health` : auth service  
  `/order/health` : order service

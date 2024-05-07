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

- Setup the AKS cluster

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

- Install helm charts for `MongoDB` and `RabbitMQ`.

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
     This chart will install `RabbitMQ` in the `rabbitmq` according to the setting mentioned in the values file from the `./helm/rabbitmq_values.yaml` file.

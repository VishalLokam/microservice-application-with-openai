# AI-Service for the ecommerce website
Purpose of the `ai-service` is to generate description for the products using `product name` and `tags` associated to the products.

## How to run the ai-service locally
open the `ai-service` folder
1. Install python dependencies by running the below command
    ```
    pip install --no-cache-dir -r requirements.txt
    ```

2. Get api key and org id from OpenAI website  
    `https://platform.openai.com/api-keys`  
    ![Api key](https://github.com/VishalLokam/microservice-application-with-openai/blob/main/ai-service/assets/images/api_key.png)  

    `https://platform.openai.com/account/organization`  
    ![Organisation id](https://github.com/VishalLokam/microservice-application-with-openai/blob/main/ai-service/assets/images/org_id.png)

3. Create a `.env` file and add api key and org id to the file
    ```
    OPENAI_API_KEY=<your_api_key>
    OPENAI_ORG_ID=<your_org_id>
    ```

4. Run the below command  
    ```
    python openai_generate_description.py
    ```

## How to run the ai-service using docker command
```
docker container run -d -p 5000:5000 --name ai-service -e OPENAI_API_KEY=<your_api_key> -e OPENAI_ORG_ID=<your_org_id> vishallokam/ecommerce-description-generation-service:latest
```

## Endpoints
- `/health` :- `GET` request to check the service health. It will pass `200` status code if the service is up.  

- `/generate/description` :- `POST` request to generate the description using OpenAI API.  
Example `POST` request body.  
    ```
    {
        "product_name": "Dog ball",
        "product_tags": "Dog, play, puppy"
    }
    ```
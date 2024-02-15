from dotenv import load_dotenv
from flask import Flask, request, jsonify, Response
from openai import OpenAI
from openai_context import user_content
from openai_context import assistant_content
from openai_context import system_prompts 

load_dotenv()

app = Flask(__name__)
client = OpenAI()


@app.route("/health", methods=["GET"])
def check_health():
   return "<h1>Seems OK</h1>", 200


@app.route("/description", methods=["POST"])
async def generate_description():
   request_data = request.get_json()
   product_name = request_data.get('product_name')
   product_tags = request_data.get('product_tags')

   response = client.chat.completions.create(
      model = "gpt-3.5-turbo-0125",
      messages=[
         {
            "role" : "system",
            "content" : system_prompts
         },

         {"role": "user", "content": user_content[0] },
         {"role": "assistant", "content": assistant_content[0] },
    
         {"role": "user", "content": user_content[1] },
         {"role": "assistant", "content": assistant_content[1] },


         {"role": "user", "content": user_content[2] },
         {"role": "assistant", "content": assistant_content[2] },

         {"role": "user", "content": user_content[3] },
         {"role": "assistant", "content": assistant_content[3] },

         {
            "role": "user",
            "content": f"describe the following product sold in a pet supplies store: Product name: {product_name} tags: {product_tags}"
         }
      ]
   )

   data = response.choices[0].message.content

   response_data = {
      "description": data
   }
   
   return response_data,200


if __name__ == '__main__':
  app.run(debug=True, port=5000)






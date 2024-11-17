import autogen
from autogen.agentchat.contrib.multimodal_conversable_agent import MultimodalConversableAgent

# import OpenAI API key
config_list_gemini = autogen.config_list_from_json("OAI_CONFIG_LIST", filter_dict={"model": ["gemini-1.5-pro"]})
config_list_gemini_vision = autogen.config_list_from_json("OAI_CONFIG_LIST", filter_dict={"model": ["gemini-pro-vision"]})

user_proxy = autogen.UserProxyAgent(
    name="User_Proxy",
    system_message="A human admin.",
    human_input_mode="ALWAYS",
)

# Receipt Scanning and Parsing Agent
receipt_scanning_agent = MultimodalConversableAgent(
    name="Receipt_Scanning_Agent",
    system_message="You parse the receipt, and produce one line for each product with product name, quantity, price, purchase date and any other details. Allow user corrections.",
    llm_config={"config_list": config_list_gemini_vision},
    human_input_mode="NEVER",  # Allows for user corrections
)
# receipt = user_proxy.initiate_chat(receipt_scanning_agent, message="Parse the following receipt and extract the mentioned values: <img grocery_list.jpg>")
# print(receipt.summary)
# Product Information and Expiry Tracking Agent
product_info_agent = autogen.ConversableAgent(
    name="Product_Info_Agent",
    #system_message="You enrich the extracted product data with nutritional values and expiry dates, and update the user's product database. Allow user corrections. Produce one line for each product with nutritional values, expiry dates, and any other details, and update the product DB accordingly for each product.",
    system_message="You enrich the extracted product data with nutritional values and expiry dates. If no nutritional values and expiry dates are given, use rules of thumb to calculate the expiry date and estimated nutritional value. Allow user corrections. Produce one line for each product with nutritional values, expiry dates, and any other details.",
    llm_config={"config_list": config_list_gemini},
    human_input_mode="NEVER",  # Allows for user corrections
)

# Recipe Recommendation Agent
recipe_recommendation_agent = autogen.ConversableAgent(
    name="Recipe_Recommendation_Agent",
    system_message="You generate a complete recipe with step-by-step instructions and correct quantities based on the enriched product data. Note that you can only use the products given to you and products not mentioned cannot be used. Allow user modifications. Produce the title, flavor profile, recommendations for a side dish if applicable, ingredients with relevant amounts, and then step-by-step instructions for making the dish. Track the user's preferred flavor profile, assuming no preferences initially and estimating preferences as the user provides feedback on recipes.",
    llm_config={"config_list": config_list_gemini},
    human_input_mode="NEVER",  # Allows for user modifications
)

# Start a sequence of two-agent chats.
# Each element in the list is a dictionary that specifies the arguments
# for the initiate_chat method.
initial_message = """
Sure, I can parse the receipt and extract the following information:

Strawberries, 1, $1.49
Zucchini, 1, $1.99
Avocados, 1, $0.89
Multi-Color Peppers, 1, $1.99
Half Pork Loin, 1, $8.61
Shoestring Fries, 1, $1.89
Black Beans, 1, $2.49
Frozen Peas, 1, $0.95
Extra Fine Green Beans, 1, $1.49
Flat Leaf Spinach, 1, $1.79
Restaurant Tortilla, 1, $1.19
Gluten Free Pasta, 1, $1.29
Gluten Free Mix, 1, $2.99
1/4 Bnls Slice Ham, 1, $5.89
Shredded Co-Jack, 1, $2.99
Fresh Ground Turkey, 1, $2.99
Pink Lady Apple, 1, $3.49
Crushed Tomatoes, 1, $0.99
Large Eggs, 1, $1.49
The purchase date is not shown on the receipt, but it is likely that it was purchased today, June 24, 2024.
"""

chat_results = user_proxy.initiate_chats(
    [
        {
            "recipient": receipt_scanning_agent,
            "message": "Please parse the following receipt: <img grocery_list.jpg>",
            "max_turns": 1,
            "summary_method": "last_msg",
        },
        {
            "recipient": product_info_agent,
            "message": "Here is the extracted product data.",
            "max_turns": 1,
            "summary_method": "last_msg",
        },
        {
            "recipient": recipe_recommendation_agent,
            "message": "Here is the enriched product data.",
            "max_turns": 10,
            "summary_method": "last_msg",
        },
    ]
)

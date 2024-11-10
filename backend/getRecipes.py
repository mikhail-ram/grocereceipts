import requests
from dotenv import load_dotenv
import os

# Use API key from local .env file
load_dotenv()
BASE_URL = "https://api.spoonacular.com/recipes"
SPOONACULAR_API_KEY = os.getenv("SPOONACULAR_API_KEY")
HEADERS = {"x-api-key": SPOONACULAR_API_KEY}

def fetch_recipes_by_ingredients(ingredients, n=5):
    url = f"{BASE_URL}/findByIngredients"
    querystring = {"ingredients": ",".join(ingredients), "number": n}
    response = requests.get(url, headers=HEADERS, params=querystring)
    
    if response.status_code == 200:
        recipes = response.json()
        # Extracting id, title, and image
        return [
            {"id": recipe["id"], "title": recipe["title"], "image": recipe["image"]}
            for recipe in recipes
        ]
    else:
        print(f"Error fetching recipes: {response.status_code}")
        return []

# Function to fetch recipe steps by recipe ID
def fetch_recipe_steps(recipe_id):
    url = f"{BASE_URL}/{recipe_id}/analyzedInstructions"
    response = requests.get(url, headers=HEADERS)
    
    if response.status_code == 200:
        instructions = response.json()
        # Extracting steps for each recipe
        steps = []
        if instructions:
            for instruction in instructions:
                for step in instruction["steps"]:
                    steps.append(step["step"])
        return steps
    else:
        print(f"Error fetching recipe steps: {response.status_code}")
        return []

if __name__ == "__main__":
    ingredients = ["apples", "flour"]
    recipes = fetch_recipes_by_ingredients(ingredients, 2)
    for recipe in recipes:
        print(f"Recipe: {recipe['title']}")
        print(f"Image: {recipe['image']}")
        print("Steps:")
        steps = fetch_recipe_steps(recipe["id"])
        for (i, step) in enumerate(steps, start=1):
            print(f"\t{i}. {step}")
        print("\n")

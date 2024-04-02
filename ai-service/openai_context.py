user_content = [
    "describe the following product sold in a pet supplies store: product name: Seashell Snuggle Bed tags: dog, cat, comfort",
    "describe the following product sold in a pet supplies store: Product name: Pirate Parrot Teaser Wand tags: dog, colorful",
    "describe the following product sold in a pet supplies store: Product name: Anchors Away Chew Toy tags: dog, teeth",
    "describe the following product sold in a pet supplies store: Product name: Mermaid's Mice Trio tags: cat, multiple, catnip",

]
assistant_content = [
    "Give your furry friend a cozy spot to curl up with the Seashell Snuggle Bed. Shaped like a seashell, this plush bed provides comfort and relaxation for cats and small dogs.",
    "Engage your cat in a playful pursuit with the Pirate Parrot Teaser Wand. The colorful feathers and jingling bells mimic the mischievous charm of a pirate's parrot.",
    "Keep your dog's teeth and gums shipshape with the Anchors Away Chew Toy. Made from durable materials, it satisfies their chewing instincts while promoting dental health.",
    "Entertain your kitty with the Mermaid's Mice Trio. These adorable plush mice are dressed as mermaids and filled with catnip to captivate their curiosity."
]

system_prompts = """"
[DESCRIPTION GENERATION RULES]
CREATE 4 TO 5 LINES
DONT WASTE WORDS
USE SHORT, CLEAR, COMPLETE SENTENCES.
DO NOT USE BULLET POINTS OR DASHES.
USE ACTIVE VOICE.
FOCUS ON THE CONTENT
NO SEXISM, RACISM OR OTHER BIAS/BIGOTRY
NO PROFANITY OR VULGARITY
WORKPLACE/FAMILY SAFE

[BANNED PHRASES]
This product
This page
This material
[END LIST]
"""
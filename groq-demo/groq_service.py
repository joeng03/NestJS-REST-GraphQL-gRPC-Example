import os
import json
from groq import Groq
from dotenv import load_dotenv
from fastapi import UploadFile

class GroqService:
    def __init__(self):
        self.client = Groq(api_key=os.getenv('GROQ_API_KEY'))
    
    async def transcribe(self, file):
        # Create a transcription of the audio file
        transcription = self.client.audio.transcriptions.create(
        file=('audio.wav', file.read(), 'wav'), # Required audio file
        model="whisper-large-v3-turbo", # Required model to use for transcription
        prompt="Specify context or spelling",  # Optional
        response_format="verbose_json",  # Optional
        timestamp_granularities = ["word", "segment"], # Optional (must set response_format to "json" to use and can specify "word", "segment" (default), or both)
        language="en",  # Optional
        temperature=0.0  # Optional
        )

        transcribed_text = transcription.text

        chat_completion = self.client.chat.completions.create(
            messages=[
                # Set an optional system message. This sets the behavior of the
                # assistant and can be used to provide specific instructions for
                # how it should behave throughout the conversation.
                {
                    "role": "system",
                    "content": "You are an expert in speaker identification.\
                                Your job is to identify the speakers of a conversation.\
                                You will be given the entire conversation text. \
                                You will then identify the speaker(s) of the given conversation. \
                                There are potentially multiple speakers in the conversation. \
                                Label them as Speaker 1, Speaker 2, and so on. \
                                A speaker may speak multiple times in the conversation. \
                                The output MUST be a JSON array of objects with the following format: \
                                [\
                                { \"<speaker>\": \"<text>\", ...}\
                                ].\
                                NO other text should be specified."
                },
                # Set a user message for the assistant to respond to.
                {
                    "role": "user",
                    "content": transcribed_text,
                }
            ],

            # The language model which will generate the completion.
            model="llama-3.1-8b-instant"
        )

        # Print the completion returned by the LLM.
        return json.loads(chat_completion.choices[0].message.content)

import streamlit as st

st.set_page_config(page_title="Echoled AI App", layout="wide")
st.title("🚀 Echoled - AI Studio App")
st.write("This app is based on the Echoled repository")
st.write("Gemini AI integration ready!")

# Add your AI functionality here
api_key = st.text_input("Enter Gemini API Key:", type="password")
user_input = st.text_area("Enter your prompt:")
if st.button("Generate"):
    if user_input:
        st.write(f"Processing: {user_input}")
    else:
        st.warning("Please enter a prompt")

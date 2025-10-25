<div align="center">

# 📝 NeoGlass Summarizer & Paraphraser

<p>
    <a href="https://www.python.org/"><img src="https://img.shields.io/badge/python-3.8%2B-blue" alt="Python"></a>
    <a href="https://streamlit.io/"><img src="https://img.shields.io/badge/streamlit-1.30-orange" alt="Streamlit"></a>
    <a href="https://huggingface.co/facebook/bart-large-cnn"><img src="https://img.shields.io/badge/Hugging%20Face-facebook%2Fbart--large--cnn-yellow" alt="Hugging Face"></a>
    <a href="https://www.groq.com/"><img src="https://img.shields.io/badge/Groq-LLaMA3.1-purple" alt="Groq"></a>
    <a href="https://opensource.org/licenses/Apache-2.0"><img src="https://img.shields.io/badge/license-Apache--2.0-green" alt="License"></a>
</p>

<p>
    <strong>NeoGlass</strong> is a sleek, glassmorphic web application leveraging <strong>state-of-the-art AI models</strong> for high-quality text summarization and paraphrasing. Built with <strong>Streamlit</strong>, it combines <strong>Hugging Face summarization models</strong> and <strong>Groq LLaMA 3.1</strong> paraphrasing to provide an interactive, modern UI for text processing.
</p>

<p>
    🌐 <strong>Try it online:</strong> <a href="https://share.streamlit.io/your-username/neoglass-summarizer/main/app.py">Launch NeoGlass(Dummy)</a>
</p>

</div>


<div align="center">

## ✨ Features

| Feature | Description | Icon |
|---------|-------------|------|
| **Abstractive Summarization** | Generates concise sentences capturing the text's core meaning | ✍️ |
| **Extractive Summarization** | Extracts important sentences directly from the source text | ✂️ |
| **High-Speed Paraphrasing** | Instant paraphrasing with multiple variations using Groq API | 🚀 |
| **Modern Glassmorphic UI** | Beautiful and responsive interface with dynamic glowing effects | 🎨 |
| **Configurable Output Length** | Choose Short, Medium, or Long summaries | 🔧 |
| **Modular Pipeline** | Clean backend pipeline integrating all AI services | 🛠️ |

</div>

## 📂 File Structure
<pre>
mvps/
│
├── 📂 mvp/                    # Core application modules
│   ├── __init__.py            # Package initializer
│   ├── abstractive.py         # Abstractive summarization
│   ├── extractive.py          # Extractive summarization
│   ├── mvp_pipeline.py        # Main processing pipeline
│   ├── paraphraser.py         # Paraphrasing module
│   └── test_run.py            # Test running pipeline
│
├── .env                       # Environment variables for API keys
├── .gitignore                # Git ignore file
├── app.py                    # Main app script
├── config.yaml               # Main YAML configuration
├── pyproject.toml           # Project configuration for Python
└── README.md                # Project README
</pre>

## ⚙️ Setup & Installation

### Prerequisites
- Python 3.8+  
- Hugging Face API Key  
- Groq Cloud API Key

### Clone Repository
```bash
git clone https://github.com/RITHIKKUMARAN/Infosys_Data_Preprocessing.git
cd mvps
```

### Setup Virtual Environment

#### Windows
```bash
python -m venv venv
venv\Scripts\activate
```

#### macOS/Linux
```bash
python3 -m venv venv
source venv/bin/activate
```

### Install Dependencies
```bash
pip install -r requirements.txt
```

### Create a .env file in the root directory:
```env
HF_API_KEY="your_hugging_face_api_key_here"
GROQ_API_KEY="your_groq_api_key_here"
```

## 🚀 Running the Application
```bash
streamlit run app.py
```
Open your browser at: http://localhost:8501

## 🧪 Running Tests
```bash
python test_run.py
```
This validates all backend modules and prints results in the console.

## 🤝 Contributing

We welcome contributions!

1. Fork the repo
2. Create a branch:
```bash
git checkout -b feature/AmazingFeature
```
3. Commit changes:
```bash
git commit -m "Add some AmazingFeature"
```
4. Push branch:
```bash
git push origin feature/AmazingFeature
```
5. Open a Pull Request

## 📄 License

Licensed under Apache-2.0. See [LICENSE](https://github.com/RITHIKKUMARAN/Infosys_Data_Preprocessing/blob/main/LICENSE)

Built with ❤️ and modern AI.
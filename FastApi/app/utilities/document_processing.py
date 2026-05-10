from langchain_community.document_loaders import TextLoader, UnstructuredExcelLoader, UnstructuredMarkdownLoader
from langchain_text_splitters import CharacterTextSplitter
from langchain_community.vectorstores import SupabaseVectorStore
from langchain_openai import OpenAIEmbeddings
from supabase.client import Client, create_client
from app.config import settings

embeddings = OpenAIEmbeddings(api_key=settings.openai_api_key.get_secret_value())
supabase: Client = create_client(settings.supabase_url, settings.supabase_key.get_secret_value())

def load_document(path: str, extension: str):
    if extension == ".txt":
        return TextLoader(path).load()
    elif extension == ".md":
        return UnstructuredMarkdownLoader(path).load()
    elif extension == ".xlsx":
        return UnstructuredExcelLoader(path, mode="elements").load()

def vectorize_to_supabase(documents):
    text_splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=0)
    docs = text_splitter.split_documents(documents)
    SupabaseVectorStore.from_documents(
        docs,
        embeddings,
        client=supabase,
        table_name="documents",
        query_name="match_documents",
        chunk_size=500,
    )

def delete_vectors_of(specific_source: str):
    supabase.table("documents").delete().eq("metadata->>source", specific_source).execute()

def search_similar(query: str):
    vector_store = SupabaseVectorStore(
        embedding=embeddings,
        client=supabase,
        table_name="documents",
        query_name="match_documents",
    )
    matched_docs = vector_store.similarity_search(query)
    
    return "\n".join([matched_doc.page_content for matched_doc in matched_docs])

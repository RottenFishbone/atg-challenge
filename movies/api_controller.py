from urllib.parse import quote
import requests

from .api_models import *


key = '5bcaf3e6' # RIP this key in public repo..
root = r'https://www.omdbapi.com/?type=movie&'
api = f'{root}apikey={key}&'

def query_omdb(query: str, year: int|None=None, page: int=1) -> OmdbSearchResult:
    """
    Submits a query to OMDb and returns the result.
    
    Raises exceptions on request failure.
    """
    # Sanitize invalid URL chars
    query = quote(query) 
    if query.isspace():
        return OmdbSearchResult()

    api_url = api + f's={query}&page={page}&'
    if not year is None:
        api_url = api_url + f'y={year}&'
    
    resp = requests.get(api_url)
    resp.raise_for_status()
    body = resp.json()
    if not valid_omdb_resp(body):
        return OmdbSearchResult()
    return OmdbSearchResult.from_json(body)

def lookup_omdb(imdb_id: str) -> OmdbMovie | None:
    api_url = api + f'i={imdb_id}&' 
    resp = requests.get(api_url)
    resp.raise_for_status()
    body = resp.json()
    if not valid_omdb_resp(body):
        return None

    return OmdbMovie.from_json(body)
    

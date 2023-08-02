from __future__ import annotations

def valid_omdb_resp(json: dict) -> bool:
    """
    Tests if a json object is a successful OMDb api response
    """

    return 'Response' in json and json['Response'] == 'True'


class OmdbSearchResult:
    """
    Model for an OMDb api search response
    """
    search: list
    num_res: int
    
    def __init__(self, search: list=[], num_res: int=0):
        self.search = search
        self.num_res = num_res

    def to_json(self) -> dict:
        return {
            'search': [x.to_json() for x in self.search], 
            'num_res': self.num_res
        }

    @classmethod
    def from_json(cls, json: dict) -> OmdbSearchResult:
        """
        Parses a JSON response from an OMDb search.

        Raises KeyError if any field is missing
        """
        r = OmdbSearchResult()
        r.search = [OmdbMovieListing.from_json(x) for x in json['Search']]
        r.num_res = int(json['totalResults'])
        print(r)
        return r

    
class OmdbMovieListing:
    """
    Model for a single movie entry in an OMDb api search
    """
    title: str
    year: int
    imdb_id: str
    poster: str = ''

    def to_json(self) -> dict:
        return self.__dict__

    @classmethod 
    def from_json(cls, json: dict) -> OmdbMovieListing:
        """
        Parses a JSON response from an OMDb search listing.

        Raises KeyError if any field is missing
        """
        m = OmdbMovieListing() 
        m.title = json['Title']
        m.year = int(json['Year'])
        m.imdb_id = json['imdbID']
        m.poster = json['Poster']
        return m


class OmdbMovie:
    """
    Model for searching for a single title on OMDb API.
    """
    # Required
    imdb_id: str
    title: str
    year: int
        
    # Optional
    poster: str         = ''
    rated: str          = ''
    released: str       = ''
    runtime: int | None = None
    genre: str          = ''
    director: str       = '' 
    writer: str         = ''
    actors: str         = ''
    plot: str           = ''
    language: str       = '' 
    metascore: int | None       = None
    imdb_rating: float | None   = None

    @classmethod
    def from_json(cls, json: dict) -> OmdbMovie:
        """
        Parses a JSON response from an OMDb title lookup

        Raises KeyError is required fields are missing
        """
        m = OmdbMovie()
        m.imdb_id = json['imdbID']
        m.title = json['Title']
        m.year = json['Year']
        
        mapping = {
            'poster': 'Poster',
            'rated': 'Rated', 
            'released': 'Released', 
            'genre': 'Genre',
            'director': 'Director',
            'writer': 'Writer',
            'actors': 'Actors',
            'plot': 'Plot',
            'language': 'Language',
        }
        for k, v in mapping.items():
            if json[v] == 'N/A':
                continue
            mdict = m.__dict__
            typeof = type(m.__getattribute__(k))
            mdict[k] = typeof(json[v])
        
        # Parse nullable number fields
        if 'Metascore' in json and not json['Metascore'] == 'N/A':
            m.metascore = int(json['Metascore'])
        
        if 'imdbRating' in json and not json['imdbRating'] == 'N/A':
            m.imdb_rating = float(json['imdbRating'])

        # Parse Runtime into integer
        if 'Runtime' in json and not json['Runtime'] == 'N/A':
            parts = json['Runtime'].split(' ')
            if len(parts) == 2 and parts[1] == 'min':
                m.runtime = int(parts[0])

        return m

    def to_json(self) -> dict:
        return self.__dict__
        


from django.urls import path

from . import api_views
from . import views

urlpatterns = [
    # Api
    path(r'v1/movies/saved', api_views.MovieList.as_view(), name="saved_movies"), 
    path(r'v1/movies/search', api_views.Search.as_view(), name="search_movies"), 
    # Webapp
    path('', views.FrontendView.as_view(), name="webapp"),
    path(r'<path:path>', views.FrontendView.as_view(), name="webapp"),
]

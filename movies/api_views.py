from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
import json

from .serializers import MovieSerializer
from .models import Movie

from . import api_controller

@permission_classes([AllowAny])
class Search(APIView):
    def get(self, request, format=None):
        query = request.query_params
        # Handle ID searching
        if 'id' in query: 
            result = api_controller.lookup_omdb(query['id'])
            if result is None:
                return Response(status=status.HTTP_404_NOT_FOUND)
            return Response(json.dumps(result.to_json()), status=status.HTTP_200_OK)
        
        # Handle Queries
        if not 'q' in query:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        year = None
        if 'year' in query:
            if query['year'].isdigit():
                year = int(query['year'])
            else:
                return Response(status=status.HTTP_400_BAD_REQUEST)
        page = 1
        if 'page' in query:
            if query['page'].isdigit() and \
                    int(query['page']) >= 1 and int(query['page']) <= 100:
                page = int(query['page'])
            else:
                return Response(status=status.HTTP_400_BAD_REQUEST)
        
        result = api_controller.query_omdb(query['q'], year, page)
        return Response(json.dumps(result.to_json()), status=status.HTTP_200_OK)

@permission_classes([AllowAny])
class MovieList(APIView):
    def get(self, request, format=None):
        movies = Movie.objects.all()
        serializer = MovieSerializer(movies, many=True)
        return Response(serializer.data)
    
    def post(self, request, format=None):
        if Movie.objects.count() >= 5:
            return Response(status=status.HTTP_403_FORBIDDEN)
        serializer = MovieSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, format=None):
        query = request.query_params
        if not 'id' in query:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        try:
            movie = Movie.objects.get(imdb_id=query['id'])
            movie.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Movie.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


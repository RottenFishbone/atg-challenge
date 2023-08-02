from django.db import models

# Note: This is a horrible database model, the repeated data and wasted
# indexing time would be immense in a large database. 
# However, storing max 5 movies makes this not a big deal at all.
#
# Assuming 'IF APPLICABLE' means retain fields if I used them.
class Movie(models.Model):
    # Required
    imdb_id     = models.CharField(max_length=64, primary_key=True)
    title       = models.CharField(max_length=255)
    year        = models.IntegerField()
    # Optional
    poster      = models.URLField(null=True)
    rated       = models.TextField(max_length=16, blank=True, default='')
    released    = models.DateField("date released", null=True)
    runtime     = models.IntegerField(null=True)
    genre       = models.TextField(blank=True, default='')
    director    = models.CharField(max_length=255, blank=True, default='')
    writer      = models.TextField(blank=True, default='')
    actors      = models.TextField(blank=True, default='')
    plot        = models.TextField(blank=True, default='')
    language    = models.CharField(max_length=255, blank=True, default='')
    metascore   = models.IntegerField(null=True)
    imdb_rating = models.FloatField(null=True)

    def _str_(self):
        return f'{self.title} ({str(self.year)})'
        

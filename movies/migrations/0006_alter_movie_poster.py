# Generated by Django 4.2.3 on 2023-08-01 19:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('movies', '0005_alter_movie_actors_alter_movie_director_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='movie',
            name='poster',
            field=models.URLField(null=True),
        ),
    ]

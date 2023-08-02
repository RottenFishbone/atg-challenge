# Generated by Django 4.2.3 on 2023-07-31 21:45

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Movie',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('year', models.IntegerField()),
                ('rated', models.TextField(max_length=16)),
                ('released', models.DateField(verbose_name='date released')),
                ('runtime', models.IntegerField()),
                ('genre', models.TextField()),
                ('director', models.CharField(max_length=255)),
                ('writer', models.TextField()),
                ('actors', models.TextField()),
                ('plot', models.TextField()),
                ('language', models.CharField(max_length=255)),
                ('poster', models.URLField()),
                ('imdb_id', models.CharField(max_length=64)),
                ('dvd', models.DateField(verbose_name='dvd released')),
            ],
        ),
    ]
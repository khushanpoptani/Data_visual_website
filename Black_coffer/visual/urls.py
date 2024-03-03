from django.urls import path
from . import views

urlpatterns = [
    path('', views.show_chart, name='home'),

    path('api/country', views.countries.as_view(), name='countries'),
    path('api/region', views.region.as_view(), name='region'),
    path('api/pestle', views.pestle.as_view(), name='pestle'),
    path('api/sector', views.sector.as_view(), name='sector'),
    path('api/topic', views.topic.as_view(), name='topic'),
    path('api/intensity', views.intensity.as_view(), name='intensity'),
    path('api/likelihood', views.likelihood.as_view(), name='likelihood'),
    path('api/relevance', views.relevance.as_view(), name='relevance'),
    path('api/start_years', views.start_year.as_view(), name='start_year'),
    path('api/end_years', views.end_year.as_view(), name='end_year')
]


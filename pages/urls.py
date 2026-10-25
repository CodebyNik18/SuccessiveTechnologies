from django.urls import path
from . import views

urlpatterns = [
    path('about-us/', views.aboutus, name='aboutus'),
    path('contact-us/', views.contactus, name='contactus'),
    path('privacy-policy/', views.policy, name='policy'),
    path('terms-conditions/', views.terms, name='terms'),
    path('industries/', views.industry, name='industry'),
    path('insight/', views.insight, name='insight'),
    path('our-approach/', views.ourapproach, name='ourapproach'),
]
from django.shortcuts import render

def allservices(request):
    return render(request, 'services/all_services.html')
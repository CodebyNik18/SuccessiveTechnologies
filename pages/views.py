from django.shortcuts import render, redirect
from .utils import send_contact_email

def contactus(request):
    if request.method == 'POST':
        name = request.POST.get('name', None)
        service = request.POST.getlist('service', None)
        email = request.POST.get('email', None)
        company = request.POST.get('company', None)
        phone = request.POST.get('phone', None)
        timeline = request.POST.get('timeline', None)
        budget = request.POST.get('budget', None)
        message = request.POST.get('message', None)

        send_contact_email(
            name, service, email, company, phone, timeline, budget, message
        )
        return redirect('contactus')
    return render(request, 'pages/contact_us.html')

def aboutus(request):
    return render(request, 'pages/about_us.html')

def policy(request):
    return render(request, 'pages/policy.html')

def terms(request):
    return render(request, 'pages/terms.html')

def industry(request):
    return render(request, 'pages/industry.html')

def insight(request):
    return render(request, 'pages/insight.html')

def ourapproach(request):
    return render(request, 'pages/our_approach.html')
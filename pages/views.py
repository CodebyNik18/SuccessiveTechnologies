from django.shortcuts import render

def aboutus(request):
    return render(request, 'pages/about_us.html')

def contactus(request):
    return render(request, 'pages/contact_us.html')

def policy(request):
    return render(request, 'pages/policy.html')

def terms(request):
    return render(request, 'pages/terms.html')
from django.shortcuts import render, redirect
from .utils import send_email

def home(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        name = request.POST.get('name')
        message = request.POST.get('message')

        send_email(email, name, message)
        return redirect('home')
    return render(request, 'index.html')
from django.shortcuts import render, redirect
from rest_framework import generics, permissions, status, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from .models import Product
from .serializers import UserSerializer, ProductSerializer
from django.contrib.auth.decorators import login_required

# Signup endpoint
class SignupView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        user = User.objects.get(username=response.data['username'])
        token, created = Token.objects.get_or_create(user=user)
        return Response({'token': token.key, 'user': response.data})

# Login endpoint
class LoginView(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        # Log the user in for session authentication
        login(request, user)
        return Response({'token': token.key, 'user': UserSerializer(user).data})

# Product CRUD endpoints
class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

def homepage(request):
    return render(request, 'homepage.html')

def signup_page(request):
    return render(request, 'signup.html')

def login_page(request):
    if request.user.is_authenticated:
        return redirect('dashboard')
    return render(request, 'login.html')

@login_required(login_url='/login/')
def dashboard(request):
    return render(request, 'dashboard.html')

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SignupView, LoginView, ProductViewSet, homepage, signup_page, login_page, dashboard

router = DefaultRouter()
router.register(r'products', ProductViewSet, basename='product')

urlpatterns = [
    path('', homepage, name='homepage'),
    path('signup/', signup_page, name='signup_page'),
    path('login/', login_page, name='login_page'),
    path('dashboard/', dashboard, name='dashboard'),
    path('api/signup/', SignupView.as_view(), name='signup'),
    path('api/login/', LoginView.as_view(), name='login'),
    path('api/', include(router.urls)),
]


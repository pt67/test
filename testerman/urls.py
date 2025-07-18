from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SignupView, LoginView, ProductViewSet, ProductAddView, homepage, signup_page, login_page, dashboard, logout_view
from rest_framework.authtoken.views import obtain_auth_token
router = DefaultRouter()
router.register(r'products', ProductViewSet, basename='product')

urlpatterns = [
    path('', homepage, name='homepage'),
    path('signup/', signup_page, name='signup_page'),
    path('login/', login_page, name='login_page'),
    path('logout/', logout_view, name='logout'),
    path('dashboard/', dashboard, name='dashboard'),
    path('api/signup/', SignupView.as_view(), name='signup'),
    path('api/login/', LoginView.as_view(), name='login'),
    path('api/', include(router.urls)),
    path('api/products/add/', ProductAddView.as_view(), name='product_add'),
    path('api/token/', obtain_auth_token, name='api_token'),
]


from rest_framework import viewsets
from django.contrib.auth.models import User
from .models import Role
from .serializers import RoleSerializer, UserSerializer

class RoleViewSet(viewsets.ModelViewSet):
    queryset = Role.objects.all()
    serializer_class = RoleSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

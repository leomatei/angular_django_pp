from rest_framework import viewsets
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from .models import Role
from .models import Complaint
from .serializers import RoleSerializer, UserSerializer, ComplaintSerializer

class RoleViewSet(viewsets.ModelViewSet):
    queryset = Role.objects.all()
    serializer_class = RoleSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class ComplaintViewSet(viewsets.ModelViewSet):
    queryset = Complaint.objects.all()
    serializer_class = ComplaintSerializer
    def get_complaint_with_userprofile_details(request, complaint_id):
        complaint = get_object_or_404(Complaint.objects.select_related('asignee__user', 'asignee__role'), pk=complaint_id)
        
        complaint_data = {
        'title': complaint.title,
        'author': complaint.author,
        'description': complaint.description,
        'created_at': complaint.created_at.strftime('%Y-%m-%d %H:%M:%S'),  # Format datetime as string
        'updated_at': complaint.updated_at.strftime('%Y-%m-%d %H:%M:%S'),  # Format datetime as string
        }
    
        if complaint.asignee:
            complaint_data['user_profile'] = {
                'username': complaint.asignee.user.username,
                'role': complaint.asignee.role.name,
            }
        else:
            complaint_data['user_profile'] = None
        
        return JsonResponse(complaint_data)


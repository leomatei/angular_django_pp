from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RoleViewSet, UserViewSet, ComplaintViewSet

router = DefaultRouter()
router.register(r'roles', RoleViewSet)
router.register(r'users', UserViewSet)
router.register(r'complaints',ComplaintViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('complaint/<int:complaint_id>/', ComplaintViewSet.get_complaint_with_userprofile_details, name='complaint-detail'),
]

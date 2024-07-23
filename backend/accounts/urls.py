from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RoleViewSet, UserViewSet, ComplaintViewSet, MyTokenObtainPairView, signup
from rest_framework_simplejwt.views import TokenRefreshView

router = DefaultRouter()
router.register(r'roles', RoleViewSet)
router.register(r'users', UserViewSet)
router.register(r'complaints',ComplaintViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('complaint/<int:complaint_id>/', ComplaintViewSet.get_complaint_with_userprofile_details, name='complaint-detail'),
    path('signup/', signup, name='signup'),
]

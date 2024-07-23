from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Role, UserProfile, Complaint
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = ['id', 'name']

class UserSerializer(serializers.ModelSerializer):
    role = serializers.PrimaryKeyRelatedField(queryset=Role.objects.all(), source='userprofile.role')

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'role']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        role_data = validated_data.pop('userprofile')['role']
        user = User.objects.create_user(**validated_data)
        UserProfile.objects.create(user=user, role=role_data)
        return user

    def update(self, instance, validated_data):
        profile_data = validated_data.pop('userprofile', None)
        if profile_data:
            role = profile_data.get('role')
            instance.userprofile.role = role
            instance.userprofile.save()
        return super().update(instance, validated_data)

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['role'] = instance.userprofile.role.id if instance.userprofile else None
        return representation
    
class ComplaintSerializer(serializers.ModelSerializer):
    class Meta:
        model = Complaint
        fields = '__all__'

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        try:
            user_profile = user.userprofile
            token['role'] = user_profile.role.name 
        except User.DoesNotExist:
            token['role'] = None  

        return token
    
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Role, UserProfile, Complaint
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = ['id', 'name']

class UserSerializer(serializers.ModelSerializer):
    role = serializers.PrimaryKeyRelatedField(queryset=Role.objects.all(), required=False)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'role']
        extra_kwargs = {'password': {'write_only': True}}

    def get_role(self, obj):
        try:
            return obj.userprofile.role.name if obj.userprofile and obj.userprofile.role else None
        except UserProfile.DoesNotExist:
            return None

    def create(self, validated_data):
        role_data = validated_data.pop('role', None)
        user = User.objects.create_user(**validated_data)
        if role_data is not None:
            UserProfile.objects.create(user=user, role=role_data)
        return user

    def update(self, instance, validated_data):
        role_data = validated_data.pop('role', None)

        instance = super().update(instance, validated_data)

        if role_data is not None:
            UserProfile.objects.update_or_create(user=instance, defaults={'role': role_data})
        else:
            UserProfile.objects.update_or_create(user=instance, defaults={'role': None})

        return instance

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['role'] = self.get_role(instance)
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
        except UserProfile.DoesNotExist:
            token['role'] = None  

        return token

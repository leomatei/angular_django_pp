from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from accounts.models import Role, UserProfile,Complaint


class Command(BaseCommand):
    help = 'Seed the database with initial data'

    def handle(self, *args, **kwargs):
        self.stdout.write('Seeding data...')
        self._create_roles()
        self._create_users()
        self._create_complaints()
        self.stdout.write('Database seeded successfully.')

    def _create_roles(self):
        roles = ['admin', 'user', 'support']
        for role_name in roles:
            role, created = Role.objects.get_or_create(name=role_name)
            if created:
                self.stdout.write(f'Role "{role_name}" created.')

    def _create_users(self):
        roles = Role.objects.all()
        if not User.objects.filter(username='admin').exists():
            admin_user = User.objects.create_superuser(username='admin', email='admin@example.com', password='password123')
            admin_role = roles.get(name='admin')
            UserProfile.objects.create(user=admin_user, role=admin_role)
            self.stdout.write('Admin user created.')

        if not User.objects.filter(username='john_doe').exists():
            user1 = User.objects.create_user(username='john_doe', email='john@example.com', password='password123')
            user_role = roles.get(name='user')
            UserProfile.objects.create(user=user1, role=user_role)
            self.stdout.write('User "john_doe" created.')

        if not User.objects.filter(username='jane_doe').exists():
            user2 = User.objects.create_user(username='jane_doe', email='jane@example.com', password='password123')
            support_role = roles.get(name='support')
            UserProfile.objects.create(user=user2, role=support_role)
            self.stdout.write('User "jane_doe" created.')

    def _create_complaints(self):
        try:
            user1 = User.objects.get(username='john_doe')
        except User.DoesNotExist:
            self.stdout.write('User "john_doe" does not exist.')
            return

        complaints = [
            {'title': 'Delivery Complaint', 'author': 'Jane Doe', 'description': 'Content of my package was broken', 'asignee': user1},
            {'title': 'Payment Issue', 'author': 'John Doe', 'description': 'Payment was deducted twice', 'asignee': user1}
        ]

        for complaint_data in complaints:
            complaint, created = Complaint.objects.get_or_create(
                title=complaint_data['title'],
                author=complaint_data['author'],
                description=complaint_data['description'],
                asignee=complaint_data['asignee']
            )
            if created:
                self.stdout.write(f'Complaint "{complaint_data["title"]}" created.')
